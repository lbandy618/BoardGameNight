import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardgameapiService {

  url:string = "https://api.boardgameatlas.com";
  

  constructor(private http: HttpClient) { }

  // https://api.boardgameatlas.com/api/search?ids=OIXt3DmJU0&client_id=
  getBoardGameByID(boardgameid:string[]):any{
    let combined:string = "";
    boardgameid.forEach(id => combined + id + "," ) 
    // combined = combined.substring(0, (combined.length - 1))
    combined = combined.slice(0, -1) //does the same as line above, but fancier
    return this.http.get(`${this.url}/api/search?ids=${boardgameid}&client_id=${Secret.clientID}`)
  }

  // https://api.boardgameatlas.com/api/search?name=catan&client_id=
  getBoardGameByName(boardgamename:string):any{
    return this.http.get(`${this.url}/api/search?name=${boardgamename}&client_id=${Secret.clientID}`)
  }

  // https://api.boardgameatlas.com/api/game/mechanics?client_id=
    getBoardGameMechanics(boardgamemechanics:string):any{
      return this.http.get(`${this.url}/api/game/mechanics?client_id=${Secret.clientID}`)
    }

    // https://api.boardgameatlas.com/api/search?mechanics=R0bGq4cAl4&client_id=
    getBoardGameMechanicsByID(boardgamemechanicsid:string):any{
      return this.http.get(`${this.url}/api/search?mechanics=${boardgamemechanicsid}&client_id=${Secret.clientID}`)
    }

      // https://api.boardgameatlas.com/api/game/categories?client_id=
      getBoardGameCategories(boardgamecategories:string):any{
        return this.http.get(`${this.url}/api/game/category?client_id=${Secret.clientID}`)
      }
  
      // https://api.boardgameatlas.com/api/search?categories=R0bGq4cAl4&client_id=
      getBoardGameCategoriesByID(boardgamecategoriesid:string):any{
        return this.http.get(`${this.url}/api/search?category=${boardgamecategoriesid}&client_id=${Secret.clientID}`)
      }
  


}

