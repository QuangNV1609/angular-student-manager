import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if(window.localStorage.getItem('token')){
      this.router.navigate(['/student/home']);
    }
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        window.localStorage.setItem('token', data);
        this.router.navigate(['/student/home']);
        this.authService.getUserLogined().subscribe(
          user => this.authService.userLogin.next(user)
        )
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
