package ch.fhnw.wodss.tournament.persistance;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
