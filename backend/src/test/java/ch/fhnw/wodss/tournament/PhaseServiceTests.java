package ch.fhnw.wodss.tournament;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import ch.fhnw.wodss.tournament.domain.Phase;
import ch.fhnw.wodss.tournament.repository.PhaseRepository;
import ch.fhnw.wodss.tournament.service.PhaseService;

/**
 * Performs test of phase service
 *
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RunWith(SpringRunner.class)
public class PhaseServiceTests {

    @TestConfiguration
    static class TestInitializer {

        @Bean
        public PhaseService groupService() {
            return new PhaseService();
        }
    }

    @Autowired
    private PhaseService phaseService;

    @MockBean
    private PhaseRepository phaseRepository;

    @Test
    public void testGetAllPhases() {
        // no items
        Mockito.when(phaseRepository.findAll()).thenReturn(new ArrayList<Phase>());
        Assert.assertEquals(0, phaseService.getAllPhases().size());

        // some items
        List<Phase> mock = new ArrayList<>();
        mock.add(new Phase());
        mock.add(new Phase());
        Mockito.when(phaseRepository.findAll()).thenReturn(mock);
        Assert.assertEquals(2, phaseService.getAllPhases().size());
    }

    @Test
    public void testExistsPhase() {
        Mockito.when(phaseRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        Mockito.when(phaseRepository.findById(100L)).thenReturn(Optional.of(new Phase()));

        // nothing found
        Assert.assertTrue("phase found with invalid phase id", !phaseService.existsPhase(42));

        // item found
        Assert.assertTrue("phase not found", phaseService.existsPhase(100));
    }

}
