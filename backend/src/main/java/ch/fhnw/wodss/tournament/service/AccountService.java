package ch.fhnw.wodss.tournament.service;

import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.AccountRecovery;
import ch.fhnw.wodss.tournament.repository.AccountRecoveryRepository;
import ch.fhnw.wodss.tournament.repository.AccountRepository;
import ch.fhnw.wodss.tournament.util.Argon2Util;
import ch.fhnw.wodss.tournament.util.ValidationUtil;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.FinalizeRecoveryViewModel;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.RegisterViewModel;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.StartRecoveryViewModel;

/**
 * Service responsible for managing the user accounts.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Service
@Transactional
public class AccountService {

	private final Logger log = LoggerFactory.getLogger(AccountService.class);

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private AccountRecoveryRepository accountRecoveryRepository;

	@Autowired
	private Argon2Util passwordEncoder;

	@Autowired
	private MailService mailService;

	@Autowired
	private AccountService accountService;

	/**
	 * Registers a new account which is inactive and not verified
	 * 
	 * @param registerViewModel containing account informations
	 * @return created account
	 */
	public Account register(RegisterViewModel registerViewModel) {
		log.info("registration of new user {}", registerViewModel.getUsername());

		if (!ValidationUtil.isValidPassword(registerViewModel.getPassword())) {
			throw new IllegalArgumentException("password invalid");
		}

		// check if there is already a user
		Account foundByUsername = accountRepository.findByUsername(registerViewModel.getUsername().toLowerCase());
		if (foundByUsername != null) {
			throw new IllegalArgumentException("unable to create account");
		}

		// check if there is a user with same mail
		Account foundByMail = accountRepository.findByMail(registerViewModel.getMail().toLowerCase());
		if (foundByMail != null) {
			throw new IllegalArgumentException("unable to create account");
		}

		Account newAccount = new Account();
		newAccount.setAdmin(false);
		newAccount.setActive(false);
		newAccount.setVerified(false);
		newAccount.setMail(registerViewModel.getMail());
		newAccount.setUsername(registerViewModel.getUsername());

		// Encode password with salt
		log.info("salting and hashing user's password with argon2");
		String salt = RandomStringUtils.randomAlphanumeric(20);
		String hash = passwordEncoder.hash(salt + registerViewModel.getPassword());
		newAccount.setPassword(hash);
		newAccount.setSalt(salt);

		// create and set a random activation key
		newAccount.setActivationKey(RandomStringUtils.randomNumeric(20));

		// persist user
		accountRepository.save(newAccount);

		log.info("new account registered for {}", newAccount);

		// send registration mail
		mailService.sendRegistrationMail(newAccount);

		return newAccount;
	}

	/**
	 * Creates a account recovery entry for given account.
	 * 
	 * @param account to create recovery for
	 * @return the created account recovery
	 */
	public AccountRecovery createRecovery(Account account) {
		log.info("creating a new account recovery for {}", account);

		AccountRecovery recovery = new AccountRecovery();
		recovery.setAccount(account);

		String key = RandomStringUtils.randomAlphanumeric(50);
		recovery.setRecoveryKey(key);

		accountRecoveryRepository.save(recovery);

		log.info("account recovery created");

		return recovery;
	}

	/**
	 * Removes all existing recoveries for given account-
	 * 
	 * @param account to invalidate recoveries for
	 */
	public void invalidateRecovieries(Account account) {
		log.info("invalidating all recovery entries for {}", account);

		List<AccountRecovery> active = accountRecoveryRepository.findAllByAccount(account);
		accountRecoveryRepository.deleteAll(active);

		log.info("invalidated {} account recovery entries", active.size());
	}

	/**
	 * Updates the password for a account
	 * 
	 * @param newPassword to set
	 */
	public void changePassword(String newPassword, Account account) {
		log.info("Setting a new password for {}", account);

		log.info("salting and hashing user's password with argon2");
		String salt = RandomStringUtils.randomAlphanumeric(20);
		String hash = passwordEncoder.hash(salt + account.getPassword());
		account.setPassword(hash);
		account.setSalt(salt);

		accountRepository.save(account);

		log.info("Password changed sucessfully");
	}

	/**
	 * Activates a account for given activation token
	 * 
	 * @param activationToken received in mail
	 * @return boolean if update was successful
	 */
	public void activateAccount(String activationToken) {
		Account account = accountRepository.findByActivationKey(activationToken);

		if (account == null || account.isActive()) {
			throw new IllegalArgumentException("unable to activate account");
		} else {
			account.setActive(true);
			account.setVerified(true);
			accountRepository.save(account);
		}
	}

	/**
	 * Starts the password reset process
	 * 
	 * @param recoveryViewModel
	 */
	public void startPasswordReset(StartRecoveryViewModel recoveryViewModel) {
		// check if there is already a user
		Account foundByUsername = accountRepository.findByUsername(recoveryViewModel.getUsername().toLowerCase());
		Account foundByMail = accountRepository.findByMail(recoveryViewModel.getMail().toLowerCase());
		if (foundByUsername == null || foundByMail == null || foundByMail != foundByUsername || !foundByMail.isActive()
				|| !foundByMail.isVerified()) {
			// prevent leakage - just say we were unable to send recovery mail
			throw new IllegalArgumentException("Failed to send recovery mail");
		}

		// invalidate all existing AccountRecoveries for this account!
		accountService.invalidateRecovieries(foundByMail);

		// create a new recovery entry
		AccountRecovery recovery = accountService.createRecovery(foundByMail);

		// send recovery mail
		mailService.sendRecoveryMail(recovery);
	}

	/**
	 * Resets the password for given recovery view model
	 * 
	 * @param recoveryViewModel
	 */
	public void resetPassword(FinalizeRecoveryViewModel recoveryViewModel) {
		// find recovery by token
		AccountRecovery recovery = accountRecoveryRepository.findByRecoveryKey(recoveryViewModel.getToken());
		if (recovery == null) {
			throw new IllegalArgumentException("Unable to perform recovery");
		}

		// check uf passwords are equal
		if (!recoveryViewModel.getPassword().equals(recoveryViewModel.getPassword2())) {
			throw new IllegalArgumentException("Passwords are not equal");
		}

		// check password strength
		if (!ValidationUtil.isValidPassword(recoveryViewModel.getPassword())) {
			throw new IllegalArgumentException("Password does not meet requirements");
		}

		// check if assigned account is valid and active
		Account account = recovery.getAccount();
		if (account == null || !account.isActive() || !account.isVerified()) {
			throw new IllegalArgumentException("Account is inactive or was not verified yet");
		}

		// update password
		accountService.changePassword(recoveryViewModel.getPassword(), account);

		// invalidate all recovery entries
		accountService.invalidateRecovieries(account);
	}
}
