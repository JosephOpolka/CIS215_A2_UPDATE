using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CIS215_A2.MyWepApi.models;

namespace CIS215_A2.MyWepApi.controllers {
    [ApiController]
    [Route("[controller]")]
    public class DriversController : ControllerBase {
        private readonly MyDbContext _context;
        public DriversController(MyDbContext context)
        {
            _context = context;
        }

        // get Drivers
        [HttpGet("", Name = "GetDrivers")]
        public IEnumerable<Drivers> GetDrivers()
        {
            _context.Database.OpenConnection();
            Console.WriteLine("CONNECTION STATUS:");
            Console.WriteLine(_context.Database.GetDbConnection().State);
            return _context.Drivers.ToList();
        }

        // get Drivers id
        [HttpGet("{id}", Name = "GetDriver")]
        public ActionResult<Drivers> GetDriver(int id)
        {
            var driver = _context.Drivers.Find(id);

            if (driver == null)
            {
                return NotFound();
            }

            return driver;
        }

        // post Drivers
        [HttpPost("", Name = "PostDriver")]
        public ActionResult<Drivers> PostDriver(Drivers driver)
        {
            _context.Drivers.Add(driver);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetDriver), new { id = driver.Driver_id }, driver);
        }

        // put Drivers id
        [HttpPut("{id}", Name = "PutDriver")]
        public IActionResult PutDriver(int id, Drivers driver)
        {
            if (id != driver.Driver_id)
            {
                return BadRequest();
            }

            _context.Entry(driver).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // delete Drivers id
        [HttpDelete("{id}", Name = "DeleteDriver")]
        public IActionResult DeleteDriver(int id)
        {
            var driver = _context.Drivers.Find(id);

            if (driver == null)
            {
                return NotFound();
            }

            _context.Drivers.Remove(driver);
            _context.SaveChanges();

            return NoContent();
        }
    }
}