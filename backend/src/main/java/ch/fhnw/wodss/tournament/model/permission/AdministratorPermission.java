package ch.fhnw.wodss.tournament.model.permission;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Administrator")
public class AdministratorPermission extends Permission {

	@Override
	public String toString() {
		return "Administrator";
	}

}
