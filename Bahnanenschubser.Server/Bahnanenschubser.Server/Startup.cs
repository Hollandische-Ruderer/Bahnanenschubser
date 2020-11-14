using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using MongoDB.Entities;

namespace Bahnanenschubser.Server {

    public class Startup {

        public IConfiguration Configuration { get; }

        public Startup( IConfiguration configuration ) => Configuration = configuration;


        public void ConfigureServices( IServiceCollection services ) {

            services.AddOptions();
            services.AddOptions<MongoDBOptions>().Bind( Configuration.GetSection( "MongoDB" ) );
            services.AddOptions<InnoApiOptions>().Bind( Configuration.GetSection( "InnoApi" ) );


            services.AddSwaggerGen( c => {
                c.SwaggerDoc( "v1", new OpenApiInfo { Title = "Bahnana", Version = "v1" } );
            } );

            services.AddSingleton<HttpClient>( s => {
                var options = s.GetRequiredService<IOptions<InnoApiOptions>>();
                var client = new HttpClient() {
                    BaseAddress = options.Value.Endpoint
                };
                var byteArray = Encoding.ASCII.GetBytes( $"{options.Value.Username}:{options.Value.Password}" );
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue( "Basic", Convert.ToBase64String( byteArray ) );
                return client;
            } );
            services.AddSingleton<IInnoApiClient, InnoApiClient>();

            services.AddMediatR( typeof( Startup ) );

            services.AddControllers();
            services.AddSignalR();
        }


        public void Configure( IApplicationBuilder app, IWebHostEnvironment env ) {
            if( env.IsDevelopment() ) {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSwagger()
               .UseSwaggerUI( c => {
                   c.SwaggerEndpoint( "/swagger/v1/swagger.json", "Bahnana V1" );
               } );

            app.UseEndpoints( endpoints => {
                endpoints.MapControllers();
                endpoints.MapHub<BahnanaHub>( "/bahnanahub" );
            } );

            InitializeDatabase( app.ApplicationServices.GetRequiredService<IOptions<MongoDBOptions>>().Value );
        }

        private async void InitializeDatabase( MongoDBOptions options ) {
            await DB.InitAsync( options.Database, options.Address, options.Port );
            await DB.Index<UserEntity>()
                .Key( e => e.Position, KeyType.Geo2D )
                .CreateAsync();

            await DB.Index<TrainEntity>()
                .Key( e => e.TrainId, KeyType.Hashed )
                .CreateAsync();
        }
    }
}
