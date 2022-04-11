using BoardGameNight.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BoardGameNight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        BoardGameNightDBContext context = new BoardGameNightDBContext();

        [HttpGet]
        public List<Event> getEvents()
        {
            return this.context.Events.ToList();
        }

       [HttpGet("eventByID")]
       public Event getEventByID(int eventID)
        {
            return this.context.Events.Where(e => e.Id == eventID).FirstOrDefault();
        }

        [HttpPost]
        public Event createEvent(Event newEvent)
        {
            context.Events.Add(newEvent);
            context.SaveChanges();
            return newEvent;
        }
    }
}
