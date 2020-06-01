import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './students/student/student.component';
import { MaterialModule } from './Material/material/material.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

import { environment } from '../environments/environment';  //for development
// import { environment } from '../environments/environment.prod';  //for production

import { StudentdataService } from './service/studentdata.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentsListComponent } from './students/students-list/students-list.component';



@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentComponent,
    StudentsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule, 
    FormsModule,   
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [StudentdataService],
  bootstrap: [AppComponent],
  entryComponents: [StudentComponent]  // to open component in a popup
})
export class AppModule { }
