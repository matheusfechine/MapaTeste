package br.com.mapa.controller;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.google.common.collect.Lists;

import br.com.caelum.vraptor.util.test.MockSerializationResult;
import br.com.mapa.model.Meal;
import br.com.mapa.util.JsonSerializer;

public class MapaControllerTest {

	private MapaController controller;
	private MockSerializationResult result;
	private JsonSerializer serializer;
	
	@Before
	public void setUp(){
		serializer = new JsonSerializer();
		result = new MockSerializationResult();
		controller = new MapaController(result);
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
	
	@Test
	public void deveCarregarDados() throws Exception{
		controller.carregaDados();
		assertEquals(serializer.serialize("lista", Lists.newArrayList(standard(), premium(), ultimate())), result.serializedResult());
	}
	
	private Meal standard(){
		Meal meal = new Meal();
		meal.setNome("Standard (sandwich)");
		meal.setPreco(0D);
		return meal;
	}
	private Meal premium(){
		Meal meal = new Meal();
		meal.setNome("Premium (lobster)");
		meal.setPreco(15.04D);
		return meal;
	}
	private Meal ultimate(){
		Meal meal = new Meal();
		meal.setNome("Ultimate (whole zebra)");
		meal.setPreco(290D);
		return meal;
	}
}
