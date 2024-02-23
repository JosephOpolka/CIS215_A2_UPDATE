using System.ComponentModel.DataAnnotations;
namespace CIS215_A2.MyWepApi.models {
    public class Drivers {
        [Key]
        public int Driver_id { get; set; }
        public string? First_name { get; set; }
        public string? Middle_name { get; set; }
        public string? Last_name { get; set; }
        public DateOnly Dob { get; set; }
        public string? Address_street{ get; set; }
        public string? Address_zip { get; set; }
        public string? License_number { get; set; }

        public Drivers() {
            Driver_id = 1;
            First_name = "John";
            Middle_name = "Phillip";
            Last_name = "Seusah";
            Dob = new DateOnly(2024, 1, 1);
            Address_street = "123 Howard St";
            Address_zip = "98765";
            License_number = "A113";
        }
    }
}