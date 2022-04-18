import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GameNightEventService } from '../gamenightevent.service';
import { GameShelfService } from '../game-shelf.service';
import { UserService } from '../user.service';
import { GameNightEvent } from '../gamenightevent';

@Component({
  selector: 'app-game-night-event',
  templateUrl: './game-night-event.component.html',
  styleUrls: ['./game-night-event.component.css']
})
export class GameNightEventComponent implements OnInit {

  events:GameNightEvent[] = [];
  loggedIn:Boolean = false;
  user:SocialUser = {} as SocialUser;

  constructor(private gameNightEventService: GameNightEventService, private userService: UserService, private gameShelfService: GameShelfService, private http:HttpClient, @Inject('BASE_URL') private baseUrl:string, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

  }

  CreateEvent(event:GameNightEvent){
    if(this.loggedIn){
      this.gameNightEventService.createEvent(event).subscribe((response:any) =>{
        console.log(event);
      })
    }
  }

  GetEventByAttendee(loginId:string){
    this.gameNightEventService.getEventByAttendeeID(loginId).subscribe((response:any) => {
      console.log(loginId);
    })
  }

  DeleteEvent(eventId:number){
    if(this.loggedIn){
      let index: number = this.events.findIndex(e => e.id == eventId);
      this.events.splice(index,1);
      this.gameNightEventService.deleteEventByID(eventId).subscribe((response:any) => {
        console.log(eventId);
        this.events.splice(eventId,1);
      })
    }
  }

  GetAllEvents(){
    this.gameNightEventService.getAllEvents().subscribe((response:any) => {
    })
  }

}
