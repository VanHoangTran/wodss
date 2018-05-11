package ch.fhnw.wodss.tournament.web.rest.viewmodel;

public class GameByPhaseVm {

	private long phaseId;

	public long getPhaseId() {
		return phaseId;
	}

	public void setPhaseId(long phaseId) {
		this.phaseId = phaseId;
	}

	public boolean isValid() {
		return phaseId != 0;
	}
}
