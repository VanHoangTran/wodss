package ch.fhnw.wodss.tournament.util;

import javax.transaction.Transactional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Provides helper functions to handle any kind of security.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Transactional
@Component
public class SecurityUtil {

	/**
	 * Reads user's name from spring security authentication
	 * 
	 * @return name as string
	 */
	public String getUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getName();
	}
}
