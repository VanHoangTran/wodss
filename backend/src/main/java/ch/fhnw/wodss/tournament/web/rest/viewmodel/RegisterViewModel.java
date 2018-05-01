package ch.fhnw.wodss.tournament.web.rest.viewmodel;

/**
 * Simple representation of registration view model.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
public class RegisterViewModel {
	
	private String username;

	private String password;

	private String mail;

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

	public void setMail(String email) {
		this.mail = email;
	}

	public boolean isValid() {
		return username != null && mail != null;
	}
}
