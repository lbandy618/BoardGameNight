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
        public List<Preference> GetAllPreferences()
        {
            return context.Preferences.ToList();
        }

        [HttpGet("ByUserId/{userId}")]
        //api/Preferences/ByUserId/{userId}
        public Preference GetPreferencesByUserId(int userId)
        {
            return context.Preferences.Where(p => p.UserId == userId).FirstOrDefault();
        }

        [HttpPost]
        //make sure to add at least category and userId
        //api/Preferences/
        public Preference createPreferences([FromBody]Preference newPreferences)
        {
            context.Preferences.Add(newPreferences);
            context.SaveChanges();
            return newPreferences;
        }

        
        [HttpPatch("editCategory")]
        //api/Preferences/editCategory?category=meow
        public void editCategory([FromBody] Preference updatedPreference, string category)
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
        public void AddMaxTime(double maxTime, [FromBody] Preference updatedPreference)
        {
            updatedPreference.MaxTime = maxTime;
            context.Preferences.Update(updatedPreference);
            context.SaveChanges();
        }

        [HttpPatch("byYearPublished")]
        public void AddYearPublished(int yearPulished, [FromBody] Preference updatedPreference)
        {
            updatedPreference.YearPublished = yearPulished;
            context.Preferences.Update(updatedPreference);
            context.SaveChanges();
        }


    }
}
