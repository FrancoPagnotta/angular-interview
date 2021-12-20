import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  form: FormGroup;  

  constructor(private _formBuilder: FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this._formBuilder.group({
      name: [ '', [Validators.required, Validators.minLength(3)] ],
      email: [ '', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+[\.][a-z]{2,3}$")] ],
      comment: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(30)] ],
    });
  }

  inputStatus (inputName: string) {
    return this.form.get(inputName)?.invalid && this.form.get(inputName)?.touched;
  }

  save() {
    console.log(this.form);
    
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(input => input.markAllAsTouched());
    }

    return;
  }

}
