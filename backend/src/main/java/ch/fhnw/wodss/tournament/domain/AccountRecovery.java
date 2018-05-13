package ch.fhnw.wodss.tournament.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class AccountRecovery {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	private Account account;

	private String recoveryKey;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public String getRecoveryKey() {
		return recoveryKey;
	}

	public void setRecoveryKey(String key) {
		this.recoveryKey = key;
	}

	@Override
	public String toString() {
		return String.format("username: %s", account.getUsername());
	}
}
