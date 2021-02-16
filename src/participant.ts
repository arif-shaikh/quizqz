export class Participant {
  Id: number;
  name: string;
  score: number;
  timespent: Number;

  init(Id: number, name: string) {
    this.Id = Id;
    this.name = name;
    this.score = 0;
    this.timespent = 0;
  }
}

export class ParticipantList {
  private participantList: Participant[] = [];

  reset() {
    this.participantList = [];
  }

  get(participantName: string) {
    let foundParticipant = this.participantList.find(
      eachParticipant => eachParticipant.name == participantName
    );
    return foundParticipant;
  }

  getById(participantId: number) {
    let foundParticipant = this.participantList.find(
      eachParticipant => eachParticipant.Id == participantId
    );
    return foundParticipant;
  }

  add(participantName: string): boolean {
    let retValue = false;
    let foundParticipant = this.participantList.find(
      eachParticipant => eachParticipant.name == participantName
    );
    if (!foundParticipant) {
      let newParticipant: Participant = new Participant();
      newParticipant.init(this.participantList.length, participantName);
      this.participantList.push(newParticipant);
      retValue = true;
    } else {
      foundParticipant.score = 0;
      foundParticipant.timespent = 0;
      retValue = true;
    }

    return retValue;
  }

  remove(participantName: string): boolean {
    let retValue = false;

    let foundParticipant = this.participantList.find(
      eachParticipant => eachParticipant.name == participantName
    );
    if (foundParticipant) {
      this.participantList.splice(foundParticipant.Id, foundParticipant.Id + 1);
      retValue = true;
    }

    return retValue;
  }

  getList(): Participant[] {
    const cloneParticipantList = Object.assign({}, this.participantList);
    cloneParticipantList.sort((a, b) => a.score - b.score);

    return cloneParticipantList;
  }
}
