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
        public Preferences GetPreferencesByUserId(int userId)
        {
            return context.Preferences.Where(p => p.UserId == userId).FirstOrDefault();
        }

        
        [HttpPatch("editCategory")]
        public void editCategory(Preferences updatedPreference, string category)
        {
            updatedPreference.Categories = category;
            context.Preferences.Update(updatedPreference);
            context.SaveChanges();
        }

        [HttpPatch("editMechanic")]
        public void editMechanic()
        {

        }

        [HttpPatch("byMaxTime")]
        public void AddMaxTime(double maxTime, Preferences updatedPreference)
        {
            updatedPreference.MaxTime = maxTime;
            context.Preferences.Update(updatedPreference);
            context.SaveChanges();
        }

        [HttpPatch("byYearPublished")]
        public void AddYearPublished(int yearPulished, Preferences updatedPreference)
        {
            updatedPreference.YearPublished = yearPulished;
            context.Preferences.Update(updatedPreference);
            context.SaveChanges();
        }


    }
}
