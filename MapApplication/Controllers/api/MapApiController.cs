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

        [HttpGet]
        public IHttpActionResult GetNotes()
        {
            return Ok(_repository.GetNotesForCurrentUser());
        }

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
