using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class Session
    {
        public Session()
        {
            Events = new HashSet<Event>();
            SessionAttendees = new HashSet<SessionAttendee>();
        }

        public int Id { get; set; }
        public double? TimePlayed { get; set; }
        public string? Winner { get; set; }
        public int? Enjoyment { get; set; }
        public int? OwnedId { get; set; }
        public int? EventId { get; set; }

        public virtual Event? Event { get; set; }
        public virtual GameShelf? Owned { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<SessionAttendee> SessionAttendees { get; set; }
    }
}
