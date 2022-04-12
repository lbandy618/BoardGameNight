using BoardGameNight.Models;
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

        [HttpPost("authenticationID")] //checks for account, makes one in backend if none has been created
        public User hasUserID(string hashID)
        {
            if(context.Users.Where(u => u.LoginId == hashID).Count() == 0)
            {
                context.Users.Add(new User()
                {
                    LoginId = hashID
                });
            }
            context.SaveChanges();
            return context.Users.FirstOrDefault(u => u.LoginId == hashID);
           
        }

        [HttpPatch("profile")]
        public void updateProfile(User updatedUser)
        {
            User updatedUser = context.Users.First(u => u.LoginId == updatedUser.LoginId);
            context.Users.Update(updatedUser);
            context.SaveChanges();
        }

        //[HttpPatch("summary")]
        //public void updateSummary(string summary, string hashID)
        //{
        //    User updatedUser = context.Users.First(u => u.LoginId == hashID);
        //    updatedUser.Summary = summary;
        //    context.Users.Update(updatedUser);
        //    context.SaveChanges();
        //}

        //[HttpPatch("age")]
        //public void updateAge(int age, string hashID)
        //{
        //    User updatedUser = context.Users.First(u => u.LoginId == hashID);
        //    updatedUser.Age = age;
        //    context.Users.Update(updatedUser);
        //    context.SaveChanges();
        //}

        //[HttpPatch("userName")]
        //public void updateUserName(string userName, string hashID)
        //{
        //    User updatedUser = context.Users.First(u => u.LoginId == hashID);
        //    updatedUser.UserName = userName;
        //    context.Users.Update(updatedUser);
        //    context.SaveChanges();
        //}
    }
}
