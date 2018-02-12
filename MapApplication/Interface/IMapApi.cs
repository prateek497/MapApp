using MapApplication.DTO;

namespace MapApplication.Controllers.api
{
    public interface IMapApi
    {
        void SaveNotes(Notes model);
    }
}