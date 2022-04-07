import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  active: string = '';

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    const url = window.location.href;
    if (url.includes('home')) {
      this.active = 'home';
    }
    if (url.includes('add')) {
      this.active = 'add';
    }
  }

  onClick(active: string) {
    this.active = active;
    if (active == 'logout') {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      window.localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }

}
