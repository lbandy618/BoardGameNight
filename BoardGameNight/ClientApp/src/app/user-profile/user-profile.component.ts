import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ApiGame } from '../ApiGame';
import { BoardgameapiService } from '../boardgameapi.service';
import { GameShelf } from '../game-shelf';
import { GameShelfComponent } from '../game-shelf/game-shelf.component';
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
  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string, private userService:UserService, private authService: SocialAuthService, private sessionService:SessionService, private boardGameApiService: BoardgameapiService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.sessionService.getAllSessionsById(this.user.id).subscribe((response:any) => {
        this.sessions = response;
        console.log(response);
        let gameIdArray:string [] = [];
        for(let i:number = 0; i < this.sessions.length; i++){
          gameIdArray.push(this.sessions[i].owned.apigameId)
         }
         this.boardGameApiService.getBoardGameByID(gameIdArray).subscribe((response:ApiGame) => {
          console.log(response);
          this.gameSessionTitle = response.games.map(x => x.name)
          console.log(this.gameSessionTitle)
         })
        
      })
    });

  }

  updateProfile(form:NgForm):any{
    let newUserName = form.form.value.userName;
    let newAge = form.form.value.age;
    let newSummary = form.form.value.summary;
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
    })
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
