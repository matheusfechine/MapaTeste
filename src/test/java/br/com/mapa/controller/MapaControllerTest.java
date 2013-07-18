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
	
	@Test
	public void deveSerPossivelAbrirPaginaDeKnockout(){
		controller.paginaDeKnockout();
	}
	@Test
	public void deveSerPossivelAbrirPaginaDeKnockoutDois(){
		controller.paginaDeKnockoutDois();
	}
}
