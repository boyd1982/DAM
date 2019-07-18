import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../service/common.service";
import {TestService} from "../../service/test.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private ts:TestService) { }

  ngOnInit() {
    this.ts.userList()
      .subscribe(
        (res)=>{
          console.log(res);
        }
      )
  }

}
