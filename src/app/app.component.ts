import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/authService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-student-manager';

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    if(window.localStorage.getItem('token')){
      this.authService.getUserLogined().subscribe(
        user => {
          console.log('app moudle');
          this.authService.userLogin.next(user)
        }
      )
    }else{
      this.router.navigate(['/login']);
    }
    
  }

}
