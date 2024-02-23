using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CIS215_A2.MyWepApi.models;

namespace CIS215_A2.MyWepApi.controllers {
    [ApiController]
    [Route("[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public VehiclesController(MyDbContext context)
        {
            _context = context;
        }

        // get Drivers
        [HttpGet]
        public IEnumerable<Vehicles> GetVehicles()
        {
            return _context.Vehicles.ToList();
        }

        // get Drivers id
        [HttpGet("{id}")]
        public ActionResult<Vehicles> GetVehicle(int id)
        {
            var vehicle = _context.Vehicles.Find(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }

        // post Drivers
        [HttpPost]
        public ActionResult<Vehicles> PostVehicle(Vehicles vehicle)
        {
            _context.Vehicles.Add(vehicle);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetVehicle), new { id = vehicle.Vehicle_id }, vehicle);
        }

        // put Drivers id
        [HttpPut("{id}")]
        public IActionResult PutVehicle(int id, Vehicles vehicle)
        {
            if (id != vehicle.Vehicle_id)
            {
                return BadRequest();
            }

            _context.Entry(vehicle).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // delete Drivers id
        [HttpDelete("{id}")]
        public IActionResult DeleteVehicle(int id)
        {
            var vehicle = _context.Vehicles.Find(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            _context.SaveChanges();

            return NoContent();
        }
    }
}