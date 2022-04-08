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


        //[HttpPost("createSession")]
        //public Session createSession(Session session)
        //{
            
        //}


        //[HttpGet("timePlayed")]
        //public double getTimePlayed()
        //{   
            
        //}





    }
}

