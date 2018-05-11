package ch.fhnw.wodss.tournament.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Representation of a application's user.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Entity
public class Account {

	@Id
	@GeneratedValue
	private Long id;

	private String username;

	private String password;

	private String salt;

	private String mail;

	private boolean verified;

	private boolean active;

	private String activationKey;

	// keep it simple - there are only USERS and ADMINS
	private boolean admin;

	public String getActivationKey() {
		return activationKey;
	}

	public void setActivationKey(String activationKey) {
		this.activationKey = activationKey;
	}

	public Account(String username, String password) {
		this.username = username;
		this.password = password;

		// new users are inactive until mail verification
		this.verified = false;
		this.active = false;
	}

	public Account() {
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	@Override
	public String toString() {
		return String.format("%s <%s>", username, mail);
	}

}
