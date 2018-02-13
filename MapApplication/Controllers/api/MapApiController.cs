using MapApplication.DTO;
using MapApplication.Implementation;
using System.Web.Http;

namespace MapApplication.Controllers.api
{
    public class MapApiController : ApiController
    {
        private IMapApi _repository;

        public MapApiController()
        {
            _repository = new MapApiRepository();
        }

        /// <summary>
        /// Fetch the notes from database
        /// </summary>
        /// <returns>List<Notes></returns>
        [HttpGet]
        public IHttpActionResult GetNotes()
        {
            return Ok(_repository.GetNotesForCurrentUser());
        }

        /// <summary>
        /// Save or update notes to the database
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult SaveNotes(Notes dto)
        {

            if (dto != null)
            {
                _repository.SaveNotes(dto);
                return Ok();
            }

            return BadRequest();
        }
    }
}
