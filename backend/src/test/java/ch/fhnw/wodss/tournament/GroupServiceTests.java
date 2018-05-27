package ch.fhnw.wodss.tournament;

import ch.fhnw.wodss.tournament.domain.TournamentGroup;
import ch.fhnw.wodss.tournament.repository.TournamentGroupRepository;
import ch.fhnw.wodss.tournament.service.GroupService;
import ch.fhnw.wodss.tournament.service.dto.GroupDTO;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Performs test of group service
 *
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RunWith(SpringRunner.class)
public class GroupServiceTests {

    @TestConfiguration
    static class TestInitializer {

        @Bean
        public GroupService groupService() {
            return new GroupService();
        }
    }

    @Autowired
    private GroupService groupService;

    @MockBean
    private TournamentGroupRepository groupRepository;

    @Test
    public void testGetGroupByName_invalid() {
        // invalid group name provided
        Mockito.when(groupRepository.findByName(Mockito.anyString())).thenReturn(null);
        try {
            groupService.getGroupByName("group which does not exists ;-)");
            Assert.fail("getGroupByName did not fail with invalid group name");
        } catch (Exception ignored) {
        }
    }

    @Test
    public void testGetGroupByName() {
        TournamentGroup mock = new TournamentGroup();
        mock.setId(99L);
        mock.setName("Hall of Fame");
        Mockito.when(groupRepository.findByName(mock.getName())).thenReturn(mock);

        GroupDTO dto = groupService.getGroupByName(mock.getName());
        Assert.assertEquals(mock.getId(), dto.getId());
        Assert.assertEquals(mock.getName(), dto.getName());
    }
}
