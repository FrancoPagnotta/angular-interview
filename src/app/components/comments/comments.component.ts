

import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
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
  apiComments: Array<Comment> = [];
  comments: Array<Comment> = [];
  comment: Comment;
  commentDate : string;
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
    });
  }
  
  save() {

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(input => input.markAllAsTouched());
    } else {
      this.comments.push(this.form.value);
      this.commentDate = (new Date().getDate()).toString() + '/' + (new Date().getMonth() + 1).toString() + '/' + new Date().getFullYear().toString();
      this.saveStorage();
      this.form.reset();
    }

    return;
  }

  saveStorage() {
    localStorage.setItem(`post${this.id}`,JSON.stringify(this.comments));
    localStorage.setItem(`commentsPost${this.id}`,JSON.stringify(this.commentDate));
  }

  loadStorage() {
    if (localStorage.getItem(`post${this.id}`)) this.comments = JSON.parse(localStorage.getItem(`post${this.id}`) || '');
    else this.comments = [];

    if (localStorage.getItem(`commentsPost${this.id}`)) this.commentDate = JSON.parse(localStorage.getItem(`commentsPost${this.id}`) || '');
    else this.commentDate = '';
  }

  deleteComment(index : number) {
    this.comments.splice(index, 1);
    this.saveStorage();
  }
}
