using System.ComponentModel.DataAnnotations;
namespace CIS215_A2.MyWepApi.models {
    public class Vehicles {
        [Key]
        public int Vehicle_id { get; set; }
        public int Start_miles { get; set; }
        public int End_miles { get; set; }
        public int Start_fuel { get; set; }
        public int End_fuel { get; set; }
        public string? Start_condition { get; set; }
        public string? End_condition { get; set; }
        public string? Issues { get; set; }
        public string? Reason_for_trip { get; set; }
        public bool Oil_change_needed { get; set; }

        public Vehicles() {
            Vehicle_id = 1;
            Start_miles = 5000;
            End_miles = 70000;
            Start_fuel = 100;
            End_fuel = 75;
            Start_condition = "Good";
            End_condition = "Fair";
            Issues = "Popped tire";
            Reason_for_trip = "";
            Oil_change_needed = true;
        }
    }
}