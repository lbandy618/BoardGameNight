import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GameNightEvent } from './gamenightevent';

@Injectable({
  providedIn: 'root'
})
export class GameNightEventService {

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string) { }

  getAllEvents():any{
    return this.http.get(`${this.baseUrl}api/Event`);
  }

  getEventByID(id:number):any{
    return this.http.get(`${this.baseUrl}api/Event/eventByID?eventID=${id}`);
  }

  getEventByDate(date:string):any{
    return this.http.get(`${this.baseUrl}api/Event/eventByDate?date=${date}`);
  }

  getEventByAttendeeID(loginId:string):any{
    return this.http.get(`${this.baseUrl}api/Event/eventByAttendeeID?userID=${loginId}`);
  }

  createEvent(newEvent:GameNightEvent):any{
   return this.http.post(`${this.baseUrl}api/Event`, newEvent);
  }

  deleteEventByID(eventId:number):any{
    return this.http.delete(`${this.baseUrl}api/Event/Delete/${eventId}`)
  }

}
