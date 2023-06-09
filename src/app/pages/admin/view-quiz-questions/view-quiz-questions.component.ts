import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent {
  qId;
  qTitle;
  questions = []

  constructor(private _route: ActivatedRoute, private _question: QuestionService){}

  ngOnInit(): void{
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title']
    console.log(this.qId);
    console.log(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        
        this.questions = data;
      },
      (error) =>{
        console.log(error);
        
      }
    )
  }

  //delete question
  public deleteQuestion(questionId){

    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure you want to delete this question? '
    }).then((result) =>{
      if(result.isConfirmed) {
        this._question.deleteQuestion(questionId).subscribe(
          (data) =>{
            Swal.fire("Success", "Question deleted successfully", 'success');

            this.questions = this.questions.filter((q) => q.quesId != questionId)
          },
          (error) =>{
            console.log(error);
            Swal.fire("Error", "Error in deleting question", 'error')
          }
        )
      }
    })

  }
}
