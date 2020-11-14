using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Bahnanenschubser.Server {

    [ApiController]
    [Route( "[controller]" )]
    public class TrainsController : ControllerBase {

        private readonly IMediator _mediator;

        public TrainsController( IMediator mediator )
            => _mediator = mediator ?? throw new ArgumentNullException( nameof( mediator ) );


        [HttpGet]
        [Route( "{longitute}/{latitude}" )]
        public async Task<ActionResult<GetTrainsQuery.Response>> FindTrainsAsync( double longitute, double latitude, CancellationToken cancellationToken = default )
            => await _mediator.Send( new GetTrainsQuery.Request {
                Longitude = longitute,
                Latitude = latitude
            }, cancellationToken );
    }
}
