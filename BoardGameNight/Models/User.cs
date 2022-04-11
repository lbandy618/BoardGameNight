﻿using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class User
    {
        public User()
        {
            OwnedGames = new HashSet<OwnedGame>();
            Preferences = new HashSet<Preference>();
            SessionAttendees = new HashSet<SessionAttendee>();
            UserStats = new HashSet<UserStat>();
        }

        public int Id { get; set; }
        public string LoginId { get; set; } = null!;
        public int? Age { get; set; }
        public string? Summary { get; set; }

        public virtual ICollection<OwnedGame> OwnedGames { get; set; }
        public virtual ICollection<Preference> Preferences { get; set; }
        public virtual ICollection<SessionAttendee> SessionAttendees { get; set; }
        public virtual ICollection<UserStat> UserStats { get; set; }
    }
}