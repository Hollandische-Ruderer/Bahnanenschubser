using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bahnanenschubser.Server {

    public class MongoDBOptions {

        public string Address { get; set; }
        public int Port { get; set; }
        public string Database { get; set; }
    }
}
