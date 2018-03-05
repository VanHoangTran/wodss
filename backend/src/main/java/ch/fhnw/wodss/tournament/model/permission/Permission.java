package ch.fhnw.wodss.tournament.model.permission;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Abstract representation of a user's permission.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */

@Entity
public abstract class Permission {

	@Id
	@GeneratedValue
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}