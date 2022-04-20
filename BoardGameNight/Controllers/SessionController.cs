using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BoardGameNight.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("getSessionbyLoginId")]
        public List<Session> getAllSessionsById(string loginId)
        {
            int userId = context.Users.First(u => u.LoginId == loginId).Id;
            List<SessionAttendee> attendees = context.SessionAttendees.Where(u => u.UserId == userId).ToList();
            List<Session> result = new List<Session>();

            foreach (SessionAttendee a in attendees)
            {
                result.Add(context.Sessions.FirstOrDefault(s => s.Id == a.SessionId));
            }
            foreach (Session b in result)
            {
                b.Owned = context.GameShelves.Find(b.OwnedId);
                b.SessionAttendees = context.SessionAttendees.Include(u => u.User).Where(sa => sa.SessionId == b.Id).ToList();
                b.Event = context.Events.Find(b.EventId);

            }
            return result;
        }



        [HttpPost("createSession")]
        public Session createSession([FromBody]Session newSession)
        {
            context.Sessions.Add(newSession);
            context.SaveChanges();
            return newSession;
        }

        [HttpPatch("editWinner")]
        public Session editWinner([FromBody]Session updatedSession, string loginId)
        {
            User user = new User();
            Session session = context.Sessions.Find(updatedSession.Id);
            session.Winner = updatedSession.Winner;
            user = context.Users.FirstOrDefault(l => l.LoginId == loginId);
            context.Sessions.Update(session);
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

