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
				<td data-bind="text: meal().mealName"></td>
				<td data-bind="text: meal().price"></td>
			</tr>
		</tbody>
	</table>

	<script defer="defer" type="text/javascript"
		src='<c:url value="/javascript/paginaDeKnockoutDois.js"></c:url>'>
		
	</script>
</body>
</html>