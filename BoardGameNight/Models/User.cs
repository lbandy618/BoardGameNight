using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class User
    {
        public User()
        {
            GameShelves = new HashSet<GameShelf>();
            Preferences = new HashSet<Preference>();
            SessionAttendees = new HashSet<SessionAttendee>();
            UserStats = new HashSet<UserStat>();
        }

        public int Id { get; set; }
        public string LoginId { get; set; } = null!;
        public int? Age { get; set; }
        public string? Summary { get; set; }
        public string? UserName { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<GameShelf> GameShelves { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<Preference> Preferences { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<SessionAttendee> SessionAttendees { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<UserStat> UserStats { get; set; }
    }
}
