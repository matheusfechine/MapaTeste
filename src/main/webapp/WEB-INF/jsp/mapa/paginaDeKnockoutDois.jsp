<!-- This is a *view* - HTML markup that defines the appearance of your UI -->
<%@include file="../imports/jstl.jsp"%>
<%@include file="/javascript/javascript.jsp"%>
<html>
<head>
<title>Knockout Examples</title>
<script
	src='<c:url value="/javascript/knockout/knockout-2.3.0.js"></c:url>'></script>
</head>
<body>
<c:forEach items="lista" var="list">
	${list}
</c:forEach>
	<table>
		<thead>
			<tr>
				<th>Passenger name</th>
				<th>Meal</th>
				<th>Surcharge</th>
				<th></th>
			</tr>
		</thead>
		<tbody data-bind="foreach: seats">
			<tr>
				<td data-bind="text: name"></td>
				<td><select data-bind="options: $root.availableMeals, value: meal, optionsText: 'nome'"></select></td>
				<td data-bind="text: formattedPrice"></td>
				<td><a href="#" data-bind="click: $root.removeSeat">Remove</a></td>
			</tr>
		</tbody>
	</table>
	<h3 data-bind="visible: totalSurcharge() > 0">
   	 	Total surcharge: $<span data-bind="text: totalSurcharge().toFixed(2)"></span>
	</h3>
	<h2>Your seat reservations (<span data-bind="text: seats().length"></span>)</h2>
	
	<button data-bind="click: addSeat, enable: seats().length < 5">Reserve another seat</button>
	<script defer="defer" type="text/javascript"
		src='<c:url value="/javascript/paginaDeKnockoutDois.js"></c:url>'>
		
	</script>
</body>
</html>