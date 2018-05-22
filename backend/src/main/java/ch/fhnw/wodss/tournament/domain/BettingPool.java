package ch.fhnw.wodss.tournament.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class BettingPool {

	public static final String leaveAction = "leave";
	public static final String joinAction = "join";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@ManyToOne
	private Account owner;

	@ManyToMany
	private List<Account> members;

	private boolean special;

	public boolean getSpecial() {
		return special;
	}

	public void setSpecial(boolean isSpecial) {
		this.special = isSpecial;
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

	public Account getOwner() {
		return owner;
	}

	public void setOwner(Account owner) {
		this.owner = owner;
	}

	public List<Account> getMembers() {
		return members;
	}

	public void setMembers(List<Account> members) {
		this.members = members;
	}

}
