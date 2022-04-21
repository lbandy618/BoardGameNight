import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ApiGame, GameElement } from '../ApiGame';
import { BoardgameapiService } from '../boardgameapi.service';
import { GameShelf } from '../game-shelf';
import { GameShelfService } from '../game-shelf.service';
import { GameShelfComponent } from '../game-shelf/game-shelf.component';
import { GameNightEvent } from '../gamenightevent';
import { GameNightEventService } from '../gamenightevent.service';
import { Session } from '../session';
import { SessionService } from '../session.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  users:User[] = [];
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  sessions: Session[] = [];
  gameSessionTitle: string [] = [];
  gameEvents: GameNightEvent [] = [];
  displayAttendees: boolean [] = [];
  displayForm:boolean = false;
  gameSessionImage: string[] = [];
  

  constructor(private routerService:Router, private http:HttpClient, @Inject('BASE_URL') private baseUrl:string, private userService:UserService, private authService: SocialAuthService, private sessionService:SessionService, private boardGameApiService: BoardgameapiService, private gameNightEventService: GameNightEventService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.userService.getUsers().subscribe((response:any) =>{
          this.users = response;
      })
      this.sessionService.getAllSessionsById(this.user.id).subscribe((response:any) => {
        this.sessions = response;
        this.displayAttendees = new Array(this.sessions.length).fill(false);
        console.log(response);
        let gameIdArray:string [] = [];
        for(let i:number = 0; i < this.sessions.length; i++){
          gameIdArray.push(this.sessions[i].owned.apigameId)
          //this.gameEvents.push(this.getEventBySession(this.sessions[i]));
         }
         this.boardGameApiService.getBoardGameByID(gameIdArray).subscribe((response:ApiGame) => {
          console.log(response);
          this.gameSessionTitle = response.games.map(x => x.name);
          this.gameSessionImage = response.games.map(g => g.thumb_url);
          console.log(this.gameSessionTitle)
          this.getEventBySession(this.sessions.map(s => s.id));
          //console.log(this.gameEvents)
         })
        
      })
    });
  }

  updateProfile(form:NgForm):any{
    let newUserName = "";
    if(form.form.value.userName == ""){
      newUserName = this.getLoggedInUser(this.user.id).userName
    }
    else{
      newUserName = form.form.value.userName;
    }
    let newSummary = "";
    if(form.form.value.summary == ""){
      newSummary = this.getLoggedInUser(this.user.id).summary
    }
    else{
      newSummary = form.form.value.summary;
    }
    let newAge = 0;
    if(form.form.value.age == 0){
      newAge = this.getLoggedInUser(this.user.id).age
    }
    else{
      newAge = form.form.value.age;
    }

    let updatedProfile:User = {
      userName: newUserName,
      age: newAge,
      summary: newSummary,
      id: 0,
      loginId: this.user.id,
      ownedGames: [],
      preferences: [],
      sessionAttendee: [],
      userStat: []
    }
    this.userService.updateProfile(updatedProfile).subscribe((response:any) => {
      console.log("profile has been updated")
      let index = this.users.findIndex(u => u.loginId == this.user.id)
      this.users[index].userName = newUserName;
      this.users[index].summary = newSummary;
      // this.routerService.navigate(["/user-profile"]);
    })
  }

  getEventBySession(newSession:number[]):void{
    let result: GameNightEvent[] = [];
    this.gameNightEventService.getEventBySessionId(newSession).subscribe((response:any) => {
    console.log(response)
    this.gameEvents = response;
    for(let i = 0; i < response.length; i++){
      this.sessions[i].event = this.gameEvents[i];
    }
    })
  }

  updateWinner(form:NgForm):any{
    let newWinner = form.form.value.winner;
    let winnerIndex = form.form.value.index;
    if(newWinner == "" || newWinner == null){
      console.log(newWinner)
    }
    else{
      let updatedSession: Session = {
        id: this.sessions[winnerIndex].id,
        timePlayed: 0,
        winner: newWinner,
        enjoyment: 0,
        ownedId: 0,
        events: [],
        owned: {} as GameShelf,
        event: {} as GameNightEvent,
        sessionAttendees: []
      }
      this.sessionService.editWinner(updatedSession, this.user.id).subscribe((response:any) => {
        this.sessions[winnerIndex].winner = newWinner;
        console.log(response)
      })
    }
  }

  toggleAttendees(index:number){
    this.displayAttendees[index] = !this.displayAttendees[index];
  }

  getLoggedInUser(userId:string):User{
    let index = this.users.findIndex(u => u.loginId == userId);
    //console.log(this.users[index])
    return this.users[index];
  }
  

  toggleFormDisplay(){
    this.displayForm = !this.displayForm;
  }













  // updateUserName(form:NgForm):any {
  //   let newUserName = form.form.value.userName;
  //   return this.userService.updateUserName(newUserName, this.user.id).subscribe((response:any) => {
  //     console.log(response)
  //   })
  // }

  // updateAge(form:NgForm):any {
  //   let newAge = form.form.value.age;
  //   return this.userService.updateUserName(newAge, this.user.id).subscribe((response:any) => {
  //     console.log(response)
  //   })
  // }

  // updateSummary(form:NgForm):any {
  //   let newSummary = form.form.value.summary;
  //   return this.userService.updateUserName(newSummary, this.user.id).subscribe((response:any) => {
  //     console.log(response)
  //   })
  // }




  // getUsers(){
  //   this.userService.getUsers().subscribe((response:User[]) => {
  //     this.users = response;
  //     console.log(response);
  //   })
  // }

}
