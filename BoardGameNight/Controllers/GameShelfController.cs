using BoardGameNight.Models;
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
        public List<GameShelf> GetGameShelf()
        {
            List<GameShelf> shelfList = context.OwnedGames.ToList();
            return shelfList;
        }

        [HttpGet("ById/{id}")]
        public GameShelf GetOwnedGameById(int id)
        {
            return context.OwnedGames.Where(g => g.Id == id).FirstOrDefault();
        }

        [HttpPost("addGametoGameShelf")]
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
        public void DeleteOwnedGameById(int gameId)
        {
            GameShelf result = null;
            result = context.OwnedGames.FirstOrDefault(g => g.Id == gameId);
            if(result != null)
            {
                context.OwnedGames.Remove(result);
                context.SaveChanges();
            }
        }

        [HttpPatch("editRating")]
        public void EditRating(GameShelf updatedGameShelf, int rating)
        {
            updatedGameShelf.Rating = rating;
            context.OwnedGames.Update(updatedGameShelf);
            context.SaveChanges();
        }

        [HttpGet("SearchGameShelfById")]
        public GameShelf SearchGameShelfById(int gameId)
        {
            return context.OwnedGames.Find(gameId);
        }

    }
}
