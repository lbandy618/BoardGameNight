using System;
using System.Collections.Generic;

namespace BoardGameNight.Models
{
    public partial class SessionAttendee
    {
        public int Id { get; set; }
        public int? SessionId { get; set; }
        public int? UserId { get; set; }

        public virtual Session? Session { get; set; }
        public virtual User? User { get; set; }
    }
}

