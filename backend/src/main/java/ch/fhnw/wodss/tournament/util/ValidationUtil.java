package ch.fhnw.wodss.tournament.util;

import java.util.regex.Pattern;

/**
 * Util to perform various validations such as password or mail checks.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
public class ValidationUtil {
	
	/**
	 * Password requirements:
	 * - At least 8 chars
	 * - Contains at least one digit
	 * - Contains at least one lower alpha char and one upper alpha char
	 * - Contains at least one char within a set of special chars (@#%$^ etc.)
	 * - Does not contain space, tab, etc.
	 * 
	 * Taken from : https://stackoverflow.com/questions/3802192/regexp-java-for-password-validation
	 */
	private static final String PASSWORD_REGEX = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\\\S+$).{8,}";
	
	/**
	 * Validation of eMail address.
	 * 
	 * Taken from: https://stackoverflow.com/questions/8204680/java-regex-email
	 */
	private static final String EMAIL_REGEX = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$";
	
	/**
	 * Validates if provided password matches requirements
	 * 
	 * @see PASSWORD_REGEX
	 * @param candidate password to validate
	 * @return true if password is valid, false otherwise
	 */
	public static boolean isValidPassword(String candidate) {
		return candidate.matches(PASSWORD_REGEX);
	}

	/**
	 * Validates if provided mail address is valid
	 * 
	 * @param candidate to validate
	 * @return true if mail is valid, false otherwise
	 */
	public static boolean isValidMail(String candidate) {
		Pattern mail = Pattern.compile(EMAIL_REGEX, Pattern.CASE_INSENSITIVE);
		return mail.matcher(candidate).find();
	}
}
