import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { concat } from 'rxjs';
import { BoardgameapiService } from '../boardgameapi.service';
import { GameShelf } from '../game-shelf';
import { GameShelfService } from '../game-shelf.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  users:User[] = [];
  selectedUsers:User[]=[];
  selectedUsersGameShelf: GameShelf[] =[]
  displayPeople:boolean = false;

  constructor(private userService: UserService, private gameShelfService: GameShelfService, private boardGameApiService: BoardgameapiService) { }


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

  togglePeople(){
    this.displayPeople = !this.displayPeople;
  }

getSelectedUserOwnedGames(){

this.selectedUsers.forEach(u=>{
this.gameShelfService.searchGameShelfByUserId(u.id).subscribe((response:GameShelf[] )=>{
  console.log(response);
  this.selectedUsersGameShelf = this.selectedUsersGameShelf.concat(response)

})
})
}

selectedGamesCategories(){
this.selectedUsersGameShelf.forEach(g=>{
this.boardGameApiService.getBoardGameCategoriesByID(g.apiGameId).subscribe((response:GameShelf[] )=>{
  console.log(response);

})
})
}


//getBoardGameCategoriesByID
  // getNumberOfPlayers(form:NgForm){

  // }

}
