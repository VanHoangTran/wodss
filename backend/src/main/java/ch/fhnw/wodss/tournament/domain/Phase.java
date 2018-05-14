package ch.fhnw.wodss.tournament.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Phase {

	// phase id's
	public static final long GROUP_PHASE = 1;
	public static final long LAST_SIXTEEN = 2;
	public static final long QUATER_FINAL = 3;
	public static final long SEMI_FINAL = 4;
	public static final long THIRD_PLACE = 5;
	public static final long FINAL = 6;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
