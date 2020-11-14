using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MongoDB.Driver.Core.Operations;
using MongoDB.Entities;

namespace Bahnanenschubser.Server {

    public class PublishCommentCommand : IRequestHandler<PublishCommentCommand.Request, PublishCommentCommand.Response> {

        public class Request : IRequest<Response> {
            public string TrainId { get; set; }
            public string NotificationId { get; set; }
            public string Message { get; set; }
        }
        public class Response {
            public string NotificationId { get; set; }
            public Comment Comment { get; set; }
        }

        public async Task<Response> Handle( Request request, CancellationToken cancellationToken ) {
            var train = await DB.Find<TrainEntity>()
                .Match( e => e.TrainId == request.TrainId )
                .ExecuteSingleAsync();

            if( train is null )
                return null;

            var notification = train.Notifications.SingleOrDefault( n => n.Id == request.NotificationId );
            if( notification is null )
                return null;

            var comment = new Comment() {
                Message = request.Message,
                Timestamp = DateTime.Now
            };
            notification.Comments.Add( comment );
            await DB.Update<TrainEntity>()
                .Match( e => e.TrainId == request.TrainId )
                .Modify( e => e.Notifications, train.Notifications )
                .ExecuteAsync( cancellationToken );

            return new Response() {
                NotificationId = request.NotificationId,
                Comment = comment;
            };
        }
    }
}
