package ch.fhnw.wodss.tournament.web.rest.viewmodel;

/**
 * Simple representation of registration verification view model.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
public class VerificationVM {

	private String token;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public boolean isValid() {
		return token != null && token != "";
	}

}
