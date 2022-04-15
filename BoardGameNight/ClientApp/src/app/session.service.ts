import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Session } from './session';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  endpoint:string = "api/Session";
  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string) { }

  //https://localhost:44423/api/Session
  getAllSessions():any{
    return this.http.get(this.baseUrl + "api/Session")
  }

  //https://localhost:44423/api/Session/createSession
  createSession(session:Session){
    let fullUrl:string = this.baseUrl + this.endpoint + "/createSession";
    return this.http.post(fullUrl, session);
  }
  //https://localhost:44423/api/Session/editWinner?userId=3
  editWinner(session:Session, userId:number){
    let fullUrl:string = this.baseUrl + this.endpoint + `?userId=${userId}`;
    return this.http.patch(fullUrl, session);
  }
  //https://localhost:44423/api/Session/editWinner?userId=3
  editTimePlayed(session:Session, timePlayed:number){
    let fullUrl:string = this.baseUrl + this.endpoint + `?timePlayed=${timePlayed}`;
    return this.http.patch(fullUrl, session);
  }

  //https://localhost:44423/api/Session/editWinner?userId=3
  editEnjoyment(session:Session, enjoyment:number){
    let fullUrl:string =  this.baseUrl + this.endpoint + `?enjoyment=${enjoyment}`;
    return this.http.patch(fullUrl, session);
  }

  addAttendees(attendees: User[], sessionId:number){
    let fullUrl:string =  this.baseUrl + this.endpoint + `/addAttendees?sessionID=${sessionId}`;
    return this.http.post(fullUrl, attendees);
  }
}
