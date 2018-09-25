import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TimeTableComponent } from './timetable/time-table.component'
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/timetable', pathMatch: 'full', 
        // canActivate:[AuthGuard]
    },
    { path: 'timetable', component: TimeTableComponent, 
        // canActivate:[AuthGuard]
    },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}