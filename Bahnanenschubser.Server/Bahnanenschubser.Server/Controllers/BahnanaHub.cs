using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Bahnanenschubser.Server {

    public class BahnanaHub : Hub {

        public override async Task OnConnectedAsync() {
            await base.OnConnectedAsync();
        }

        public async Task UpdateLocation( double longitude, double latitude, CancellationToken cancellationToken = default ) {

        }
    }
}
