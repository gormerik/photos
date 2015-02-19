using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Web.Http;
using Microsoft.WindowsAzure.Mobile.Service;
using piceventService.DataObjects;
using piceventService.Models;

namespace piceventService
{
    public static class WebApiConfig
    {
        public static void Register()
        {
            // Use this class to set configuration options for your mobile service
            ConfigOptions options = new ConfigOptions();

            // Use this class to set WebAPI configuration options
            HttpConfiguration config = ServiceConfig.Initialize(new ConfigBuilder(options));

            // To display errors in the browser during development, uncomment the following
            // line. Comment it out again when you deploy your service for production use.
            // config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
            
            Database.SetInitializer(new piceventInitializer());
        }
    }

    public class piceventInitializer : ClearDatabaseSchemaIfModelChanges<piceventContext>
    {
        //protected override void Seed(piceventContext context)
        //{
        //    List<TodoItem> todoItems = new List<TodoItem>
        //    {
        //        new TodoItem { Id = Guid.NewGuid().ToString(), Text = "First item", Complete = false },
        //        new TodoItem { Id = Guid.NewGuid().ToString(), Text = "Second item", Complete = false },
        //    };

        //    foreach (TodoItem todoItem in todoItems)
        //    {
        //        context.Set<TodoItem>().Add(todoItem);
        //    }

        //    base.Seed(context);
        //}

        protected override void Seed(piceventContext context)
        {
            List<Picture> pictures = new List<Picture>
            {
                new Picture { Id = Guid.NewGuid().ToString(), Name = "First Picture", imageUri = "http://test.com/image.jpg" },
                new Picture { Id = Guid.NewGuid().ToString(), Name = "Second Picture", imageUri = "http://test.com/image2.jpg" },
            };

            foreach (Picture pic in pictures)
            {
                context.Set<Picture>().Add(pic);
            }

            base.Seed(context);
        }
    }
}

