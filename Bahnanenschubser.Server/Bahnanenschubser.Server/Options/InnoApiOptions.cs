using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bahnanenschubser.Server {

    public class InnoApiOptions {
        public Uri Endpoint { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
