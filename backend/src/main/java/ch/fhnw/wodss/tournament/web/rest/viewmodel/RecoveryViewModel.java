package ch.fhnw.wodss.tournament.web.rest.viewmodel;

import org.springframework.util.StringUtils;

import ch.fhnw.wodss.tournament.util.ValidationUtil;

/**
 * Simple representation of recovery (password reset) view model.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
public class RecoveryViewModel {

	private String username;

	private String mail;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public boolean isValid() {
		return !StringUtils.isEmpty(mail) && !StringUtils.isEmpty(username) && ValidationUtil.isValidMail(mail);
	}

	@Override
	public String toString() {
		return String.format("username:%s mail:%s", username, mail);
	}
}
