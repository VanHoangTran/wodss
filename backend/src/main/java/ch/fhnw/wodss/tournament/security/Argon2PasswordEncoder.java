package ch.fhnw.wodss.tournament.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import ch.fhnw.wodss.tournament.util.Argon2Util;

public class Argon2PasswordEncoder implements PasswordEncoder {

	@Autowired
	private Argon2Util argonUtil;

	@Override
	public String encode(CharSequence rawPassword) {
		return argonUtil.hash(rawPassword.toString());
	}

	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
		return argonUtil.verify(rawPassword.toString(), encodedPassword);
	}

}
