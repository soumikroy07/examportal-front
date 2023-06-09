import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent {
  quizzes=[]

  constructor(private quiz: QuizService){}

  ngOnInit(): void{
    this.quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) =>{
        console.log(error);
        Swal.fire('Error', 'Error in loading data', 'error')
      }
    )
  }

  public deleteQuiz(qId){
    // alert(qId);
    Swal.fire({
      icon:"info",
      title:"Are you sure you want to delete",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then(
      (result) => {
        if(result.isConfirmed){
          this.quiz.deleteQuiz(qId).subscribe(
            (data) => {
              this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId)
              Swal.fire("Successful",'Quiz has deleted successfuffly','success')
            },
            (error) =>{
              console.log(error);
              Swal.fire("Error", 'there is an error', 'error')
            }
          )
        }
      }
    )
  }
}
