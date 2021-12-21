

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  form: FormGroup;
  apiComments: Array<Comment>;
  comments: Array<Comment> = [];
  @Input() id: number;

  constructor(private _formBuilder: FormBuilder,
              private _appService: AppService) { 
    this.createForm();
  }
  
  ngOnInit(): void {
    this.loadStorage();
    this.viewComments();
  }

  createForm() {
    this.form = this._formBuilder.group({
      name: [ '', [Validators.required, Validators.minLength(3)] ],
      email: [ '', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+[\.][a-z]{2,3}$")] ],
      body: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(500)] ],
    });
  }

  inputStatus (inputName: string) {
    return this.form.get(inputName)?.invalid && this.form.get(inputName)?.touched;
  }

  viewComments() {
    this._appService.getComments(this.id)
     .subscribe((res: any) => {
      this.apiComments = res;
      console.log(res)
    });
  }
  
  save() {
    console.log(this.form);
    if (this.form.invalid) Object.values(this.form.controls).forEach(input => input.markAllAsTouched());
    this.comments.push(this.form.value);
    this.saveStorage();
    return;
  }

  saveStorage() {
    localStorage.setItem('comments',JSON.stringify(this.comments));
  }

  loadStorage() {
    this.comments = JSON.parse(localStorage.getItem('comments') || '{}');
  }

  deleteComment(index : number) {
    this.comments.splice(index, 1);
    this.saveStorage();
  }

}
