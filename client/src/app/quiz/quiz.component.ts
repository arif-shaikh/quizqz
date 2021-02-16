import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { QuizService } from "../shared/quiz.service";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
  public progressBarPercentage: Number;

  constructor(private router: Router, public quizService: QuizService) {}

  ngOnInit() {
    if (parseInt(localStorage.getItem("seconds")) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem("seconds"));
      this.quizService.qnProgress = parseInt(
        localStorage.getItem("qnProgress")
      );
      this.quizService.qns = JSON.parse(localStorage.getItem("qns"));
      this.progressBarPercentage = 1;
      //if (this.quizService.qnProgress == this.quizService.qns.length)
      if (this.quizService.qnProgress == 20){
        this.router.navigate(["/result"]);
      }else {
         this.startTimer();
      }
    } else {
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe((data: any) => {
        this.quizService.qns = data;
        this.startTimer();
      });
    }
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem("seconds", this.quizService.seconds.toString());
    }, 1000);
  }

  Answer(qID, choice) {
    this.quizService.qns[this.quizService.qnProgress].choice = choice;
    localStorage.setItem("qns", JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    this.progressBarPercentage =
      ((this.quizService.qnProgress + 1) / this.quizService.qns.length) * 100;
    localStorage.setItem("qnProgress", this.quizService.qnProgress.toString());
    
    if (this.quizService.qnProgress == this.quizService.qns.length) {
      clearInterval(this.quizService.timer);
      this.router.navigate(["/result"]);
    }
  }
}
