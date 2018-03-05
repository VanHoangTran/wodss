package ch.fhnw.wodss.tournament.model.dto;

public class UserDto {

	private Long id;

	private String username;

	private String password;

	private String mail;

	private boolean verified;

	private boolean active;

	public UserDto(String username, String password, String mail, boolean verified, boolean active) {
		this.username = username;
		this.password = password;
		this.mail = mail;

		// new users are inactive until mail verification
		this.verified = false;
		this.active = false;
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
	
}
