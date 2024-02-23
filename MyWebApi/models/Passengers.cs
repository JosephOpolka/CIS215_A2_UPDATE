using System.ComponentModel.DataAnnotations;
namespace CIS215_A2.MyWepApi.models {
    public class Passengers {
        [Key]
        public int Passenger_id { get; set; }
        public string? First_name { get; set; }
        public string? Middle_name { get; set; }
        public string? Last_name { get; set; }
        public DateOnly Dob { get; set; }
        public string? Address_street{ get; set; }
        public string? Address_zip { get; set; }

        public Passengers() {
            Passenger_id = 1;
            First_name = "Lynn";
            Middle_name = "Manuel";
            Last_name = "Merandah";
            Dob = new DateOnly(2023, 10, 31);
            Address_street = "98765 Main St";
            Address_zip = "12345";
        }
    }
}