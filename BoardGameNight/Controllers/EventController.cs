using BoardGameNight.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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

        [HttpGet("eventByDate")]
        public List<Event> getEventsByDate(DateTime date)
        {
            return this.context.Events.Where(e => e.Date == date).ToList();
        }

        [HttpGet("eventByAttendeeID")]
        public List<Event> getEventsByAttendeeID(int userID)
        {
            List<SessionAttendee> sessionAttendees = this.context.SessionAttendees.Where(a => a.UserId == userID).ToList();
            List<Session> sessionsAttended = new List<Session>();
            foreach (SessionAttendee sessionAttendee in sessionAttendees)
            {
                sessionsAttended.Add(this.context.Sessions.Find(sessionAttendee.SessionId));
            }
            List<Event> events = new List<Event>();
            foreach (Session session in sessionsAttended)
            {
                events.AddRange(this.context.Events.Include(e => e.Session.SessionAttendees).Where(e => e.SessionId == session.Id));
            }
            return events;
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
