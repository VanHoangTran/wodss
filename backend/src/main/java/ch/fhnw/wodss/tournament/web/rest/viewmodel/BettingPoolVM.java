package ch.fhnw.wodss.tournament.web.rest.viewmodel;

public class BettingPoolVM {

	private String name;

	private String action;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public boolean isValid() {
		return name != null && name != "";
	}

}
