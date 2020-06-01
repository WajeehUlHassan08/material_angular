import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class StudentdataService {

  constructor(private firebase:AngularFireDatabase) { }

  studentList: AngularFireList<any>;

  studentForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    cnic: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    gender: new FormControl('1'),
    subjects: new FormControl('0'),
    // joindate: new FormControl('', Validators.required),
    isgraduated: new FormControl(false)
  });


  initializeStudentForm(){
    this.studentForm.setValue({
      $key: null,
      fullname: '',
      email: '',
      cnic: '',
      address: '',
      age: '',
      gender: '1',
      subjects: '0',
      // joindate: '',
      isgraduated: false
    })
  }


  getStudents(){
    this.studentList = this.firebase.list('students');
    return this.studentList.snapshotChanges();
  }


  insertStudent(student){
    this.studentList.push({
      fullname: student.fullname,
      email: student.email,
      cnic: student.cnic,
      address: student.address,
      age: student.age,
      gender: student.gender,
      subjects: student.subjects,
      // joindate: student.joindate,
      isgraduated: student.isgraduated
    })
  }


  updateStudent(student){
    this.studentList.update(student.$key, {
      fullname: student.fullname,
      email: student.email,
      cnic: student.cnic,
      address: student.address,
      age: student.age,
      gender: student.gender,
      subjects: student.subjects,
      // joindate: student.joindate,
      isgraduated: student.isgraduated
    });
  }

  deleteStudent($key: string){
    this.studentList.remove($key);
  }

  populateForm(student){
    this.studentForm.setValue(student);  // error
  }

}