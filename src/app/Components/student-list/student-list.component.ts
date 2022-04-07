import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/Services/student/student.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/authService/auth.service';

export class Param {
  page: number = 1
  size: number = 10
  totalPage: number = 0;
  key: string = ''
}
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  studentList: Student[] = [];
  param: Param = {
    page: 1,
    size: 3,
    totalPage: 0,
    key: ''
  }
  public isAdmin: boolean = false;

  searchForm = this.formBuilder.group({
    key: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private studentService: StudentService,
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getStudentList();
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.authService.currentUser.subscribe(
        user => {
          this.isAdmin = user.roles.includes('ROLE_ADMIN');
        }
      )
    }
  }

  getStudentList() {
    this.studentService.getListStudent(this.param).subscribe(data => {
      this.studentList = data.studentList;
      this.param.totalPage = data.totalPage;
    })
  }

  nextPage() {
    if (this.param.page < this.param.totalPage) {
      this.param = {
        ...this.param,
        page: this.param.page + 1
      }
    }
    this.getStudentList();

  }

  prevPage() {
    if (this.param.page >= 1) {
      this.param = {
        ...this.param,
        page: this.param.page - 1
      }
    }
    this.getStudentList();
  }

  search() {
    this.param = {
      ...this.param,
      ...this.searchForm.value,
      page: 1
    }
    this.getStudentList();
  }

  deleteStudent(studentId: string | undefined) {
    if (studentId) {
      this.studentService.deleteStudent(studentId).subscribe(
        () => {
          this.getStudentList();
        }
      );
    }
  }

  pageChange(event: any) {
    const regex = /^\d+$/;
    const page = event.target.value;
    if (regex.test(page)) {
      if (new Number(page) <= this.param.totalPage && new Number(page) >= 1) {
        this.param.page = page;
        this.getStudentList();
      }
    } else {
      event.target.value = this.param.page;
    }
  }
}
