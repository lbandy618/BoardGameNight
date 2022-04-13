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

updateProfile(updatedUser:User){
  return this.http.patch(`${ this.baseUrl }api/User/profile`, updatedUser);
}

// updateSummary(summary:string, LoginId: string){
//   return this.http.patch(`${ this.baseUrl }api/User/summary?summary=${ summary }&hashID=${ LoginId }`, {});
// }

// updateAge(age:Number, LoginId: string ){
//   return this.http.patch(`${ this.baseUrl }api/User/age?age=${ age }&hashID=${ LoginId }`, {});
// }

// updateUserName(userName: string, LoginId: string ){
//   return this.http.patch(`${ this.baseUrl }api/User/userName?userName=${ userName }&hashID=${ LoginId }`, {});
// }

}
