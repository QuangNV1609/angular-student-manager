import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { CreateStudentComponent } from './Components/create-student/create-student.component';
import { LoginComponent } from './Components/login/login.component';
import { StudentDeltailsComponent } from './Components/student-deltails/student-deltails.component';
import { StudentListComponent } from './Components/student-list/student-list.component';
import { FontAwesomeIcons } from './constant/fontAwesomeIcons';
import { DateComponent } from './customs/tag/date/date.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptors';
import { AuthService } from './Services/authService/auth.service';



@NgModule({
  declarations: [
    AppComponent,
    StudentDeltailsComponent,
    StudentListComponent,
    CreateStudentComponent,
    FooterComponent,
    HeaderComponent,
    DateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary, private authService: AuthService) {
    library.addIcons(...FontAwesomeIcons);
  }
}
