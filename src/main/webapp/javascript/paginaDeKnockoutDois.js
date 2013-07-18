//function AppViewModel() {
//    this.firstName = ko.observable("Bert");
//    this.lastName = ko.observable("Bertington");
//    this.fullName = ko.computed(function() {
//    return this.firstName() + " " + this.lastName();    
//}, this);
//   this.capitalizeLastName = function() {
//	    var currentVal = this.lastName();        // Read the current value
//        this.lastName(currentVal.toUpperCase()); // Write back a modified value
//   }
//}



//Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];    

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Bert", self.availableMeals[1])
    ]);
}

// Activates knockout.js
ko.applyBindings(new ReservationsViewModel());