import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiGame, GameElement } from '../ApiGame';
import { BoardgameapiService } from '../boardgameapi.service';
import { GameShelfService } from '../game-shelf.service';

@Component({
  selector: 'app-game-shelf',
  templateUrl: './game-shelf.component.html',
  styleUrls: ['./game-shelf.component.css']
})
export class GameShelfComponent implements OnInit {
gameSearch:ApiGame = {} as ApiGame;
selectedGame:GameElement = {} as GameElement;

  constructor(private apiService:BoardgameapiService, private gameShelfService:GameShelfService) { }

  ngOnInit(): void {

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
  }

  // addGameToShelf(apiGameId:string, userId:number){
    
  //   this.gameShelfService.addGameToGameShelf(apiGameId)
  // }




}