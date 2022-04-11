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
        public Preference GetPreferencesByUserId(int userId)
        {
            return context.Preferences.Where(p => p.UserId == userId).FirstOrDefault();
        }

        
        [HttpPatch("editCategory")]
        public void editCategory(Preference updatedPreference, string category)
        {
            updatedPreference.Categories = category;
            context.Preferences.Update(updatedPreference);
            context.SaveChanges();
        }

        [HttpPatch("editMechanic")]
        public void editMechanic()
        {

        }

    }
}
