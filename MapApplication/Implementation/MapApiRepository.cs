using MapApplication.Controllers.api;
using MapApplication.DTO;
using MapApplication.Models;
using System.Collections.Generic;
using System.Linq;

namespace MapApplication.Implementation
{
    public class MapApiRepository : IMapApi
    {
        private mapEntities _entities;

        public MapApiRepository()
        {
            _entities = new mapEntities();
        }

        public List<Note> GetNotesForCurrentUser()
        {
            return _entities.Notes.ToList();
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

            var isExists = _entities.Notes.FirstOrDefault(x => x.Lat == notes.Lat && x.Long == notes.Long);

            if (isExists == null)
                _entities.Notes.Add(notes);
            else
            {
                isExists.Lat = notes.Lat;
                isExists.Long = notes.Long;
                isExists.Notes = notes.Notes;
                isExists.User = notes.User;
            }
            _entities.SaveChanges();
        }
    }
}