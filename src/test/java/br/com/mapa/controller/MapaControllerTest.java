package br.com.mapa.controller;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class MapaControllerTest {

	private MapaController controller;
	
	@Before
	public void setUp(){
		controller = new MapaController();
	}
	
	@Test
	public void deveSerPossivelAbrirPaginaDoMapa(){
		controller.paginaDoMapa();
	}
	
}
