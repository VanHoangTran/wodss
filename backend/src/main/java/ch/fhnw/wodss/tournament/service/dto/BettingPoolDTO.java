package ch.fhnw.wodss.tournament.service.dto;

import java.util.ArrayList;
import java.util.List;

import ch.fhnw.wodss.tournament.domain.BettingPool;

public class BettingPoolDTO {

	private Long id;

	private String name;

	private AccountDTO owner;

	private boolean isMember;

	private List<AccountDTO> members;

	public BettingPoolDTO(BettingPool g) {
		this.id = g.getId();
		this.name = g.getName();
		this.owner = new AccountDTO(g.getOwner());
		this.members = AccountDTO.fromList(g.getMembers());
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

	public AccountDTO getOwner() {
		return owner;
	}

	public void setOwner(AccountDTO owner) {
		this.owner = owner;
	}

	public List<AccountDTO> getMembers() {
		return members;
	}

	public void setMembers(List<AccountDTO> members) {
		this.members = members;
	}

	public boolean isMember() {
		return isMember;
	}

	public void setMember(boolean isMember) {
		this.isMember = isMember;
	}

	/**
	 * Converts a list of @Entity bettingPool to bettingPoolDTOs
	 * 
	 * @param list of JPA bettingPool
	 * @return list of bettingPool DTOs
	 */
	public static List<BettingPoolDTO> fromList(List<BettingPool> list) {
		List<BettingPoolDTO> dtoList = new ArrayList<>();
		for (BettingPool g : list) {
			dtoList.add(new BettingPoolDTO(g));
		}
		return dtoList;
	}

}
