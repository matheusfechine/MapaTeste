package br.com.mapa.controller;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Resource;

@Resource
@Path("/mapa")
public class MapaController {
	
	@Get
	@Path("/")
	public void paginaDoMapa() {
	}

}
