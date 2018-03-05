package ch.fhnw.wodss.tournament;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import ch.fhnw.wodss.tournament.model.User;
import ch.fhnw.wodss.tournament.model.permission.AdministratorPermission;

@SpringBootApplication
// TODO KKI move me into a configuration class
@EnableJpaRepositories("ch.fhnw.wodss.tournament.persistance")
public class TournamentApplication implements CommandLineRunner {

	@PersistenceContext
	EntityManager em;

	public static void main(String[] args) {
		SpringApplication.run(TournamentApplication.class, args);
	}

	@Override
	@Transactional
	public void run(String... args) throws Exception {
		User hoang = new User("asdfasdf", "asdfasdf", "adsasd@.ch");
		hoang.addPermission(new AdministratorPermission());

		em.persist(hoang);
	}

}
