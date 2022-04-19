import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { concat } from 'rxjs';
import { ApiGame, GameElement } from '../ApiGame';
import { BoardgameapiService } from '../boardgameapi.service';
import { Category, iCategory } from '../category';
import { GameShelf } from '../game-shelf';
import { GameShelfService } from '../game-shelf.service';
import { GameNightEvent } from '../gamenightevent';
import { GameNightEventService } from '../gamenightevent.service';
import { Session } from '../session';
import { SessionService } from '../session.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
  export class HomeComponent {

  users:User[] = [];
  selectedUsers:User[]=[];
  selectedUsersGameShelf: GameShelf[] =[];
  displayPeople:boolean = false;
  selectedCategoryIds:string[] = [];
  selectedCategoryNames:string[] =[];
  displayCategoryNames:boolean = false;
  chosenCategory:iCategory = {} as iCategory;
  apiGameList: GameElement[] = [];
  randomGame: GameElement = {} as GameElement;

  constructor(private sessionService:SessionService, private gameNightEventService: GameNightEventService, private userService: UserService, private gameShelfService: GameShelfService, private boardGameApiService: BoardgameapiService) { }


  ngOnInit(): void {
  this.getUsers();

  }

  getUsers(){
    this.userService.getUsers().subscribe((response:User[]) => {
      this.users = response;
      console.log(response)
    });
  }

  selectUser(user:User){
    let index:number = this.selectedUsers.findIndex(u=> u.id == user.id);
    if(index==-1){ //if not in the array
      this.selectedUsers.push(user);
    }
    else { //if they are in the array
      this.selectedUsers.splice(index,1);
    }
    console.log(this.selectedUsers);
  }

  selectCategory(category:string){
    this.chosenCategory = Category.getObjectByName(category);
    console.log(this.chosenCategory);

    // let index:number = this.selectedCategoryNames.findIndex(c => c.)
  }

  togglePeople(){
    this.displayPeople = !this.displayPeople;
  }

  toggleCategory(){
    this.displayCategoryNames = !this.displayCategoryNames;
  }


  getSelectedUserOwnedGames(){
    this.selectedUsers.forEach(u=>{
    this.gameShelfService.searchGameShelfByUserId(u.id).subscribe((response:GameShelf[] )=>{
      console.log(response);
      this.selectedUsersGameShelf = this.selectedUsersGameShelf.concat(response)
      this.selectedGamesCategories();
      })
    })
    this.toggleCategory();
  }

  getSelectedCategory(){
    this.selectedCategoryNames.forEach(c =>{
      
    })
  }

  selectedGamesCategories(){
    if (this.selectedUsersGameShelf.length > 0){
      let selectedGameIds:string[] = []
      this.selectedUsersGameShelf.forEach(g=>{
        selectedGameIds.push(g.apigameId)
      })
        console.log(selectedGameIds)
       let sortedArray:string[] = selectedGameIds.sort();
        let results:string[] = [];
        for(let i = 0; i < sortedArray.length - 1; i++){
          if(sortedArray[i+1] == sortedArray[i]){
            results.push(sortedArray[i]);
          }
        }
          console.log(results);
          console.log("this is showing only dups");
          if(results.length == 0){ //no dubs found
            results = selectedGameIds;
          }
          this.boardGameApiService.getBoardGameByID(results).subscribe((response:ApiGame)=>{
          console.log(response);
          console.log("showing full api response");
          this.apiGameList = response.games;
          let categoryIds:string[] = []
          response.games.forEach(g =>{  //nested for each, grabbing the category id out of category array inside each game list
              console.log(response.games);
              console.log("grabbed cat id out of cat array")
              g.categories.forEach(c => {
              categoryIds.push(c.id);
          })
          console.log(categoryIds);
          this.selectedCategoryIds = categoryIds;
          this.getBoardGameCategoriesNames();
        })
      })
    }
  }

  getBoardGameCategoriesNames(){
    this.selectedCategoryIds.forEach(c => { 
    this.selectedCategoryNames.push(Category.getCategoryNameById(c));
    })
    this.selectedCategoryNames = Array.from(new Set(this.selectedCategoryNames));
    console.log(this.selectedCategoryNames);
    
  }

  callApiGamefromShelf(){
    if (this.apiGameList.length > 0){
      let sharedGames:GameElement[] = this.apiGameList.filter(c => c.categories.map(c=>c.id).includes(this.chosenCategory.id))
      console.log(Math.floor((Math.random()*sharedGames.length)));
      console.log(sharedGames);
      this.randomGame = sharedGames[Math.floor((Math.random()*sharedGames.length))]
    }
  }
  
  // getBoardGameCategoriesByID

    // getNumberOfPlayers(form:NgForm){

    // }

    createEvent(form:NgForm, newSession:Session){
      console.log(form.form.value.date)
      let newEvent : GameNightEvent = {} as GameNightEvent;
      newEvent.date = form.form.value.date;
      newEvent.sessionId = newSession.id+"";
      this.gameNightEventService.createEvent(newEvent).subscribe((response:any)=>{
        console.log(response);
      })
    }

    createSession(form:NgForm){
      let ownedResult: GameShelf = this.selectedUsersGameShelf.filter(s => s.apigameId == this.randomGame.id)[0];  //who owns the game we're choosing
      let newSession : Session = {} as Session;
      newSession.ownedId= ownedResult.id;
      this.sessionService.createSession(newSession).subscribe((response:any)=>{
        console.log(response);
        this.sessionService.addAttendees(this.selectedUsers,response.id).subscribe((response1:any)=>{
          console.log(response1);
        });
        this.createEvent(form, response);
      });
    }


}
