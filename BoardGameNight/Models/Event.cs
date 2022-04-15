using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class Event
    {
        public Event()
        {
            Sessions = new HashSet<Session>();
        }

        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public int? SessionId { get; set; }

        public virtual Session? Session { get; set; }
        public virtual ICollection<Session> Sessions { get; set; }
    }
}
