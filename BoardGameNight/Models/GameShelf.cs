﻿using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class GameShelf
    {
        public GameShelf()
        {
            Preferences = new HashSet<Preferences>();
            Sessions = new HashSet<Session>();
        }

        public int Id { get; set; }
        public string? ApigameId { get; set; }
        public int? Rating { get; set; }
        public int? UserId { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<Preferences> Preferences { get; set; }
        public virtual ICollection<Session> Sessions { get; set; }
    }
}
