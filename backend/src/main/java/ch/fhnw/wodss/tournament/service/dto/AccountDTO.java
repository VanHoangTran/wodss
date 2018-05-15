package ch.fhnw.wodss.tournament.service.dto;

import ch.fhnw.wodss.tournament.domain.Account;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

public class AccountDTO {

	private Long id;

	private String username;

	private String mail;

	@JsonIgnore
	private int points;

	public AccountDTO(Account owner) {
		this.id = owner.getId();
		this.username = owner.getUsername();
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

	/**
	 * Converts a list of @Entity account to accountDTO
	 * 
	 * @param list of JPA account
	 * @return list of account DTOs
	 */
	public static List<AccountDTO> fromList(List<Account> list) {
		List<AccountDTO> dtoList = new ArrayList<>();
		for (Account g : list) {
			dtoList.add(new AccountDTO(g));
		}
		return dtoList;
	}

}
