import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../service/common.service";
import {EdituserComponent} from "./edituser/edituser.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('edituserComponent', {static: false})
  euc:EdituserComponent;
  isVisible=false;
  listOfData: any[] = [];
  constructor(private commonService: CommonService) { }

  ngOnInit() {

  }
  adduser(){
    this.isVisible=true;
  }
  handleCancel(){
    this.isVisible=false;
  };
  handleOk(){
    this.isVisible=false;
  };
  getAddMsg(msg){
    if (msg == 1){
      this.isVisible = false;

      this.euc.refresh();

    }
  }
}
