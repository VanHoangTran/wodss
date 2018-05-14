package ch.fhnw.wodss.tournament;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.AccountRecovery;
import ch.fhnw.wodss.tournament.repository.AccountRecoveryRepository;
import ch.fhnw.wodss.tournament.repository.AccountRepository;
import ch.fhnw.wodss.tournament.service.AccountService;
import ch.fhnw.wodss.tournament.service.MailService;
import ch.fhnw.wodss.tournament.util.Argon2Util;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.FinalizeRecoveryViewModel;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.RegisterViewModel;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.StartRecoveryViewModel;

/**
 * Performs test of account service
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RunWith(SpringRunner.class)
public class AccountServiceTest {

	@TestConfiguration
	static class TestInitalizer {

		@Bean
		public AccountService accountService() {
			return new AccountService();
		}

	}

	@Autowired
	private AccountService accountService;

	@MockBean
	private Argon2Util passwordEncoder;

	@MockBean
	private MailService mailService;

	@MockBean
	private AccountRepository accountRepository;

	@MockBean
	private AccountRecoveryRepository accountRecoveryRepository;

	@Test
	public void testRegister() {
		// valid view model
		RegisterViewModel vm = new RegisterViewModel();
		vm.setMail("hans.muster@mail.com");
		vm.setPassword("Str0ng$P422w0rd!");
		vm.setUsername("wmHans56");

		// test invalid password exception
		try {
			vm.setPassword("S!1_0");
			accountService.register(vm);
			vm.setPassword("asdf19283!");
			accountService.register(vm);
			vm.setPassword("Asdf19283");
			accountService.register(vm);
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
			vm.setPassword("Str0ng$P422w0rd!");
		}

		// test invalid mail
		try {
			vm.setMail("asdf@sadfkdcom.com!");
			accountService.register(vm);
			vm.setMail("asdf@sadfkdcomcom");
			accountService.register(vm);
			vm.setMail("asdf@sadfk@dcom.com");
			accountService.register(vm);
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
			vm.setMail("hans.muster@mail.com");
		}

		String usernameExistsMessage = "";
		String mailExistsMessage = "";

		// user with same name
		Mockito.when(accountRepository.findByUsername(Mockito.anyString())).thenReturn(new Account());
		try {
			accountService.register(vm);
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
			usernameExistsMessage = e.getMessage();
			Mockito.when(accountRepository.findByUsername(Mockito.anyString())).thenReturn(null);
		}

		// user with same mail
		Mockito.when(accountRepository.findByMail(Mockito.anyString())).thenReturn(new Account());
		try {
			accountService.register(vm);
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
			mailExistsMessage = e.getMessage();
			Mockito.when(accountRepository.findByMail(Mockito.anyString())).thenReturn(null);
		}

		Assert.assertTrue("information leakage?", usernameExistsMessage.equals(mailExistsMessage));

		// check returned account
		Account created = accountService.register(vm);
		Assert.assertTrue("should never be admin", !created.isAdmin());
		Assert.assertTrue("should be active", created.isActive());
		Assert.assertTrue("should never be verified", !created.isVerified());
		Assert.assertTrue("mail as defined in vm", created.getMail().equals(vm.getMail()));
		Assert.assertTrue("username as defined in vm", created.getUsername().equals(vm.getUsername()));
		Assert.assertTrue("salt length >= 20", created.getSalt().length() >= 20);
		Assert.assertTrue("has activation key", created.getActivationKey().length() >= 20);
		Assert.assertTrue("password not clear text", created.getPassword() != vm.getPassword());
	}

	@Test
	public void testActivateAccount() {
		Mockito.when(accountRepository.findByActivationKey(Mockito.anyString())).thenReturn(null);

		// if no account was found by key - no activation possible!
		try {
			accountService.activateAccount("my-very-secret-token");
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
		}

		// account can be activated
		Account mock = new Account();
		mock.setVerified(false);
		Mockito.when(accountRepository.findByActivationKey(Mockito.anyString())).thenReturn(mock);
		accountService.activateAccount("my-very-secret-token");

		// verified account can be activated (idempotent)
		mock.setVerified(true);
		accountService.activateAccount("my-very-secret-token");
	}

	@Test
	public void testInitPasswordReset() {
		StartRecoveryViewModel vm = new StartRecoveryViewModel();
		vm.setUsername("username");
		vm.setMail("mail");

		// no user can be found!
		try {
			accountService.startPasswordReset(vm);
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
		}

		// inactive or not verified user
		try {
			accountService.startPasswordReset(vm);
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
		}

	}

	@Test
	public void testResetPassword() {
		FinalizeRecoveryViewModel vm = new FinalizeRecoveryViewModel();
		vm.setToken("abcd");

		// no recovery token found
		Mockito.when(accountRecoveryRepository.findByRecoveryKey(Mockito.anyString())).thenReturn(null);
		try {
			accountService.resetPassword(vm);
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
		}

		AccountRecovery mock = new AccountRecovery();
		Mockito.when(accountRecoveryRepository.findByRecoveryKey(Mockito.anyString())).thenReturn(mock);

		// invalid password combination
		vm.setPassword("password_one");
		vm.setPassword2("very-different-password");
		try {
			accountService.resetPassword(vm);
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
		}

		// validity of password
		vm.setPassword("password_one");
		vm.setPassword2("password_one");
		try {
			accountService.resetPassword(vm);
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
		}

		// invalid account
		Account invalid = new Account();
		invalid.setActive(false);
		invalid.setVerified(true);
		mock.setAccount(invalid);
		try {
			accountService.resetPassword(vm);
			Assert.fail("should never reach here...");
		} catch (IllegalArgumentException e) {
		}

		// exception free using valid data
		invalid.setActive(true);
		vm.setPassword("Secure!$2018");
		vm.setPassword2("Secure!$2018");
		accountService.resetPassword(vm);
	}

}
