import { Component } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { UserService } from '../user.service';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  
  constructor(private authService: SocialAuthService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response:any) =>{
      this.userService.createNew(this.user.id).subscribe((response:any)=> { 
        console.log(response);
        if (response.userName == null){
          this.router.navigate(["/user-profile"]);
        }
      });
    });
    }
  
    signOut(): void {
    this.authService.signOut();
    }    


     

}
