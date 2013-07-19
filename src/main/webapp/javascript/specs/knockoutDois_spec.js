(function($){
	var availableMeals;
	beforeEach(function() {
	  	availableMeals = jasmine.createSpyObj(['nome : Java', 'preco: 0']);
	  });
	
	describe("Quantidade do Array", function() {
	  it("Computa os contadores dos Arrays", function() {
	    var target = new ReservationsViewModel();
	    expect(target.availableMeals().size()).toBe(5);
	  });
	});
}(jQuery));