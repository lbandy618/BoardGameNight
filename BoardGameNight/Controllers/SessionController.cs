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

        //[HttpPatch("AddWinner")]
        //public Session addWinner(int sessionId, int userId)
        //{
        //   context.Sessions.Update(new Session()
        //   {
        //       Winner == userId,
               
        //   })
        //}


        //[HttpGet("timePlayed")]
        //public double getTimePlayed(Session session)
        //{
        //    return context.Sessions.
        //}

        //[HttpPatch]
        //public Session editSession(Session newSession)
        //{

        //}






    }
}

