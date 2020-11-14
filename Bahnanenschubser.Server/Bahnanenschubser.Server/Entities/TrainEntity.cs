using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Entities;

namespace Bahnanenschubser.Server {

    public class TrainEntity : Entity {

        public string TrainId { get; set; }

        public List<Notification> Notifications { get; set; } = new List<Notification>();
    }
}
