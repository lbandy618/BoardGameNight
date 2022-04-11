import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  endpoint:string = "api/Session";
  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string) { }

  getAllSessions():any{
    return this.http.get(this.baseUrl + "api/Session")
  }

  createSession(session:Session){
    let fullUrl:string = this.baseUrl + this.endpoint;
    return this.http.post(fullUrl, session);
  }

  editWinner(session:Session, userId:number){
    let fullUrl:string = this.baseUrl + this.endpoint + `?userId=${userId}`;
    return this.http.patch(fullUrl, session);
  }

  editTimePlayed(session:Session, timePlayed:number){
    let fullUrl:string = this.baseUrl + this.endpoint + `?timePlayed=${timePlayed}`;
    return this.http.patch(fullUrl, session);
  }

  editEnjoyment(session:Session, enjoyment:number){
    let fullUrl:string =  this.baseUrl + this.endpoint + `?enjoyment=${enjoyment}`;
    return this.http.patch(fullUrl, session);
  }
}
