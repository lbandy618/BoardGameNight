import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ApiGame, GameElement } from '../ApiGame';
import { BoardgameapiService } from '../boardgameapi.service';
import { GameShelf } from '../game-shelf';
import { GameShelfService } from '../game-shelf.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-game-shelf',
  templateUrl: './game-shelf.component.html',
  styleUrls: ['./game-shelf.component.css']
})
export class GameShelfComponent implements OnInit {
users:User[] = [];
gameSearch:ApiGame = {} as ApiGame;
selectedGame:GameElement = {} as GameElement;
user: SocialUser = {} as SocialUser;
loggedIn: boolean = false;
gameshelf : GameShelf [] =[];
myGameShelf : GameElement [] = [];
status: string = "";

  constructor(private routerService:Router, private apiService:BoardgameapiService, private gameShelfService:GameShelfService, private userService:UserService, private authService: SocialAuthService) { }

  ngOnInit(): void {
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.userService.getUsers().subscribe((response:any) =>{
        this.users = response;
    })
      if (this.loggedIn){
        this.getGameShelfByLoginId(this.user.id);
      }
    });
  }

  getGameByName(form:NgForm){
    let gameName = form.form.value.name;
    this.apiService.getBoardGameByName(gameName).subscribe((response:any)=>{
      this.gameSearch = response;
      console.log(response);
    });
  }

  selectGameFromSearch(choice:GameElement){
    this.selectedGame= choice;
    console.log(choice);
  }

  getGameByAPIId():void{
    this.apiService.getBoardGameByID(this.gameshelf.map(g => g.apigameId)).subscribe((response:ApiGame)=>{
      this.myGameShelf = response.games;
    })
  }

  getGameShelfByLoginId(loginId:string){
    this.gameShelfService.searchGameShelfByLoginId(loginId).subscribe((response:any)=>{
      this.gameshelf = response;
      console.log(this.gameshelf);
      this.getGameByAPIId();
      //  this.gameshelf.forEach(g=> this.myGameShelf.push(this.getGameByAPIId(g.apigameId)));
    })
  }


  addGameToGameShelf(apiGameId:string){
    apiGameId = this.selectedGame.id;
    this.gameShelfService.addGameToGameShelf(apiGameId, this.user.id).subscribe((response) =>{
      console.log("game shelf has been updated")
      if(this.selectedGame.name != null){
        this.myGameShelf.push(this.selectedGame);
        console.log(response);
        this.status = `${this.selectedGame.name} has been added to your shelf.`
      }
    });
    
  }

  getLoggedInUser(userId:string):User{
    let index = this.users.findIndex(u => u.loginId == userId);
    //console.log(this.users[index])
    return this.users[index];
  }

  clearStatus(){
    this.status = "";
  }

  // addGameToShelf(apiGameId:string, userId:number){
    
  //   this.gameShelfService.addGameToGameShelf(apiGameId)
  // }




}
