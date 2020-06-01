import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';

import { StudentdataService } from '../../service/studentdata.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(public service: StudentdataService, public dialogRef: MatDialogRef<StudentComponent>) { }

  ngOnInit() {
    this.service.getStudents();

    
  }

  subjectList = [
    {id: '1', value: 'English'},
    {id: '2', value: 'Maths'},
    {id: '3', value: 'Urdu'},
  ]


  onSubmit(){
    if(this.service.studentForm.valid){
      if(!this.service.studentForm.get('$key').value)
        {
          this.service.insertStudent(this.service.studentForm.value);
        }
        else
        {
          this.service.updateStudent(this.service.studentForm.value);
        }

      this.service.studentForm.reset();
      this.service.initializeStudentForm();
      this.onClose();
    }
  }


  onClose(){
    this.service.studentForm.reset();
    this.service.initializeStudentForm();
    this.dialogRef.close();
  }

  onClear(){
    this.service.studentForm.reset();
    this.service.initializeStudentForm();    
  }

}
