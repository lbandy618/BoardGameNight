using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class User
    {
        public User()
        {
            OwnedGames = new HashSet<GameShelf>();
            Preferences = new HashSet<Preferences>();
            SessionAttendees = new HashSet<SessionAttendee>();
            UserStats = new HashSet<UserStat>();
        }

        public int Id { get; set; }
        public string LoginId { get; set; } = null!;
        public int? Age { get; set; }
        public string? Summary { get; set; }
        public string? UserName { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<GameShelf> OwnedGames { get; set; }
        public virtual ICollection<Preferences> Preferences { get; set; }
        public virtual ICollection<SessionAttendee> SessionAttendees { get; set; }
        public virtual ICollection<UserStat> UserStats { get; set; }
    }
}
