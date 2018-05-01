package ch.fhnw.wodss.tournament.web.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.AccountRecovery;
import ch.fhnw.wodss.tournament.repository.AccountRepository;
import ch.fhnw.wodss.tournament.service.AccountService;
import ch.fhnw.wodss.tournament.service.MailService;
import ch.fhnw.wodss.tournament.util.ValidationUtil;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.RecoveryViewModel;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.RegisterViewModel;

/**
 * REST controller to manage the user accounts
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private AccountService accountService;

	@Autowired
	private MailService mailService;

	/**
	 * POST /account : create (register) a new user
	 * 
	 * @param registerViewModel the vm to create user for
	 */
	@PostMapping("/registration")
	public ResponseEntity<String> registerAccount(@Valid @RequestBody RegisterViewModel registerViewModel) {
		if (ValidationUtil.isValidPassword(registerViewModel.getPassword())) {
			return new ResponseEntity<String>("Password does not consider requirements.", HttpStatus.BAD_REQUEST);
		}

		// check if view model is valid
		if (!registerViewModel.isValid()) {
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		// check if there is already a user
		Account foundByUsername = accountRepository.findByUsername(registerViewModel.getUsername().toLowerCase());
		if (foundByUsername != null) {
			return new ResponseEntity<String>("Username already in use.", HttpStatus.BAD_REQUEST);
		}

		// check if there is a user with same mail
		Account foundByMail = accountRepository.findByMail(registerViewModel.getMail().toLowerCase());
		if (foundByMail != null) {
			return new ResponseEntity<String>("E-Mail address already in use.", HttpStatus.BAD_REQUEST);
		}

		// create the new user
		Account newAccount = accountService.register(registerViewModel);

		// send verification mail to user
		mailService.sendRegistrationMail(newAccount);

		return new ResponseEntity<String>("Account registered", HttpStatus.CREATED);
	}

	/**
	 * POST /recovery : send a new password to the user
	 * 
	 * @param recoveryViewModel the vm to create user for
	 */
	@PostMapping("/recovery")
	public ResponseEntity<String> resetPassword(@Valid @RequestBody RecoveryViewModel recoveryViewModel) {
		if (!recoveryViewModel.isValid()) {
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		// check if there is already a user
		Account foundByUsername = accountRepository.findByUsername(recoveryViewModel.getUsername().toLowerCase());
		Account foundByMail = accountRepository.findByMail(recoveryViewModel.getMail().toLowerCase());
		if (foundByUsername == null || foundByMail == null || foundByMail != foundByUsername) {
			// prevent leakage - just say we were unable to send recovery mail
			return new ResponseEntity<String>("Failed to send recovery mail", HttpStatus.BAD_REQUEST);
		}

		// invalidate all existing AccountRecoveries for this account!
		accountService.invalidateRecovieries(foundByMail);
		
		// create a new recovery entry
		AccountRecovery recovery = accountService.createRecovery(foundByMail);
		
		// send recovery mail
		mailService.sendRecoveryMail(recovery);
		
		return new ResponseEntity<String>("Recovery mail send", HttpStatus.CREATED);
	}

}
