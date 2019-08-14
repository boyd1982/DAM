import {Component, OnInit, ViewChild} from '@angular/core';
import {EdituserComponent} from "../admin/edituser/edituser.component";
import {EditdatabaseComponent} from "./editdatabase/editdatabase.component";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})

export class DatabaseComponent implements OnInit {
  isVisible = false;
  @ViewChild('editdatabaseComponent', {static: false})
  edc : EditdatabaseComponent;
  constructor() { }

  ngOnInit() {
  }
  handleOk(){
    this.isVisible=false;
  };
  adddatabase(){
    this.isVisible=true;
  }
  handleCancel(){
    this.isVisible=false;
  }
  getAddMsg(msg){
    if (msg == 1){
      this.isVisible = false;
      this.edc.refresh();
    }
  }
}
