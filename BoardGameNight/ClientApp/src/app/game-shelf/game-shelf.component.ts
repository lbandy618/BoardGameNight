import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ApiGame, GameElement } from '../ApiGame';
import { BoardgameapiService } from '../boardgameapi.service';
import { GameShelf } from '../game-shelf';
import { GameShelfService } from '../game-shelf.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-game-shelf',
  templateUrl: './game-shelf.component.html',
  styleUrls: ['./game-shelf.component.css']
})
export class GameShelfComponent implements OnInit {
gameSearch:ApiGame = {} as ApiGame;
selectedGame:GameElement = {} as GameElement;
user: SocialUser = {} as SocialUser;
loggedIn: boolean = false;
gameshelf : GameShelf [] =[];
myGameShelf : GameElement [] = [];

  constructor(private apiService:BoardgameapiService, private gameShelfService:GameShelfService, private userService:UserService, private authService: SocialAuthService) { }

  ngOnInit(): void {
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
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

  getGameByAPIId(apiId: string):GameElement{
    let result : GameElement = {} as GameElement;
    this.apiService.getBoardGameByID([apiId]).subscribe((response:ApiGame)=>{
      result = response.games[0];
    })
    return result;
  }


  getGameShelfByLoginId(loginId:string){
    this.gameShelfService.searchGameShelfByLoginId(loginId).subscribe((response:any)=>{
      this.gameshelf = response;
      console.log(this.gameshelf);
      this.gameshelf.forEach(g=> this.myGameShelf.push(this.getGameByAPIId(g.apigameId)));
    })
  }


  addGameToGameShelf(apiGameId:string){
    apiGameId = this.selectedGame.id;
    this.gameShelfService.addGameToGameShelf(apiGameId, this.user.id).subscribe((response) =>{
      console.log("game shelf has been updated")
    });
  }

  // addGameToShelf(apiGameId:string, userId:number){
    
  //   this.gameShelfService.addGameToGameShelf(apiGameId)
  // }




}
