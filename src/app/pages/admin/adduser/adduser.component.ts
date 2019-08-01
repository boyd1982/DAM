import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import {falseIfMissing} from "protractor/built/util";
import {CommonService} from "../../../service/common.service";
import {User} from "../../../pojo/user";
import {any} from "codelyzer/util/function";
import {transformAll} from "@angular/compiler/src/render3/r3_ast";
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})

export class AdduserComponent implements OnInit {

  validateForm: FormGroup;
  selectedValue: number;//下拉菜单中选择的值0,5,10
  selectedDatabases: string[] = [];//转移框中选择的数据库
  newUser:User = new User();
  addSuccess: boolean = true;//是否添加成功
  temp: any;
  list = [
    {"key": 1,"title": "PMS"},
    {"key": 2,"title": "ERP"},
    {"key": 3,"title": "营销"}
  ]
  @Output() addMsg = new EventEmitter<number>();

  //转移框事件
  change(ret: {}): void {
    console.log(ret);
    if (ret["to"]=="right"){
      for ( let res of ret["list"]){
        this.selectedDatabases.push(res.title);
      }
    }else {
      for ( let res of ret["list"]){
        this.selectedDatabases.splice(this.selectedDatabases.indexOf(res.title),1);
      }
    }
  }
  //提交表单按钮
  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    this.newUser.user_id = value.userId;
    this.newUser.user_name = value.userName;
    this.newUser.password = value.password;
    this.newUser.user_role = value.permissions;
    this.newUser.user_permissions = {};
    //获取数据库权限
    for (let db of this.selectedDatabases){
      this.newUser.user_permissions[db] = 1;
    }

    this.commonService.newUser(this.newUser)
      .subscribe((res: any)=>{
        console.log(res);
        if (res["status"] == 1){
          this.addSuccess = true;
          this.sendAddMsg(1);
        }else {
          this.addSuccess = false;
          this.validateForm.reset();
          this.sendAddMsg(0);
        }
      });
  }
  //向父组件发送成功消息，为关闭模态框
  sendAddMsg(msg: number){
    this.addMsg.emit(msg);
  }
  //重置表单
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }
  //用户名是否已存在
  // userNameAsyncValidator = (control: FormControl) =>{
  //
  //   this.temp = this.commonService.userIdExist(control.value);
  //   return this.temp;
  // }
    // new Observable((observer: Observer<ValidationErrors | null>) => {
    //   setTimeout(() => {
    //     if (control.value === 'JasonWood') {
    //       // you have to return `{error: true}` to mark it as an error event
    //       observer.next({ error: true, duplicated: true });
    //     } else {
    //       observer.next(null);
    //     }
    //     observer.complete();
    //   }, 1000);
    // }
    // );
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.commonService.userIdExist(control.value)
        .subscribe(
          (res)=>{
            if (res['status']==1){
              observer.next({error: true, duplicated: true});
            }else {
              observer.next(null);
            }
            observer.complete();
          }
        )
    });

  //确认密码一致
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };



  constructor(private fb: FormBuilder, private commonService:CommonService) {
    this.validateForm = this.fb.group({
      userId: ['', [Validators.required], [this.userNameAsyncValidator]],
      userName:['',[Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      permissions:['',],
      database_permissions:['',],

    });
  }
  ngOnInit(){

  }

}
