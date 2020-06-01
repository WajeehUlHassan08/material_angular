import { Component, OnInit, ViewChild } from '@angular/core';

import { StudentdataService } from '../../service/studentdata.service';

import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { StudentComponent } from '../student/student.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  constructor(public service: StudentdataService, private dialog: MatDialog) { }

  listData: MatTableDataSource<any>;
  displayColumns: string[] = ['fullname', 'email', 'cnic', 'address', 'age', 'actions'];

  @ViewChild(MatPaginator, {static:false}) paginator:MatPaginator;

  searchkey: string;

  ngOnInit() {
    this.service.getStudents().subscribe(list => {
        let array = list.map(item => {
          return {
            $key:item.key,
            ...item.payload.val()   // ... are destructurings syntax from javascript to make the retrieved object a part of this object
          }          
        })
        this.listData = new MatTableDataSource(array);
        this.listData.paginator = this.paginator;
      }
    );

    
  }

  onSearchClear(){
    this.searchkey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchkey.trim().toLocaleLowerCase();
    // this.listData.filter = this.searchkey.trim();
  }


  onCreate(){
    this.service.initializeStudentForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(StudentComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);  // error
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(StudentComponent, dialogConfig);

    // console.log(row)
  }

  onDelete($key){
    if(confirm('Are you sure you want to delete this student?')){
      this.service.deleteStudent($key);
    }
  }

}
