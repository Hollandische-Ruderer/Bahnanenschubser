using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Entities;

namespace Bahnanenschubser.Server {

    public class UserEntity : Entity {
        public string Username { get; set; }
        public Coordinates2D Position { get; set; }
    }
}
