<%@include file="../imports/jstl.jsp" %>
<%@include file="/javascript/javascript.jsp" %>
<html>
<head>
<title>OpenLayers Example</title>
<script src="http://openlayers.org/api/OpenLayers.js"></script>
</head>
<body>
	<div style="width: 100%; height: 100%" id="map"></div>
	<script defer="defer" type="text/javascript" src='<c:url value="/javascript/mapa.js"></c:url>'>
	</script>
</body>
</html>