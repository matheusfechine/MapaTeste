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
	<p>
		First name: <input data-bind="value: firstName" />
	</p>
	<p>
		Last name: <input data-bind="value: lastName" />
	</p>
	<p>
		Full name: <strong data-bind="text: fullName()"></strong>
	</p>
	<button data-bind="click: capitalizeLastName">Go caps</button>

	<script defer="defer" type="text/javascript"
		src='<c:url value="/javascript/paginaDeKnockout.js"></c:url>'>
		
	</script>
</body>
</html>