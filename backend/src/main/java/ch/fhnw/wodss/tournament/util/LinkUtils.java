package ch.fhnw.wodss.tournament.util;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.AccountRecovery;

/**
 * Provides helper functions to handle any kind of links.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
public class LinkUtils {

	private static final String BASE_URL = "https://46.101.218.251";

	public static String getActivationLink(Account account) {
		return BASE_URL + "/activate/" + account.getActivationKey();
	}

	public static String getRecoveryLink(AccountRecovery recovery) {
		return BASE_URL + "/recover/" + recovery.getRecoveryKey();
	}

}
