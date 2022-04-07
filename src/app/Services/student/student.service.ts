import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Param } from 'src/app/Components/student-list/student-list.component';
import { Student } from 'src/app/model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  BASE_URL = "http://localhost:8080/student";

  constructor(private httpClient: HttpClient) { }

  addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.BASE_URL + "/add", student);
  }

  deleteStudent(studentId: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("studentId", studentId);
    return this.httpClient.delete<any>(this.BASE_URL + '/delete', { params: queryParams });
  }

  editStudent(student: Student): Observable<any> {
    console.log(student);
    return this.httpClient.put<any>(this.BASE_URL + '/edit', student);
  }

  getListStudent(param: Param): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", param.page);
    queryParams = queryParams.append("size", param.size);
    if (param.key.trim().length) {
      queryParams = queryParams.append("key", param.key);
    }
    return this.httpClient.get<any>(this.BASE_URL + '/list', { params: queryParams });
  }

  getStudentById(studentId: string): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/' + studentId);
  }

}
