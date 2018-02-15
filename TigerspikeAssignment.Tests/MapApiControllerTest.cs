using MapApplication.Controllers.api;
using MapApplication.DTO;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace TigerspikeAssignment.Tests
{
    [TestClass]
    public class MapApiControllerTest
    {
        /// <summary>
        /// These test cases not working because we have to relative path of the database.
        /// </summary>
        [TestMethod]
        public void SaveNotesTest()
        {
            // Set up Prerequisites   
            var controller = new MapApiController();

            var note = new Notes
            {
                Lat = 24.3232323,
                Lng = 78.4343434,
                Note = "This is the test note",
                User = "testuser"
            };

            // Act  
            IHttpActionResult actionResult = controller.SaveNotes(note);
            var createdResult = actionResult as CreatedAtRouteNegotiatedContentResult<Notes>;
            // Assert  
            Assert.IsNotNull(createdResult);
            Assert.AreEqual("DefaultApi", createdResult.RouteName);
            Assert.IsNotNull(createdResult.RouteValues["id"]);
        }

        /// <summary>
        /// These test cases not working because we have to relative path of the database.
        /// </summary>
        [TestMethod]
        public void GetNotesTest()
        {
            // Set up Prerequisites   
            var controller = new MapApiController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            // Act  
            var response = controller.GetNotes();
            var contentResult = response as OkNegotiatedContentResult<Notes>;
            // Assert  
            Assert.IsNotNull(contentResult);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual("This is the test note", contentResult.Content.Note);
        }

    }
}
