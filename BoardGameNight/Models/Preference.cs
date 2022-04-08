using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class Preference
    {
        public int Id { get; set; }
        public string? Categories { get; set; }
        public string? Mechanics { get; set; }
        public double? MaxTime { get; set; }
        public string? Publisher { get; set; }
        public int? YearPublished { get; set; }
        public int? UserId { get; set; }
        public int? OwnedId { get; set; }

        public virtual OwnedGame? Owned { get; set; }
        public virtual User? User { get; set; }
    }
}
