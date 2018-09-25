import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing-module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { TimeTableComponent } from './timetable/time-table.component'
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component'

import { TimeTableSlotService } from './shared/time-table-slot.service'
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { SigninComponent } from './auth/signin/signin.component'
import { AuthGuard } from './auth/auth-guard.service';
import { ModalComponent } from './timetable/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    TimeTableComponent,
    SignupComponent,
    HeaderComponent,
    SigninComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    TimeTableSlotService, 
    DataStorageService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
