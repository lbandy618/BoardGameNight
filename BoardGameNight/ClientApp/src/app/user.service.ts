import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string) { }

login(loginId:string){
return this.http.get(`${ this.baseUrl }api/User/login?loginId=${ loginId}`);
}

createuser(newUser:User){
  return this.http.post(`${ this.baseUrl }api/User`, {newUser});
}

getUsers():Observable<User[]>{
  return this.http.get<User[]>(`${ this.baseUrl }api/User`);
}

createNew(loginId:string){
  return this.http.post(`${ this.baseUrl }api/User/authenticationID?hashID=${ loginId }`,{});
}

updateSummary(summary:string, userID:number){
  return this.http.post(`${ this.baseUrl }api/User/updateSumary?summary=${ summary },userID=${userID}`, {});
}

updateAge(age:Number, userID: Number ){
  return this.http.post(`${ this.baseUrl }api/User/updateSumary?age=${ age },userID=${ userID }`, {});
}

}
