package br.com.mapa.controller;

import java.util.ArrayList;
import java.util.List;

import com.google.common.collect.Lists;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.view.Results;
import br.com.mapa.model.Meal;
@Resource
@Path("/mapa")
public class MapaController {
	
	private Result result;
	
	public MapaController(Result result) {
		this.result = result;
	}
	
	@Get
	@Path("/")
	public void paginaDoMapa() {
	}

	@Get
	@Path("/knockout")
	public void paginaDeKnockout() {
	}

	@Get
	@Path("/knockout2")
	public void paginaDeKnockoutDois() {
	}
	

	@Get
	@Path("/carregaDados")
	public void carregaDados(){
		List<String> list = new ArrayList<String>();
		list.add("Joao");
		result.use(Results.json()).from(Lists.newArrayList(standard(), premium(), ultimate()), "lista").serialize();
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
