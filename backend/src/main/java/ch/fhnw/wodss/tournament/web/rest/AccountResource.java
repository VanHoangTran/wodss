package ch.fhnw.wodss.tournament.web.rest;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.service.AccountService;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.FinalizeRecoveryViewModel;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.RegisterViewModel;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.StartRecoveryViewModel;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.VerificationVM;

/**
 * REST controller to manage the user accounts
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

	private final Logger log = LoggerFactory.getLogger(AccountResource.class);

	@Autowired
	private AccountService accountService;

	/**
	 * POST /account : create (register) a new user
	 * 
	 * @param registerViewModel the vm to create user for
	 */
	@PostMapping("/registration")
	public ResponseEntity<String> registerAccount(@Valid @RequestBody RegisterViewModel registerViewModel) {
		log.info("new call to POST registration");

		// check if view model is valid
		if (!registerViewModel.isValid()) {
			log.info("provided view model was invalid, sending bad request");
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		try {
			accountService.register(registerViewModel);
			log.info("registration was successful, sending response to client");
		} catch (IllegalArgumentException iae) {
			log.info("registration failed, sending response to client");
			return new ResponseEntity<String>(iae.getMessage(), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<String>("Account registered", HttpStatus.CREATED);
	}

	/**
	 * PUT /registration : verify a mail address
	 * 
	 * @param verificationViewModel the vm to verify
	 */
	@PutMapping("/registration")
	public ResponseEntity<String> activateAccount(@Valid @RequestBody VerificationVM verificationViewModel) {
		log.info("new call to PUT registration");

		if (!verificationViewModel.isValid()) {
			log.info("provided view model was invalid, sending bad request");
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		try {
			accountService.activateAccount(verificationViewModel.getToken());
			log.info("account activated, sending response to client");
		} catch (IllegalArgumentException iae) {
			log.info("account activation failed, sending response to client");
			return new ResponseEntity<String>(iae.getMessage(), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<String>("Account activated", HttpStatus.OK);
	}

	/**
	 * POST /recovery : send a new password to the user
	 * 
	 * @param recoveryViewModel the vm to create user for
	 */
	@PostMapping("/recovery")
	public ResponseEntity<String> resetPassword(@Valid @RequestBody StartRecoveryViewModel recoveryViewModel) {
		log.info("new call to POST recovery");

		if (!recoveryViewModel.isValid()) {
			log.info("provided view model was invalid, sending bad request");
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		try {
			accountService.startPasswordReset(recoveryViewModel);
			log.info("start of password reset successful, sending response to client");
		} catch (IllegalArgumentException iae) {
			log.info("start of password reset process failed, sending response to client");
			return new ResponseEntity<String>(iae.getMessage(), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<String>("Recovery mail send", HttpStatus.CREATED);
	}

	/**
	 * PUT /recovery : reset password of recovery assigned user
	 * 
	 * @param recoveryViewModel
	 */
	@PutMapping("/recovery")
	public ResponseEntity<String> updatePassword(@Valid @RequestBody FinalizeRecoveryViewModel recoveryViewModel) {
		log.info("new call to POST recovery");

		if (!recoveryViewModel.isValid()) {
			log.info("provided view model was invalid, sending bad request");
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		try {
			accountService.resetPassword(recoveryViewModel);
			log.info("password reset successful, sending response to client");
		} catch (IllegalArgumentException iae) {
			log.info("password reset failed, sending response to client");
			return new ResponseEntity<String>(iae.getMessage(), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<String>("Sucessfully updated password", HttpStatus.OK);
	}
}
