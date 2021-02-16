import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class QuizService {
  //---------------- Properties---------------
  readonly rootUrl = window.location.origin;
  //readonly rootUrl = "http://127.0.0.1:8080";
          
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;

  //---------------- Helper Methods---------------
  constructor(private http: HttpClient) {}
  displayTimeElapsed() {
    return (
      Math.floor(this.seconds / 3600) +
      ":" +
      Math.floor(this.seconds / 60) +
      ":" +
      Math.floor(this.seconds % 60)
    );
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem("participant"));
    return participant.Name;
  }

  insertParticipant(name: string, email: string) {
    var body = {
      name: name,
      email: email
    };
    return this.http.post(this.rootUrl + "/registerParticipant", body);
  }

  getParticipantList() {
    return this.http.get(this.rootUrl + "/participantList");
  }

  //---------------- Http Methods---------------
  getQuestions() {
    return this.http.get(this.rootUrl + "/questionList");
  }

  // getAnswers() {
  //   var body = this.qns.map(x => x.Id);
  //   return this.http.post(this.rootUrl + "/answers", body);
  // }

  submitScore() {
    var body = JSON.parse(localStorage.getItem("participant"));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + "/updateScore", body);
  }
}
