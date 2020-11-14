using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Entities;

namespace Bahnanenschubser.Server {

    public class Notification {
        public string Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string Message { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
