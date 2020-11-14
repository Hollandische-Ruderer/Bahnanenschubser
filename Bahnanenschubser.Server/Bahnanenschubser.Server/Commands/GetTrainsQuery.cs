using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Bahnanenschubser.Server {

    public class GetTrainsQuery : IRequestHandler<GetTrainsQuery.Request, GetTrainsQuery.Response> {
        
        public class Request : IRequest<Response> {
            public double Longitude { get; set; }
            public double Latitude { get; set; }
        }    
        public class Response {
            public StopPlaces StopPlaces { get; set; }
        }

        private readonly IInnoApiClient _client;

        public GetTrainsQuery( IInnoApiClient client )
            => _client = client ?? throw new ArgumentNullException( nameof( client ) );

        public async Task<Response> Handle( Request request, CancellationToken cancellationToken ) {
            var result = await _client.ByPositionAsync(
                request.Longitude,
                request.Latitude,
                200,
                true,
                new[] { Locale.DE },
                cancellationToken
            );

            return new Response() {
                StopPlaces = result
            };
        }
    }
}
