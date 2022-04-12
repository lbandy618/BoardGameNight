﻿using BoardGameNight.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BoardGameNight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameShelfController : ControllerBase
    {
        BoardGameNightDBContext context = new BoardGameNightDBContext();

        [HttpGet]
        // /api/GameShelf
        public List<GameShelf> GetGameShelf()
        {
            List<GameShelf> shelfList = context.OwnedGames.ToList();
            return shelfList;
        }

        [HttpGet("ById/{id}")] //searches by ID of the OwnedGames tables NOT the apiGameID
        // /api/GameShelf/ById/2
        public GameShelf GetOwnedGameById(int id)
        {
            return context.OwnedGames.Where(g => g.Id == id).FirstOrDefault();
        }

        [HttpGet("SearchGameShelfByUserId")]
        // api/GameShelf/SearchGameShelfByUserId?userId=1
        public List<GameShelf> SearchGameShelfByUserId(int userId)
        {
            return context.OwnedGames.Where(g => g.UserId == userId).ToList();
        }

        [HttpPost("addGametoGameShelf")]
        // /api/GameShelf/addGametoGameShelf?apiGameId=OIXt3DmJU0&userId=1
        public GameShelf AddGameToGameShelf(string apiGameId, int userId, int rating)
        {
            GameShelf result = new GameShelf();
            result.ApigameId = apiGameId;
            result.UserId = userId;
            result.Rating = rating;
            context.OwnedGames.Add(result);
            context.SaveChanges();
            return result;
        }

        [HttpDelete("ById/{id}")]
        // /api/GameShelf/ById/1
        public void DeleteOwnedGameById(int id)
        {
            GameShelf result = null;
            result = context.OwnedGames.FirstOrDefault(g => g.Id == id);
            if(result != null)
            {
                context.OwnedGames.Remove(result);
                context.SaveChanges();
            }
        }

        [HttpPatch("editRating")]
        // /api/GameShelf/editRating?rating=4
        public void EditRating([FromBody]GameShelf updatedGameShelf, int rating)
        {
            updatedGameShelf.Rating = rating;
            context.OwnedGames.Update(updatedGameShelf);
            context.SaveChanges();
        }
    }
}
