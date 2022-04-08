using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class Event
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public int? SessionId { get; set; }

        public virtual Session? Session { get; set; }
    }
}
