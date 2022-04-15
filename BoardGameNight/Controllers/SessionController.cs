using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BoardGameNight.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameNight.Controllers
{
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        BoardGameNightDBContext context = new BoardGameNightDBContext();

        [HttpGet]
        public List<Session> getAllSessions()
        {
            return context.Sessions.ToList();

        }

        [HttpPost("createSession")]
        public Session createSession([FromBody]Session newSession)
        {
            context.Sessions.Add(newSession);
            context.SaveChanges();
            return newSession;
        }

        [HttpPatch("editWinner")]
        public Session editWinner([FromBody]Session updatedSession, int userId)
        {
            User user = new User();
            user = context.Users.Find(userId);
            updatedSession.Winner = user.UserName;
            context.Sessions.Update(updatedSession);
            context.SaveChanges();
            return updatedSession;
        }


        [HttpPatch("editTimePlayed")]
        public void editTimePlayed([FromBody]Session updatedSession, double timePlayed)
        {
            updatedSession.TimePlayed = timePlayed;
            context.Sessions.Update(updatedSession);
            context.SaveChanges();
        }

        [HttpPatch("editEnjoyment")]
        public void editEnjoyment([FromBody]Session updatedSession, int enjoyment)
        {
            updatedSession.Enjoyment = enjoyment;
            context.Sessions.Update(updatedSession);
            context.SaveChanges();
        }

        [HttpPost("addAttendees")]
        public void addAttendees([FromBody]List<User> attendees, int sessionID)
        {
            foreach (User user in attendees)
            {
                SessionAttendee attendee = new SessionAttendee();
                attendee.UserId = user.Id;
                attendee.SessionId = sessionID;
                context.SessionAttendees.Add(attendee);
            }
            context.SaveChanges();
        }

    }
}

