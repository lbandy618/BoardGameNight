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
        public Session createSession(Session newSession)
        {
            context.Sessions.Add(newSession);
            context.SaveChanges();
            return newSession;
        }

        [HttpPatch("editWinner")]
        public void editWinner(Session updatedSession, int userId)
        {
            User user = new User();
            user = context.Users.Find(userId);
            updatedSession.Winner = user.UserName;
            context.Sessions.Update(updatedSession);
            context.SaveChanges();
        }


        [HttpPatch("editTimePlayed")]
        public void editTimePlayed(Session updatedSession, double timePlayed)
        {
            updatedSession.TimePlayed = timePlayed;
            context.Sessions.Update(updatedSession);
            context.SaveChanges();
        }

        [HttpPatch("editEnjoyment")]
        public void editEnjoyment(Session updatedSession, int enjoyment)
        {
            updatedSession.Enjoyment = enjoyment;
            context.Sessions.Update(updatedSession);
            context.SaveChanges();
        }

    }
}

