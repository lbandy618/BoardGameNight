import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Preferences } from './preferences';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  endpoint:string = "api/Preferences";

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string) { }


getAllPreferences(){
return this.http.get(this.baseUrl + "api/Preferences/");
}

createPreference(newPreference: Preferences){
  return this.http.post(this.baseUrl+"api/Preferences/", newPreference);
}

getPreferencesByUserId(userId:number){
  return this.http.get(`${ this.baseUrl } + "api/Preferences/ByUserId/${ userId }`);
}

editCategory(updatedPreference: Preferences, category: string ){
  let fullUrl:string =  this.baseUrl + this.endpoint + `?category=${ category }`;
  return this.http.patch(fullUrl, updatedPreference);
}

addMaxTime(updatedPreference: Preferences, maxTime:number){
  return this.http.patch(`${ this.baseUrl } +"api/Preferences/byMaxTime?maxTime=${ maxTime } `, updatedPreference);
}

addYearPublished(updatedPreference: Preferences, yearPublished:number){
  return this.http.patch(`${ this.baseUrl } +"api/Preferences/byMaxTime?yearPublished=${ yearPublished } `, updatedPreference);
}



}
