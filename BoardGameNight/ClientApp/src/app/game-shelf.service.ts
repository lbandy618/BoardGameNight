import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameShelf } from './game-shelf';

@Injectable({
  providedIn: 'root'
})
export class GameShelfService {

endpoint:string = 'api/GameShelf';

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string) { }


getGameShelf(newGameShelf:GameShelf){
  return this.http.post(`${ this.baseUrl }api/GameShelf`, {});
}
getOwnedGameById(id:number){
  return this.http.get(`${ this.baseUrl }api/GameShelf/ById/${ id }`);
}

addGameToGameShelf(apiGameId:string, LoginId:string){
 return this.http.post(`${ this.baseUrl }api/GameShelf/addGametoGameShelf?apiGameId=${ apiGameId}&userId=${ LoginId }`, {});
}

deleteOwnedGameById(gameId:number){
  return this.http.delete(`${ this.baseUrl }api/GameShelf/ById/${ gameId }`);
}

editRating(updatedGameShelf:GameShelf, rating:number){
  let fullUrl:string =  this.baseUrl + this.endpoint + `?rating=${rating}`;
  return this.http.patch(fullUrl, updatedGameShelf);
}

// searchGameShelfById(gameId:number){
//   return this.http.get(`${ this.baseUrl }api/GameShelf/SearchGameShelfById?gameId=${ gameId }`);
// }

searchGameShelfByUserId(userId:number):Observable<GameShelf[]>{
  return this.http.get<GameShelf[]>(`${ this.baseUrl }api/GameShelf/SearchGameShelfByUserId?userId=${ userId }`);
}
}

