using BoardGameNight.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BoardGameNight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreferencesController : ControllerBase
    {
        BoardGameNightDBContext context = new BoardGameNightDBContext();

        [HttpGet]
        public List<Preferences> GetAllPreferences()
        {
            return context.Preferences.ToList();
        }

        [HttpGet("ByUserId/{userId}")]
        //api/Preferences/ByUserId/{userId}
        public Preferences GetPreferencesByUserId(int userId)
        {
            return context.Preferences.Where(p => p.UserId == userId).FirstOrDefault();
        }

        [HttpPost]
        //make sure to add at least category and userId
        //api/Preferences/
        public Preferences createPreferences([FromBody]Preferences newPreferences)
        {
            context.Preferences.Add(newPreferences);
            context.SaveChanges();
            return newPreferences;
        }

        
        [HttpPatch("editCategory")]
        //api/Preferences/editCategory?category=meow
        public void editCategory([FromBody] Preferences updatedPreference, string category)
        {
            updatedPreference.Categories = category;
            context.Preferences.Update(updatedPreference);
            context.SaveChanges();
        }

        //stretch goals below

        [HttpPatch("editMechanic")]
        public void editMechanic()
        {

        }

        [HttpPatch("byMaxTime")]
        public void AddMaxTime(double maxTime, [FromBody] Preferences updatedPreference)
        {
            updatedPreference.MaxTime = maxTime;
            context.Preferences.Update(updatedPreference);
            context.SaveChanges();
        }

        [HttpPatch("byYearPublished")]
        public void AddYearPublished(int yearPulished, [FromBody] Preferences updatedPreference)
        {
            updatedPreference.YearPublished = yearPulished;
            context.Preferences.Update(updatedPreference);
            context.SaveChanges();
        }


    }
}
