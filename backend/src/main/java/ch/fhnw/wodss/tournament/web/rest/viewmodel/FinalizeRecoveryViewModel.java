package ch.fhnw.wodss.tournament.web.rest.viewmodel;

import org.springframework.util.StringUtils;

/**
 * Simple representation of recovery (password reset) view model.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
public class FinalizeRecoveryViewModel {

	private String token;

	private String password;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isValid() {
		return !StringUtils.isEmpty(token) && !StringUtils.isEmpty(password);
	}

	@Override
	public String toString() {
		return String.format("token:%s", token);
	}

}
