package ch.fhnw.wodss.tournament.service.dto;

import ch.fhnw.wodss.tournament.domain.TournamentGroup;

public class GroupDTO {

	private Long id;

	private String name;

	public GroupDTO(TournamentGroup group) {
		this.id = group.getId();
		this.name = group.getName();
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

}
