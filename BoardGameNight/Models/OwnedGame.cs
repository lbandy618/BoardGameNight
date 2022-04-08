using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class OwnedGame
    {
        public OwnedGame()
        {
            Preferences = new HashSet<Preference>();
            Sessions = new HashSet<Session>();
        }

        public int Id { get; set; }
        public string? ApigameId { get; set; }
        public int? Rating { get; set; }
        public int? UserId { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<Preference> Preferences { get; set; }
        public virtual ICollection<Session> Sessions { get; set; }
    }
}
