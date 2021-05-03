import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { NotesComponent } from './notes/notes.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

/** @ignore */
const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'userHome', component: UserHomeComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'notes', component: NotesComponent, pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
