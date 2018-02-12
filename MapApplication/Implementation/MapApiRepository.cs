using MapApplication.Controllers.api;
using MapApplication.DTO;
using MapApplication.Models;

namespace MapApplication.Implementation
{
    public class MapApiRepository : IMapApi
    {
        private mapEntities _entities;

        public MapApiRepository()
        {
            _entities = new mapEntities();
        }

        public void SaveNotes(Notes model)
        {
            var notes = new Note
            {
                Lat = model.Lat,
                Long = model.Lng,
                Notes = model.Note,
                User = model.User
            };

            _entities.Notes.Add(notes);
            _entities.SaveChanges();
        }
    }
}