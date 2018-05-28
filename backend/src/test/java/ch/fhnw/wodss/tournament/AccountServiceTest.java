package ch.fhnw.wodss.tournament;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyZeroInteractions;
import static org.mockito.Mockito.when;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
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
import ch.fhnw.wodss.tournament.service.BettingPoolService;
import ch.fhnw.wodss.tournament.service.MailService;
import ch.fhnw.wodss.tournament.util.Argon2Util;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.FinalizeRecoveryViewModel;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.RegisterViewModel;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.StartRecoveryViewModel;

/**
 * Performs test of account service
 */
@RunWith(SpringRunner.class)
public class AccountServiceTest {

    @TestConfiguration
    static class TestInitializer {

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

    @MockBean
    private BettingPoolService bettingPoolService;

    @Test
    public void testRegister() {
        RegisterViewModel vm = setupValidRegisterViewModel();

        // check returned account
        Account created = accountService.register(vm);
        Assert.assertFalse("created account should never be admin", created.isAdmin());
        Assert.assertTrue("created account should be active", created.isActive());
        Assert.assertFalse("created account should never be instantly verified", created.isVerified());
        Assert.assertEquals("mail of account and vm not identical", created.getMail(), vm.getMail());
        Assert.assertEquals("username of account and vm not identical", created.getUsername(), vm.getUsername());
        Assert.assertTrue("account salt length should be >= 20", created.getSalt().length() >= 20);
        Assert.assertTrue("account activation key length should be >= 20", created.getActivationKey().length() >= 20);
        Assert.assertNull("password should not be available in account object", created.getPassword());

        verify(accountRepository, times(1)).save(created);
        verify(mailService, times(1)).sendRegistrationMail(created);
    }

    @Test
    public void testRegister_passwordValid() {
        RegisterViewModel vm = setupValidRegisterViewModel();

        // valid passwords
        try {
            // very long password
            vm.setPassword("2*=ö:nP¬A#3é`^e%€oe-&Eç&$n+S$¨N<$@@),([0NWä,/&\"FyN=çP=$i#@Ä!$|%`gD^5&@*AALp(I-.fEè;b§gD*PçGmFP`4E)#*<3rN?{-(ge]Q1J7rg#àV'EçjP¨u!QG^°B_AKÖb_#°V/ÄoBE1vWIp/$R^+¦PA=J¨p}9§%?Rf#+5%°B+A<ü19^+E$/IJe149´Vçäg@°%#n\"=^!Ä:G1§r&\"=%[Fr`>kD4ü?&VR/i0SRBF+E9çr%34çq*@öf");
            accountService.register(vm);

            // all special characters
            vm.setPassword("W,vhfdz0");
            accountService.register(vm);
            vm.setPassword("Qewl.iy8");
            accountService.register(vm);
            vm.setPassword("Dj:oxup9");
            accountService.register(vm);
            vm.setPassword("Gyk-ska3");
            accountService.register(vm);
            vm.setPassword("Orgph_r5");
            accountService.register(vm);
            vm.setPassword("Gz#muqn4");
            accountService.register(vm);
            vm.setPassword("Leoa+as8");
            accountService.register(vm);
            vm.setPassword("Lovvxd1~");
            accountService.register(vm);
            vm.setPassword("Hptacl2<");
            accountService.register(vm);
            vm.setPassword("Rljdw>q1");
            accountService.register(vm);
            vm.setPassword("U!qadoh0");
            accountService.register(vm);
            vm.setPassword("$Yrunfb3");
            accountService.register(vm);
            vm.setPassword("Q§fwybs2");
            accountService.register(vm);
            vm.setPassword("Ep%qkoy4");
            accountService.register(vm);
            vm.setPassword("Bde&kix7");
            accountService.register(vm);
            vm.setPassword("Nbyk(dv2");
            accountService.register(vm);
            vm.setPassword("Cskaw)r9");
            accountService.register(vm);
            vm.setPassword("Pwstaz{3");
            accountService.register(vm);
            vm.setPassword("Jhcdmk7}");
            accountService.register(vm);
            vm.setPassword("=Nbtwof4");
            accountService.register(vm);
            vm.setPassword("G?fplpd4");
            accountService.register(vm);
            vm.setPassword("Nh@qxxl8");
            accountService.register(vm);

        } catch (IllegalArgumentException ignored) {
            Assert.fail("register failed with valid passwords");
        }

        verify(accountRepository, atLeastOnce()).save(any());
        verify(mailService, atLeastOnce()).sendRegistrationMail(any());
    }

    @Test
    public void testRegister_passwordInvalid() {
        RegisterViewModel vm = setupValidRegisterViewModel();

        // too short
        try {
            vm.setPassword("Aa1$");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid password");
        } catch (IllegalArgumentException ignored) {
        }

        // no number
        try {
            vm.setPassword("Aaa$aaaa");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid password");
        } catch (IllegalArgumentException ignored) {
        }

        // no special char
        try {
            vm.setPassword("Aa1aaaaa");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid password");
        } catch (IllegalArgumentException ignored) {
        }

        // no upper case character
        try {
            vm.setPassword("aa1$aaaa");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid password");
        } catch (IllegalArgumentException ignored) {
        }

        // no lower case character
        try {
            vm.setPassword("AA1$AAAA");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid password");
        } catch (IllegalArgumentException ignored) {
        }

        verifyZeroInteractions(accountRepository);
        verifyZeroInteractions(mailService);
    }

    @Test
    public void testRegister_mailValid() {
        RegisterViewModel vm = setupValidRegisterViewModel();

        // valid mails
        try {
            vm.setMail("asdf@asdcom.com");
            accountService.register(vm);
            vm.setMail("PIEJWR@OUWENRF.CH");
            accountService.register(vm);
            vm.setMail("c@h.ch");
            accountService.register(vm);
            vm.setMail("asdf@asdf.qwer.com");
            accountService.register(vm);
            vm.setMail("Asdf.Qwer@qwer.com");
            accountService.register(vm);
            vm.setMail("qwer1234@qwer.com");
            accountService.register(vm);
            vm.setMail("qwer1234@qwer1234.com");
            accountService.register(vm);
            vm.setMail("qwer-asdf@qwer-asdf.com");
            accountService.register(vm);

        } catch (IllegalArgumentException ignored) {
            Assert.fail("register failed with valid mails");
        }

        verify(accountRepository, atLeastOnce()).save(any());
        verify(mailService, atLeastOnce()).sendRegistrationMail(any());
    }

    @Test
    public void testRegister_mailInvalid() {
        RegisterViewModel vm = setupValidRegisterViewModel();

        // invalid mails
        try {
            vm.setMail("asdf@sadfkdcom.com!");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid mail");
        } catch (IllegalArgumentException ignored) {
        }

        try {
            vm.setMail("asdf@sadfkdcomcom");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid mail");
        } catch (IllegalArgumentException ignored) {
        }

        try {
            vm.setMail("asdf@sadfk@dcom.com");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid mail");
        } catch (IllegalArgumentException ignored) {
        }

        try {
            vm.setMail("asdfsadfkdcom.com");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid mail");
        } catch (IllegalArgumentException ignored) {
        }

        try {
            vm.setMail("@asdcom.com");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid mail");
        } catch (IllegalArgumentException ignored) {
        }

        try {
            vm.setMail("a@b.c");
            accountService.register(vm);
            Assert.fail("register did not fail with invalid mail");
        } catch (IllegalArgumentException ignored) {
        }

        verifyZeroInteractions(accountRepository);
        verifyZeroInteractions(mailService);
    }

    @Test
    public void testRegister_accountAlreadyExists() {
        RegisterViewModel vm = setupValidRegisterViewModel();

        String usernameExistsMessage = "";
        String mailExistsMessage = "";

        // account with same name already exists
        when(accountRepository.findByUsername(anyString())).thenReturn(new Account());
        try {
            accountService.register(vm);
            Assert.fail("register did not fail with taken username");
        } catch (IllegalArgumentException e) {
            usernameExistsMessage = e.getMessage();
        }

        // account with same mail already exists
        when(accountRepository.findByUsername(anyString())).thenReturn(null);
        when(accountRepository.findByMail(anyString())).thenReturn(new Account());
        try {
            accountService.register(vm);
            Assert.fail("register did not fail with taken mail");
        } catch (IllegalArgumentException e) {
            mailExistsMessage = e.getMessage();
        }

        Assert.assertTrue("Error message not identical", usernameExistsMessage.equals(mailExistsMessage));

        verify(accountRepository, never()).save(any());
        verifyZeroInteractions(mailService);
    }

    @Test
    public void testActivateAccount_activateAgain() {
        Account mock = new Account();
        mock.setVerified(true);
        when(accountRepository.findByActivationKey(anyString())).thenReturn(mock);

        // verified account can be activated (idempotent)
        try {
            accountService.activateAccount("my-very-secret-token");
        } catch (IllegalArgumentException ignored) {
            Assert.fail("activating account that was already activated should not fail");
        }

        Assert.assertTrue(mock.isVerified());
        verify(accountRepository, times(1)).save(mock);
        verify(bettingPoolService, times(1)).joinSpecialGroup(mock);
    }

    @Test
    public void testActivateAccount() {
        Account mock = new Account();
        mock.setVerified(false);
        when(accountRepository.findByActivationKey(anyString())).thenReturn(mock);

        accountService.activateAccount("my-very-secret-token");
        Assert.assertTrue(mock.isVerified());

        verify(accountRepository, times(1)).save(mock);
        verify(bettingPoolService, times(1)).joinSpecialGroup(mock);
    }

    @Test
    public void testActivateAccount_invalidActivationKey() {
        when(accountRepository.findByActivationKey(anyString())).thenReturn(null);

        // if no account was found by key - no activation possible!
        try {
            accountService.activateAccount("my-very-secret-token");
            Assert.fail("activating account did not fail with wrong activation key");
        } catch (IllegalArgumentException ignored) {
        }

        verify(accountRepository, never()).save(any());
        verifyZeroInteractions(bettingPoolService);
    }

    @Test
    public void testStartPasswordReset_invalid() {
        StartRecoveryViewModel vm = new StartRecoveryViewModel();
        vm.setUsername("username");
        vm.setMail("mail");

        // no account found by username
        when(accountRepository.findByUsername(anyString())).thenReturn(null);
        when(accountRepository.findByMail(anyString())).thenReturn(new Account());
        try {
            accountService.startPasswordReset(vm);
            Assert.fail("starting password reset did not fail with no account found by username");
        } catch (IllegalArgumentException ignored) {
        }

        // no account found by mail
        when(accountRepository.findByUsername(anyString())).thenReturn(new Account());
        when(accountRepository.findByMail(anyString())).thenReturn(null);
        try {
            accountService.startPasswordReset(vm);
            Assert.fail("starting password reset did not fail with no account found by username");
        } catch (IllegalArgumentException ignored) {
        }

        // different accounts found by username und mail
        when(accountRepository.findByUsername(anyString())).thenReturn(new Account());
        when(accountRepository.findByMail(anyString())).thenReturn(new Account());
        try {
            accountService.startPasswordReset(vm);
            Assert.fail("starting password reset did not fail different accounts found by username und mail");
        } catch (IllegalArgumentException ignored) {
        }

        // account not active
        Account mock1 = new Account();
        mock1.setActive(false);
        mock1.setVerified(true);
        when(accountRepository.findByUsername(anyString())).thenReturn(mock1);
        when(accountRepository.findByMail(anyString())).thenReturn(mock1);
        try {
            accountService.startPasswordReset(vm);
            Assert.fail("starting password reset did not fail with account not active");
        } catch (IllegalArgumentException ignored) {
        }

        // account not verified
        Account mock2 = new Account();
        mock2.setActive(true);
        mock2.setVerified(false);
        when(accountRepository.findByUsername(anyString())).thenReturn(mock2);
        when(accountRepository.findByMail(anyString())).thenReturn(mock2);
        try {
            accountService.startPasswordReset(vm);
            Assert.fail("starting password reset did not fail with account not verified");
        } catch (IllegalArgumentException ignored) {
        }

        verifyZeroInteractions(accountRecoveryRepository);
        verifyZeroInteractions(mailService);
    }

    @Test
    public void testStartPasswordReset() {
        StartRecoveryViewModel vm = new StartRecoveryViewModel();
        vm.setUsername("username");
        vm.setMail("mail");

        Account mock = new Account();
        mock.setActive(true);
        mock.setVerified(true);
        when(accountRepository.findByUsername(anyString())).thenReturn(mock);
        when(accountRepository.findByMail(anyString())).thenReturn(mock);

        accountService.startPasswordReset(vm);

        verify(accountRecoveryRepository, times(1)).save(any());
        verify(mailService, times(1)).sendRecoveryMail(any());
    }

    @Test
    public void testResetPassword_invalid() {
        FinalizeRecoveryViewModel vm = new FinalizeRecoveryViewModel();
        vm.setToken("abcd");

        // no recovery token found
        when(accountRecoveryRepository.findByRecoveryKey(anyString())).thenReturn(null);
        try {
            accountService.resetPassword(vm);
            Assert.fail("reset password did not fail with invalid recovery token");
        } catch (IllegalArgumentException ignored) {
        }

        // invalid password
        Account mockAccount = new Account();
        mockAccount.setActive(true);
        mockAccount.setVerified(true);
        AccountRecovery mockAccountRecovery = new AccountRecovery();
        mockAccountRecovery.setAccount(mockAccount);
        when(accountRecoveryRepository.findByRecoveryKey(anyString())).thenReturn(mockAccountRecovery);
        vm.setPassword("password_one");
        try {
            accountService.resetPassword(vm);
            Assert.fail("reset password did not fail with invalid password");
        } catch (IllegalArgumentException ignored) {
        }

        // account null
        mockAccountRecovery.setAccount(null);
        try {
            accountService.resetPassword(vm);
            Assert.fail("reset password did not fail with account null");
        } catch (IllegalArgumentException ignored) {
        }

        // account not activated
        mockAccountRecovery.setAccount(mockAccount);
        mockAccount.setActive(false);
        try {
            accountService.resetPassword(vm);
            Assert.fail("reset password did not fail with account not activated");
        } catch (IllegalArgumentException ignored) {
        }

        // account not verified
        mockAccountRecovery.setAccount(mockAccount);
        mockAccount.setActive(true);
        mockAccount.setVerified(false);
        try {
            accountService.resetPassword(vm);
            Assert.fail("reset password did not fail with account not verified");
        } catch (IllegalArgumentException ignored) {
        }

        verifyZeroInteractions(accountRepository);
        verify(accountRecoveryRepository, never()).deleteAll(any());
    }

    @Test
    public void testResetPassword() {
        Account mockAccount = new Account();
        mockAccount.setActive(true);
        mockAccount.setVerified(true);
        AccountRecovery mockAccountRecovery = new AccountRecovery();
        mockAccountRecovery.setAccount(mockAccount);
        when(accountRecoveryRepository.findByRecoveryKey(anyString())).thenReturn(mockAccountRecovery);
        FinalizeRecoveryViewModel vm = new FinalizeRecoveryViewModel();
        vm.setToken("abcd");
        vm.setPassword("Secure!$2018");

        accountService.resetPassword(vm);

        verify(accountRepository, times(1)).save(any());
        verify(accountRecoveryRepository, times(1)).deleteAll(any());
    }

    @Test
    public void testChangePassword() {
        String oldPw = "oldPw";
        String oldSalt = "oldSalt";
        Account mockAccount = new Account();
        mockAccount.setPassword(oldPw);
        mockAccount.setSalt(oldSalt);

        // check old values
        Assert.assertEquals("Password not updated", mockAccount.getPassword(), oldPw);
        Assert.assertEquals("Hash not updated", mockAccount.getSalt(), oldSalt);

        accountService.changePassword("newPw", mockAccount);

        // check old values are overwritten
        Assert.assertNotEquals("Password not updated", mockAccount.getPassword(), oldPw);
        Assert.assertNotEquals("Hash not updated", mockAccount.getSalt(), oldSalt);

        verify(accountRepository, times(1)).save(mockAccount);
    }

    private RegisterViewModel setupValidRegisterViewModel() {
        RegisterViewModel vm = new RegisterViewModel();
        vm.setMail("hans.muster@mail.com");
        vm.setPassword("Str0ng$P422w0rd!");
        vm.setUsername("wmHans56");
        return vm;
    }
}
