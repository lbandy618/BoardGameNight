import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string) { }

  getAllEvents():any{
    this.http.get(`${this.baseUrl}/api/Event`);
  }

getEventByID(id:number):any{
  this.http.get(`${this.baseUrl}/api/Event/eventByID?eventID=${id}`);
}

getEventByDate(date:string):any{
  this.http.get(`${this.baseUrl}/api/Event/eventByDate?date=${date}`);
}

getEventByAttendeeID(userID:number):any{
  this.http.get(`${this.baseUrl}/api/Event/eventByAttendeeID?userID=${userID}`);
}

createEvent(newEvent:Event):any{
 this.http.post(`${this.baseUrl}/api/Event`, newEvent);
}

deleteEventByID(eventId:number):any{
  this.http.delete(`${this.baseUrl}/api/Event/Delete/${eventId}`)
}

}
