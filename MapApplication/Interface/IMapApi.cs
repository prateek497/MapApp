using MapApplication.DTO;
using MapApplication.Models;
using System.Collections.Generic;

namespace MapApplication.Controllers.api
{
    public interface IMapApi
    {
        void SaveNotes(Notes model);
        List<Note> GetNotesForCurrentUser();
    }
}