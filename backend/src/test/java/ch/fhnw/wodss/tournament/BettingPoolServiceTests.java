package ch.fhnw.wodss.tournament;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.BettingPool;
import ch.fhnw.wodss.tournament.repository.BettingPoolRepository;
import ch.fhnw.wodss.tournament.service.AccountService;
import ch.fhnw.wodss.tournament.service.BettingPoolService;
import ch.fhnw.wodss.tournament.service.RankingService;
import ch.fhnw.wodss.tournament.service.dto.BettingPoolDTO;
import ch.fhnw.wodss.tournament.util.SecurityUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;

/**
 * Performs test of betting pool service
 */
@RunWith(SpringRunner.class)
public class BettingPoolServiceTests {

    @TestConfiguration
    static class TestInitializer {

        @Bean
        public BettingPoolService bettingPoolService() {
            return new BettingPoolService();
        }
    }

    @Autowired
    private BettingPoolService bettingPoolService;

    @MockBean
    private BettingPoolRepository bettingPoolRepository;

    @MockBean
    private AccountService accountService;

    @MockBean
    private RankingService rankingService;

    @MockBean
    private SecurityUtil securityUtil;

    @Test
    public void testCreatePool_invalid() {
        // invalid pool names
        try {// null
            bettingPoolService.createPool(null);
            Assert.fail("creating pool did not fail with pool name null");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);
        try {// empty
            bettingPoolService.createPool("");
            Assert.fail("creating pool did not fail with pool name empty");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);
        try {// name too long
            bettingPoolService.createPool("JlbHXIbfFfcasZIooSwRqPtMOKPSubLAnyRlNIKrZxaCdLuIJeuZZbHhLXfCmeuUjbKKHbFJtOMAxweUThgRTgEQNoqUQvZkmaVEz");
            Assert.fail("creating pool did not fail with pool name too long");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);

        // pool with name same already existing
        when(bettingPoolRepository.findByName("testpool")).thenReturn(new BettingPool());
        try {
            bettingPoolService.createPool("testpool");
            Assert.fail("creating pool did not fail with pool name already in use");
        } catch (IllegalArgumentException ignored) {
        }

        verifyZeroInteractions(securityUtil);
        verifyZeroInteractions(accountService);
        verify(bettingPoolRepository, never()).save(any());
    }

    @Test
    public void testCreatePool() {
        String bettingPoolName = "testpool";
        when(bettingPoolRepository.findByName(any())).thenReturn(null);
        bettingPoolService.createPool(bettingPoolName);

        ArgumentCaptor<BettingPool> captor = ArgumentCaptor.forClass(BettingPool.class);
        verify(bettingPoolRepository, times(1)).save(captor.capture());
        BettingPool savedBettingPool = captor.getValue();
        Assert.assertEquals("name of created betting pool not as expected", bettingPoolName, savedBettingPool.getName());
    }


    @Test
    public void testDeletePool_invalid() {
        // invalid pool names
        try {// null
            bettingPoolService.deletePool(null);
            Assert.fail("deleting pool did not fail with pool name null");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);
        try {// empty
            bettingPoolService.deletePool("");
            Assert.fail("deleting pool did not fail with pool name empty");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);
        try {// name too long
            bettingPoolService.deletePool("JlbHXIbfFfcasZIooSwRqPtMOKPSubLAnyRlNIKrZxaCdLuIJeuZZbHhLXfCmeuUjbKKHbFJtOMAxweUThgRTgEQNoqUQvZkmaVEz");
            Assert.fail("deleting pool did not fail with pool name too long");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);

        // pool with not existing pool name
        when(bettingPoolRepository.findByName(any())).thenReturn(null);
        try {
            bettingPoolService.deletePool("testpool");
            Assert.fail("deleting pool did not fail with not existing pool name");
        } catch (IllegalArgumentException ignored) {
        }

        // protected special pool
        BettingPool bettingPool = new BettingPool();
        bettingPool.setSpecial(true);
        when(bettingPoolRepository.findByName(any())).thenReturn(bettingPool);
        try {
            bettingPoolService.deletePool("testpool");
            Assert.fail("deleting pool did not fail with special pool name");
        } catch (IllegalArgumentException ignored) {
        }

        // user is not owner of pool to delete
        Account owner = new Account();
        owner.setId(3L);
        bettingPool.setOwner(owner);
        Account currentUser = new Account();
        currentUser.setId(4L);
        when(accountService.getAccountByName(any())).thenReturn(currentUser);
        try {
            bettingPoolService.deletePool("testpool");
            Assert.fail("deleting pool did not fail user account not owning the pool");
        } catch (IllegalArgumentException ignored) {
        }

        verify(bettingPoolRepository, never()).delete(any());
    }

    @Test
    public void testDeletePool() {
        Account owner = new Account();
        owner.setId(3L);
        BettingPool bettingPool = new BettingPool();
        bettingPool.setSpecial(false);
        bettingPool.setOwner(owner);
        when(bettingPoolRepository.findByName(any())).thenReturn(bettingPool);
        when(accountService.getAccountByName(any())).thenReturn(owner);

        bettingPoolService.deletePool("testpool");

        verify(bettingPoolRepository, times(1)).delete(bettingPool);
    }


    @Test
    public void testLeavePool_invalid() {
        // invalid pool names
        try {// null
            bettingPoolService.leaveGroup(null);
            Assert.fail("leaving pool did not fail with pool name null");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);
        try {// empty
            bettingPoolService.leaveGroup("");
            Assert.fail("leaving pool did not fail with pool name empty");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);
        try {// name too long
            bettingPoolService.leaveGroup("JlbHXIbfFfcasZIooSwRqPtMOKPSubLAnyRlNIKrZxaCdLuIJeuZZbHhLXfCmeuUjbKKHbFJtOMAxweUThgRTgEQNoqUQvZkmaVEz");
            Assert.fail("leaving pool did not fail with pool name too long");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);

        // pool with not existing pool name
        when(bettingPoolRepository.findByName(any())).thenReturn(null);
        try {
            bettingPoolService.leaveGroup("testpool");
            Assert.fail("leaving pool did not fail with not existing pool name");
        } catch (IllegalArgumentException ignored) {
        }

        // protected special pool
        BettingPool bettingPool = new BettingPool();
        bettingPool.setSpecial(true);
        when(bettingPoolRepository.findByName(any())).thenReturn(bettingPool);
        try {
            bettingPoolService.leaveGroup("testpool");
            Assert.fail("leaving pool did not fail with special pool name");
        } catch (IllegalArgumentException ignored) {
        }

        verify(bettingPoolRepository, never()).save(any());
    }

    @Test
    public void testLeavePool_asNotMember() {
        List<Account> members = new ArrayList<>();

        // add 10 members
        for (int i = 0; i < 10; i++) {
            Account member = new Account();
            member.setId(i + 10L);
            members.add(member);
        }

        Account currentAccount = new Account();
        currentAccount.setId(42L);


        BettingPool bettingPool = new BettingPool();
        bettingPool.setSpecial(false);
        bettingPool.setMembers(members);
        bettingPool.setOwner(members.get(0));  // current user is NOT owner

        when(bettingPoolRepository.findByName(any())).thenReturn(bettingPool);
        when(accountService.getAccountByName(any())).thenReturn(currentAccount);

        // check current member list size
        Assert.assertEquals(10, members.size());


        BettingPoolDTO pool = bettingPoolService.leaveGroup("pool");
        Assert.assertEquals("pool size not as expected", 10, pool.getMembers().size());
        verify(bettingPoolRepository, never()).save(any());
    }

    @Test
    public void testLeavePool_asMember() {
        List<Account> members = new ArrayList<>();

        // add 10 members
        for (int i = 0; i < 10; i++) {
            Account member = new Account();
            member.setId(i + 10L);
            members.add(member);
        }

        Account currentAccount = new Account();
        currentAccount.setId(42L);
        members.add(currentAccount); // add current user as member


        BettingPool bettingPool = new BettingPool();
        bettingPool.setSpecial(false);
        bettingPool.setMembers(members);
        bettingPool.setOwner(members.get(0));  // current user is NOT owner

        when(bettingPoolRepository.findByName(any())).thenReturn(bettingPool);
        when(accountService.getAccountByName(any())).thenReturn(currentAccount);

        // check current member list size
        Assert.assertEquals(11, members.size());


        BettingPoolDTO pool = bettingPoolService.leaveGroup("pool");
        Assert.assertEquals("pool size not as expected", 10, pool.getMembers().size());
        verify(bettingPoolRepository, times(1)).save(bettingPool);
    }

    @Test
    public void testJoinGroup_invalid() {
        // invalid pool names
        try {// null
            bettingPoolService.joinGroup(null);
            Assert.fail("joining pool did not fail with pool name null");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);
        try {// empty
            bettingPoolService.joinGroup("");
            Assert.fail("joining pool did not fail with pool name empty");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);
        try {// name too long
            bettingPoolService.joinGroup("JlbHXIbfFfcasZIooSwRqPtMOKPSubLAnyRlNIKrZxaCdLuIJeuZZbHhLXfCmeuUjbKKHbFJtOMAxweUThgRTgEQNoqUQvZkmaVEz");
            Assert.fail("joining pool did not fail with pool name too long");
        } catch (IllegalArgumentException ignored) {
        }
        verifyZeroInteractions(bettingPoolRepository);

        // pool with not existing pool name
        when(bettingPoolRepository.findByName(any())).thenReturn(null);
        try {
            bettingPoolService.joinGroup("testpool");
            Assert.fail("joining pool did not fail with not existing pool name");
        } catch (IllegalArgumentException ignored) {
        }

        // protected special pool
        BettingPool bettingPool = new BettingPool();
        bettingPool.setSpecial(true);
        when(bettingPoolRepository.findByName(any())).thenReturn(bettingPool);
        try {
            bettingPoolService.leaveGroup("testpool");
            Assert.fail("leaving pool did not fail with special pool name");
        } catch (IllegalArgumentException ignored) {
        }

        verify(bettingPoolRepository, never()).save(any());
    }

    @Test
    public void testJoinGroup_alreadyMember() {
        List<Account> members = new ArrayList<>();

        // add 10 members
        for (int i = 0; i < 10; i++) {
            Account member = new Account();
            member.setId(i + 10L);
            members.add(member);
        }

        Account currentAccount = new Account();
        currentAccount.setId(42L);
        members.add(currentAccount); // add current user as member


        BettingPool bettingPool = new BettingPool();
        bettingPool.setSpecial(false);
        bettingPool.setMembers(members);
        bettingPool.setOwner(members.get(0));

        when(bettingPoolRepository.findByName(any())).thenReturn(bettingPool);
        when(accountService.getAccountByName(any())).thenReturn(currentAccount);

        // check current member list size
        Assert.assertEquals(11, members.size());


        BettingPoolDTO pool = bettingPoolService.joinGroup("pool");
        Assert.assertEquals("pool size not as expected", 11, pool.getMembers().size());
        verify(bettingPoolRepository, never()).save(any());
    }

    @Test
    public void testJoinGroup() {
        List<Account> members = new ArrayList<>();

        // add 10 members
        for (int i = 0; i < 10; i++) {
            Account member = new Account();
            member.setId(i + 10L);
            members.add(member);
        }

        BettingPool bettingPool = new BettingPool();
        bettingPool.setSpecial(false);
        bettingPool.setMembers(members);
        bettingPool.setOwner(members.get(0));

        Account currentAccount = new Account();
        currentAccount.setId(42L);

        when(bettingPoolRepository.findByName(any())).thenReturn(bettingPool);
        when(accountService.getAccountByName(any())).thenReturn(currentAccount);

        // check current member list size
        Assert.assertEquals(10, members.size());


        BettingPoolDTO pool = bettingPoolService.joinGroup("pool");
        Assert.assertEquals("pool size not as expected", 11, pool.getMembers().size());
        verify(bettingPoolRepository, times(1)).save(bettingPool);
    }


    @Test
    public void testJoinSpecialGroup_invalid() {
        // account null
        try {
            bettingPoolService.joinSpecialGroup(null);
            Assert.fail("joining special pool did not fail with account null");
        } catch (IllegalArgumentException ignored) {
        }

        // account not active
        Account account = new Account();
        account.setActive(false);
        try {
            bettingPoolService.joinSpecialGroup(account);
            Assert.fail("joining special pool did not fail with account not active");
        } catch (IllegalArgumentException ignored) {
        }

        // account not verified
        account.setActive(true);
        account.setVerified(false);
        try {
            bettingPoolService.joinSpecialGroup(account);
            Assert.fail("joining special pool did not fail with account not verified");
        } catch (IllegalArgumentException ignored) {
        }
    }

    @Test
    public void testJoinSpecialGroup_alreadyMember() {
        Account currentAccount = new Account();
        currentAccount.setId(42L);
        currentAccount.setActive(true);
        currentAccount.setVerified(true);

        BettingPool specialBettingPool = new BettingPool();
        specialBettingPool.setSpecial(true);
        specialBettingPool.setMembers(Collections.singletonList(currentAccount));

        when(bettingPoolRepository.findAllBySpecial(true)).thenReturn(Collections.singletonList(specialBettingPool));

        bettingPoolService.joinSpecialGroup(currentAccount);

        verify(bettingPoolRepository, never()).save(any());
    }

    @Test
    public void testJoinSpecialGroup() {
        Account currentAccount = new Account();
        currentAccount.setId(42L);
        currentAccount.setActive(true);
        currentAccount.setVerified(true);

        BettingPool specialBettingPool = new BettingPool();
        specialBettingPool.setSpecial(true);
        specialBettingPool.setMembers(new ArrayList<>());

        when(bettingPoolRepository.findAllBySpecial(true)).thenReturn(Collections.singletonList(specialBettingPool));

        // check current size
        Assert.assertEquals(0, specialBettingPool.getMembers().size());

        bettingPoolService.joinSpecialGroup(currentAccount);

        Assert.assertEquals("member list size not as expected", 1, specialBettingPool.getMembers().size());
        verify(bettingPoolRepository, times(1)).save(specialBettingPool);
    }
}
