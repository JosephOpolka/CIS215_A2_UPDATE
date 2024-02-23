using System.ComponentModel.DataAnnotations;
namespace CIS215_A2.MyWepApi.models {
    public class Trips {
        [Key]
        public int Trip_id { get; set; }
        public string? Destination_address { get; set; }
        public string? Destination_zip { get; set; }
        public DateOnly To_date { get; set; }
        public TimeOnly To_start_time { get; set; }
        public TimeOnly To_arrival_time { get; set; }
        public DateOnly Back_date { get; set; }
        public TimeOnly Back_start_time { get; set; }
        public TimeOnly Back_arrival_time { get; set; }
        public int Vehicle_id { get; set; }
        public int Driver_id { get; set; }
        public int Passenger_id { get; set; }

        public Trips() {
            Trip_id = 1;
            Destination_address = "515 Grand Canyon";
            Destination_zip = "49777";
            To_date = new DateOnly(1999, 8, 7);
            To_start_time = new TimeOnly(8, 0, 0);
            To_arrival_time = new TimeOnly(11, 0, 0);
            Back_date = new DateOnly(2000, 9, 8);
            Back_start_time = new TimeOnly(9, 0, 0);
            Back_arrival_time = new TimeOnly(12, 0, 0);
            Vehicle_id = 1;
            Driver_id = 1;
            Passenger_id = 1;
        }
    }
}