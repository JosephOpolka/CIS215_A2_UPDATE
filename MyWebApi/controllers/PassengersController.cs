using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CIS215_A2.MyWepApi.models;

namespace CIS215_A2.MyWepApi.controllers {
    [ApiController]
    [Route("[controller]")]
    public class PassengersController : ControllerBase
    {
        private readonly MyDbContext _context;
        public PassengersController(MyDbContext context)
        {
            _context = context;
        }

        // get Passengers
        [HttpGet]
        public IEnumerable<Passengers> GetPassengers()
        {
            return _context.Passengers.ToList();
        }

        // get Passengers id 
        [HttpGet("{id}")]
        public ActionResult<Passengers> GetPassenger(int id)
        {
            var passenger = _context.Passengers.Find(id);

            if (passenger == null)
            {
                return NotFound();
            }

            return passenger;
        }

        // post Passengers
        [HttpPost]
        public ActionResult<Passengers> PostPassenger(Passengers passenger)
        {
            _context.Passengers.Add(passenger);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetPassenger), new { id = passenger.Passenger_id }, passenger);
        }

        // put Passengers id
        [HttpPut("{id}")]
        public IActionResult PutPassenger(int id, Passengers passenger)
        {
            if (id != passenger.Passenger_id)
            {
                return BadRequest();
            }

            _context.Entry(passenger).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // delete Passengers id
        [HttpDelete("{id}")]
        public IActionResult DeletePassenger(int id)
        {
            var passenger = _context.Passengers.Find(id);

            if (passenger == null)
            {
                return NotFound();
            }

            _context.Passengers.Remove(passenger);
            _context.SaveChanges();

            return NoContent();
        }
    }
}