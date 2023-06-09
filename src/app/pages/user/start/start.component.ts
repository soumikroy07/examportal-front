import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  qid;
  questions;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmitted = false;

  timer: any;

  constructor(
    private _location: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestion();
  }

  loadQuestion() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;
        console.log(this.questions);
        
        this.startTimer()
      },
      (error) => {
        Swal.fire('Error', 'Error in loading Questions', 'error');
      }
    )
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this._location.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit?',
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      icon: 'info'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.evalQuiz();
        }
      }
    )
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min: ${ss} sec`
  }
  
  evalQuiz() {

    // Handleing frontend side

    // this.isSubmitted = true;
    // this.questions.forEach((q) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let singleMarks = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += singleMarks;
    //   }
  
    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // })



    // Handling this event by server
    this.isSubmitted = true;

    this._question.evalQuiz(this.questions).subscribe(
      (data: any) =>{
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers
        this.attempted = data.attempted
      },
      (error) =>{
        console.log(error);
        
      }
    )
  
    Swal.fire('Success', 'Quiz has submitted successfully', 'success')
  }

  printPage(){
    window.print();
  }

}


