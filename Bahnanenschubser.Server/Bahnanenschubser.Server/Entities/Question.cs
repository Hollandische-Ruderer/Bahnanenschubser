using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bahnanenschubser.Server {

    public class QuestionEntity {
        public DateTime Timestamp { get; set; }
        public string Message { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
