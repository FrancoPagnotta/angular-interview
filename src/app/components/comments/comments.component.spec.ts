import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms' ;
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with the name, email and password fields', () => {
    
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('body')).toBeTruthy();
 
  });
  
  it('The email must be provided'), () => {

    const control = component.form.get('email');
    control?.setValue('');
    
    expect(control?.valid).toBeFalsy();
  }

  it('The email must be valid'), () => {

    const control = component.form.get('email');
    control?.setValue('name123@gmail.com');
  
    expect(control?.valid).toBeTruthy();
  }
});