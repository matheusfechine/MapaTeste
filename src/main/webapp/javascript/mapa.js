var Mapa;
(function($){
	Mapa = {};
	var vectors, controls, map, wms;	
	Mapa.renderizaMapa = function(){
		map = new OpenLayers.Map('map');
		wms = new OpenLayers.Layer.WMS("OpenLayers WMS",
				"http://vmap0.tiles.osgeo.org/wms/vmap0", {
					layers : 'basic'
				});
		
		var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
        renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
        vectors = new OpenLayers.Layer.Vector("Vector Layer", {
            renderers: renderer
        });
        
		map.addLayers([wms, vectors]);
		
		map.addControl(new OpenLayers.Control.LayerSwitcher());
        map.addControl(new OpenLayers.Control.MousePosition());
        controls = {
                point: new OpenLayers.Control.DrawFeature(vectors,
                            OpenLayers.Handler.Point),
                line: new OpenLayers.Control.DrawFeature(vectors,
                            OpenLayers.Handler.Path),
                polygon: new OpenLayers.Control.DrawFeature(vectors,
                            OpenLayers.Handler.Polygon),
                drag: new OpenLayers.Control.DragFeature(vectors)
            };
        for(var key in controls) {
            map.addControl(controls[key]);
        }
        var control = controls.polygon;
        control.activate();
		map.zoomToMaxExtent();
	};
Mapa.renderizaMapa();
}(jQuery));


