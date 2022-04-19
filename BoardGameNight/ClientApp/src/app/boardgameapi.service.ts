import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret } from './secret';

@Injectable({
  providedIn: 'root'
})
export class BoardgameapiService {

  url:string = "https://api.boardgameatlas.com";
  

  constructor(private http: HttpClient) { }
  // https://api.boardgameatlas.com/api/search?ids=OIXt3DmJU0&client_id=
  getBoardGameByID(boardgameid:string[]):any{
    let combined:string = "";
    boardgameid.forEach(id => combined += id + "," ) 
    // combined = combined.substring(0, (combined.length - 1))
    combined = combined.slice(0, -1) //does the same as line above, but fancier
    console.log(combined)
    return this.http.get(`${this.url}/api/search?ids=${combined}&client_id=${Secret.clientID}`)
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
  // getBoardGameCategories(boardgamecategories:string):any{
  //   return this.http.get(`${this.url}/api/game/category?client_id=${Secret.clientID}`)
  // }

  // https://api.boardgameatlas.com/api/search?categories=R0bGq4cAl4&client_id=
  getBoardGameCategoriesByID(boardgamecategoriesid:string[]):any{
    let combined:string = "";
    boardgamecategoriesid.forEach(id => combined += id + "," ) 
    combined = combined.slice(0, -1) 
    console.log(combined)
    console.log(boardgamecategoriesid)
    return this.http.get(`${this.url}/api/search?categories=${combined}&client_id=${Secret.clientID}`)
  }

  //https://api.boardgameatlas.com/api/search?lt_min_age=10&client_id=
  getBoardGameByMinAge(minAge:number):any {
    return this.http.get(`${this.url}/api/search?lt_min_age=${minAge}&client_id=${Secret.clientID}`)
  }

  //https://api.boardgameatlas.com/api/search?primary_publisher=jVKDlz7qmo&client_id=
  getBoardGamesByPublisher(publisherName:string):any{
    return this.http.get(`${this.url}/api/search?primary_publisher=${publisherName}&client_id=${Secret.clientID}`)
  }

  //https://api.boardgameatlas.com/api/search?year_published=2020&client_id=
  getBoardGamePublishedYear(boardgamePublishedYear:number):any{
    return this.http.get(`${this.url})/api/search?year_published=${boardgamePublishedYear}&client_id=${Secret.clientID}`)
  }

  //https://api.boardgameatlas.com/api/search?max_players=5&client_id=
  getBoardGameMaxPlayers(boardgameMaxPlayers:number):any{
    return this.http.get(`${this.url})/api/search?max_players=${boardgameMaxPlayers}&client_id=${Secret.clientID}`)
  }

  getBoardGameMinPlayers(boardgameMinPlayers:number):any{
  return this.http.get(`${this.url})/api/search?min_players=${boardgameMinPlayers}&client_id=${Secret.clientID}`)
  }

  // https://api.boardgameatlas.com/api/search?ids=OIXt3DmJU0&fields=image_url&client_id=
  getBoardGameImagesByGameID(gameID:string):any{
    return this.http.get(`${this.url}/api/search?ids=${gameID}&fields=image_url&client_id=${Secret.clientID}`)
  }
  
  getBoardGamesOrderedBy(reorderBoardGames:string):any{
    return this.http.get(`${this.url})/api/search?order_by=${reorderBoardGames}&client_id=${Secret.clientID}`)
  }

  getBoardGameMaxPlayTime(boardgameMaxPlayTime:number):any{
    return this.http.get(`${this.url})/api/search?max_playtime=${boardgameMaxPlayTime}&client_id=${Secret.clientID}`)
    }

  getBoardGameMinPlayTime(boardgameMinPlayTime:number):any{
  return this.http.get(`${this.url})/api/search?max_playtime=${boardgameMinPlayTime}&client_id=${Secret.clientID}`)
  }
}

