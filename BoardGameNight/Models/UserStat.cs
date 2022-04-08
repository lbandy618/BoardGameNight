using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class UserStat
    {
        public int Id { get; set; }
        public int? Wins { get; set; }
        public int? TimesGamePlayed { get; set; }
        public double? TotalTimePlayed { get; set; }
        public int? UserId { get; set; }

        public virtual User? User { get; set; }
    }
}
