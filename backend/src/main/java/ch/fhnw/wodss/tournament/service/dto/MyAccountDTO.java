package ch.fhnw.wodss.tournament.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.wodss.tournament.domain.Account;

public class MyAccountDTO {
	private Long id;

	private String username;

	private String mail;

	private Boolean isAdmin;

	@JsonIgnore
	private int points;

	public MyAccountDTO(Account owner) {
		this.id = owner.getId();
		this.username = owner.getUsername();
		this.isAdmin = owner.isAdmin();
		this.mail = owner.getMail();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Boolean getAdmin() {
		return isAdmin;
	}

	public void setAdmin(Boolean admin) {
		isAdmin = admin;
	}
}
