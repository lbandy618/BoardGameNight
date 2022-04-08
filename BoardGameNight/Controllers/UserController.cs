﻿using BoardGameNight.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BoardGameNight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        BoardGameNightDBContext context = new BoardGameNightDBContext();

        [HttpGet]
        public List<User> getUsers()
        {
            return context.Users.ToList();
        }

        [HttpGet("login")]
        public User login(string loginId)
        {
            return context.Users.First(u => u.LoginId == loginId);
        }

        [HttpPost]
        public User createUser(User newUser)
        {
            context.Users.Add(newUser);
            context.SaveChanges();
            return newUser;
        }

        [HttpPost("authenticationID")]
        public void hasUserID(string hashID)
        {
            if(context.Users.Where(u => u.LoginId == hashID).Count() == 0)
            {
                context.Users.Add(new User()
                {
                    LoginId = hashID
                });
            }context.SaveChanges();

           
        }

        [HttpPatch("summary")]
        public void updateSummary(string summary, int userID)
        {
            context.Users.Update(new User()
            {
                Id = userID,
                Summary = summary
          });
            context.SaveChanges();
        }

        [HttpPatch("age")]
        public void updateAge(int age, int userID)
        {
            context.Users.Update(new User()
            {
                Id = userID,
                Age = age
            });
            context.SaveChanges();
        }
    }
}
