package ch.fhnw.wodss.tournament.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.Phase;

public interface PhaseRepository extends JpaRepository<Phase, Long> {

}
