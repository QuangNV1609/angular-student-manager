import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { UnauthorizationComponent } from './common/unauthorization/unauthorization.component';
import { CreateStudentComponent } from './Components/create-student/create-student.component';
import { LoginComponent } from './Components/login/login.component';
import { StudentDeltailsComponent } from './Components/student-deltails/student-deltails.component';
import { StudentListComponent } from './Components/student-list/student-list.component';

const routes: Routes = [
  { path: "student/add", component: CreateStudentComponent },
  { path: "student/home", component: StudentListComponent },
  { path: "student/403", component: UnauthorizationComponent },
  { path: "student/:id", component: StudentDeltailsComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/student/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
