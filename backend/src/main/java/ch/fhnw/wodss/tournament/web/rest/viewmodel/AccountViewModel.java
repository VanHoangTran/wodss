package ch.fhnw.wodss.tournament.web.rest.viewmodel;

import org.springframework.util.StringUtils;

public class AccountViewModel {

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
