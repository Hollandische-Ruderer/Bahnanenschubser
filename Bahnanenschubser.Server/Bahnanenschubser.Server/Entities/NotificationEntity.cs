using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Entities;

namespace Bahnanenschubser.Server {

    public class NotificationEntity : Entity {

        public string Notification { get; set; }
        public List<string> Comments { get; set; } = new List<string>();

    }
}
