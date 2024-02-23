using CIS215_A2.MyWepApi.models;
using Microsoft.EntityFrameworkCore;

namespace CIS215_A2.MyWepApi {
    public class MyDbContext : DbContext
    {
        public MyDbContext() {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=..\\car-trips copy.db");
        }

        public DbSet<Drivers> Drivers { get; set; }
        public DbSet<Vehicles> Vehicles { get; set; }
        public DbSet<Passengers> Passengers { get; set; }
        public DbSet<Trips> Trips { get; set; }
    }
}