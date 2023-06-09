import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {

  public Editor = ClassicEditor
  qId;
  qTitle;
  question={
    quiz:{

    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  }

  constructor(private _route: ActivatedRoute, private _question:QuestionService){

  }

  ngOnInit(): void{
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title']
    this.question.quiz['qId'] = this.qId;
  }

  formSubmit(){
    
    if(this.question.content.trim() == '' || this.question.content == null){
      Swal.fire("Error", "Enter All Details", 'error')
      return;
    }
    if(this.question.option1.trim() == '' || this.question.option1 == null){
      Swal.fire("Error", "Enter atleast 2 Options", 'error')
      return;
    }
    if(this.question.option2.trim() == '' || this.question.option2 == null){
      Swal.fire("Error", "Enter atleast 2 Options", 'error')
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer == null){
      Swal.fire("Error", "Select   Answer", 'error')
      return;
    }
    
    this._question.addQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire("Success","Question added successfully",'success')
        this.question.content=''
        this.question.option1=''
        this.question.option2=''
        this.question.option3=''
        this.question.option4=''
      },
      (error) =>{
        Swal.fire("Error","Error to post data",'error')
        console.log(error);
        
      }
    )
  }
}
