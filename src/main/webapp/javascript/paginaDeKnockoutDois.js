// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);
    self.formattedPrice = ko.computed(function() {
        var price = self.meal().preco;
        return price ? "$" + price.toFixed(2) : "None";        
    });
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;
    
    self.carregaDadosDoServer = function(){
    	$.ajax({
    		  url: "/MapaTeste/mapa/carregaDados",
    		  type: "GET",
    		  success : function(retorno) {
    			self.availableMeals = retorno.lista;
	    		    $(retorno.lista).each(function( index ) {
	    		    	self.seats.push(new SeatReservation(retorno.lista[index].nome, self.availableMeals[index]));
	    			});
    			}
    		});

    };
    self.carregaDadosDoServer();
    
    // Non-editable catalog data - would come from the server
    self.availableMeals = [];
//        { nome: "Standard (sandwich)", preco: 0 },
//        { nome: "Premium (lobster)", preco: 34.95 },
//        { nome: "Ultimate (whole zebra)", preco: 290 }

    self.seats = ko.observableArray();
    
    // Operations
    self.addSeat = function(retorno) {
    	self.seats.push(new SeatReservation("Teste", self.availableMeals[0]));
    };
    self.removeSeat = function(seat) { self.seats.remove(seat) }
    self.totalSurcharge = ko.computed(function() {
    	var total = 0;
    	for (var i = 0; i < self.seats().length; i++)
    		total += self.seats()[i].meal().preco;
    	return total;
    });

}

ko.applyBindings(new ReservationsViewModel());