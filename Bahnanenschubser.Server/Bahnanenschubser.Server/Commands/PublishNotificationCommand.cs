using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MongoDB.Entities;

namespace Bahnanenschubser.Server {

    public class PublishNotificationCommand : IRequestHandler<PublishNotificationCommand.Request, PublishNotificationCommand.Response> {

        public class Request : IRequest<Response> {
            public string TrainId { get; set; }
            public string Message { get; set; }
        }
        public class Response {
            public Notification Notification { get; set; }
        }

        public async Task<Response> Handle( Request request, CancellationToken cancellationToken ) {
            var train = await DB.Find<TrainEntity>()
                .Match( e => e.TrainId == request.TrainId )
                .ExecuteSingleAsync();

            if( train is null ) {
                train = new TrainEntity() {
                    TrainId = request.TrainId
                };
                await train.SaveAsync();
            }

            var notification = new Notification() {
                Id = Guid.NewGuid().ToString(),
                Message = request.Message,
                Timestamp = DateTime.Now
            };

            train.Notifications.Add( notification );
            await DB.Update<TrainEntity>()
                .Match( e => e.TrainId == request.TrainId )
                .Modify( e => e.Notifications, train.Notifications )
                .ExecuteAsync( cancellationToken );

            return new Response() {
                Notification = notification
            };
        }
    }
}
