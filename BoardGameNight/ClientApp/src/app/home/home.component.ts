import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  users:User[] = [];
  selectedUsers:User[]=[];
  displayPeople:boolean = false;

  constructor(private userService: UserService, ) { }


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



  // getNumberOfPlayers(form:NgForm){

  // }

}
