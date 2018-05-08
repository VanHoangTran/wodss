package ch.fhnw.wodss.tournament.service.dto;

import ch.fhnw.wodss.tournament.domain.Stadium;

public class StadiumDTO {

	private Long id;

	private String name;

	private String city;

	public StadiumDTO(Stadium stadium) {
		this.id = stadium.getId();
		this.name = stadium.getName();
		this.city = stadium.getCity();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

}
