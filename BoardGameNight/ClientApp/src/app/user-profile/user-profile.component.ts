import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
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
  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string, private userService:UserService, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
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
      loginId: '',
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
