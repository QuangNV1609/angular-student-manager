import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneValidator } from 'src/app/customs/validators/phone/phone.validator';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/Services/authService/auth.service';
import { HttpErrorService } from 'src/app/Services/httpErrorHandler/http-error.service';
import { StudentService } from 'src/app/Services/student/student.service';
import { Gender } from '../create-student/create-student.component';

@Component({
  selector: 'app-student-deltails',
  templateUrl: './student-deltails.component.html',
  styleUrls: ['student-deltails.component.scss']
})
export class StudentDeltailsComponent implements OnInit {
  student?: Student;
  public birthDay: Date | null = new Date('2022-01-01');
  public Gender = Gender;
  public studentGender: Gender = Gender.MALE;
  public notFound = false;
  public isAdmin = false;

  studentForm = this.formBuilder.group({
    firstName: [this.student?.firstName, Validators.required],
    lastName: [this.student?.lastName, Validators.required],
    address: [this.student?.address, Validators.required],
    email: [this.student?.email, Validators.compose([Validators.email, Validators.required])],
    phoneNumber: [this.student?.phoneNumber, Validators.compose([PhoneValidator, Validators.required])],
    gender: [this.student?.gender ? Gender.MALE : Gender.FEMALE, Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private activetedRoute: ActivatedRoute, 
    private studentService: StudentService, private router: Router, 
    private httpError: HttpErrorService, private authService: AuthService) { }

  ngOnInit(): void {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.authService.currentUser.subscribe(
        user => {
          if(user.roles.includes('ROLE_ADMIN')){
            this.isAdmin = true;
          }else{
            this.isAdmin = false;
          }
        }
      )
      this.activetedRoute.params.subscribe(data => {
        this.getStudentById(data['id'])
      });
    }
  }

  public setDate(event: any) {
    this.birthDay = event;
  }

  public getStudentById(studentId: string) {
    this.studentService.getStudentById(studentId).subscribe((student) => {
      this.student = student;
      if (student.gender) {
        this.studentGender = Gender.MALE;
      } else {
        this.studentGender = Gender.FEMALE;
      }
      this.studentForm = this.formBuilder.group({
        firstName: [this.student?.firstName, Validators.required],
        lastName: [this.student?.lastName, Validators.required],
        address: [this.student?.address, Validators.required],
        email: [this.student?.email, Validators.compose([Validators.email, Validators.required])],
        phoneNumber: [this.student?.phoneNumber, Validators.compose([PhoneValidator, Validators.required])],
        gender: [this.student?.gender ? Gender.MALE : Gender.FEMALE, Validators.required]
      });
      this.notFound = false;
    },
      (error) => {
        this.notFound = true;
        this.httpError.handleError(error);
      })
  }

  editStudent() {
    this.studentService.editStudent({
      ...this.studentForm.value,
      birthDay: this.birthDay,
      id: this.student?.id
    }).subscribe((data) => {
      console.log(data);
      alert('Sửa thành công!');
    });
  }

  deleteStudent() {
    if (this.student?.id) {
      this.studentService.deleteStudent(this.student?.id).subscribe((response) => {
        alert('Xóa thành công!');
        this.router.navigate(['/student/home']);
      });
    }
  }



}
