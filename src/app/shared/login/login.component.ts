import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CommonService} from '../../service/common.service';
import {LoginUser} from '../../pojo/user';
import {Loginstatus} from "../../pojo/loginstatus";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  user: LoginUser = new LoginUser();
  @Output() loginMsg = new EventEmitter<Loginstatus>();
  //提交表单
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.user.user_id = this.validateForm.value.userName;
    this.user.password = this.validateForm.value.password;


    this.commonService.userLogin(this.user)
      .subscribe((loginstatus:Loginstatus)=>{
      this.sendLoginMsg(loginstatus);

    })

  }
  //发送消息至父表单
  sendLoginMsg(loginMsg: Loginstatus)
  {
    this.loginMsg.emit(loginMsg);
  }
  constructor(private fb: FormBuilder, private commonService: CommonService, private cookieService: CookieService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
