using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CIS215_A2.MyWepApi.models;

namespace CIS215_A2.MyWepApi.controllers {
    [ApiController]
    [Route("[controller]")]
    public class TripsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public TripsController(MyDbContext context)
        {
            _context = context;
        }

        // get Drivers
        [HttpGet]
        public IEnumerable<Trips> GetTrips()
        {
            return _context.Trips.ToList();
        }

        // get Drivers id
        [HttpGet("{id}")]
        public ActionResult<Trips> GetTrip(int id)
        {
            var trip = _context.Trips.Find(id);

            if (trip == null)
            {
                return NotFound();
            }

            return trip;
        }

        // post Drivers
        [HttpPost]
        public ActionResult<Trips> PostTrip(Trips trip)
        {
            _context.Trips.Add(trip);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetTrip), new { id = trip.Trip_id }, trip);
        }

        // put Drivers id
        [HttpPut("{id}")]
        public IActionResult PutTrip(int id, Trips trip)
        {
            if (id != trip.Trip_id)
            {
                return BadRequest();
            }

            _context.Entry(trip).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // delete Drivers id
        [HttpDelete("{id}")]
        public IActionResult DeleteTrip(int id)
        {
            var trip = _context.Trips.Find(id);

            if (trip == null)
            {
                return NotFound();
            }

            _context.Trips.Remove(trip);
            _context.SaveChanges();

            return NoContent();
        }
    }
}