import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhoneValidator } from 'src/app/customs/validators/phone/phone.validator';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/Services/authService/auth.service';
import { StudentService } from 'src/app/Services/student/student.service';

export enum Gender {
  FEMALE = 0,
  MALE = 1
}

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})

export class CreateStudentComponent implements OnInit {
  student?: Student;
  public Gender = Gender;
  public birthDay: Date = new Date();


  studentForm = this.formBuider.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.compose([Validators.email, Validators.required])],
    phoneNumber: ['', Validators.compose([PhoneValidator, Validators.required])],
    gender: [Gender.MALE, Validators.required]
  });

  constructor(private studentService: StudentService, private formBuider: FormBuilder,
    private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
    this.authService.currentUser.subscribe(
      data => {
        if (!data.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/student/403']);
        }
      }
    )
  }

  public setDate(event: any) {
    this.birthDay = event;
  }


  public addStudent() {
    this.studentService.addStudent({
      ...this.studentForm.value,
      birthDay: this.birthDay
    }).subscribe(data => {
      console.log(data);
      alert('Thêm thành công!')
    })
    this.studentForm.reset();
  }

}
