using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Bahnanenschubser.Server {

    public class BahnanaHub : Hub {

        private readonly IMediator _mediator;

        public BahnanaHub( IMediator mediator )
            => _mediator = mediator ?? throw new ArgumentNullException( nameof( mediator ) );

        public override async Task OnConnectedAsync() {
            await base.OnConnectedAsync();
        }

        public async Task EnterTrain( string trainId, CancellationToken cancellationToken ) {
            if( Context.Items.ContainsKey( "TrainID" ) ) {
                await Groups.AddToGroupAsync( Context.ConnectionId, Context.Items["TrainID"] as string, cancellationToken );
                Context.Items["TrainID"] = trainId;
            }
            else
                Context.Items.Add( "TrainID", trainId );

            await Groups.AddToGroupAsync( Context.ConnectionId, trainId, cancellationToken );
        }
        //public async Task UpdateLocation( double longitude, double latitude, CancellationToken cancellationToken = default ) {}

        public async Task PublishNotification( string trainId, string message, CancellationToken  cancellationToken ) {
            var result = await _mediator.Send(
                new PublishNotificationCommand.Request() {
                    TrainId = trainId,
                    Message = message
                }
            );

            await Clients.Group( trainId ).SendCoreAsync(
                "ReceiveNotification", new[] { result.Notification }, cancellationToken
            );
        }

        public async Task PublishComment( string trainId, string notificationId, string comment, CancellationToken cancellationToken ) {

            var result = await _mediator.Send(
                new PublishCommentCommand.Request() {
                    TrainId = trainId,
                    NotificationId = notificationId,
                    Message = comment
                }
            );

            await Clients.Group( trainId ).SendCoreAsync(
                "ReceiveComment", new[] { result }, cancellationToken
            );
        }
    }
}
