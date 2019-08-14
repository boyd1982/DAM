import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, ValidationErrors, FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../pojo/user";
import {Observable, Observer} from "rxjs";
import {CommonService} from "../../../service/common.service";
import {ModuleService} from "../../../service/module.service";
import {DataBase} from "../../../pojo/database";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-adddatabase',
  templateUrl: './adddatabase.component.html',
  styleUrls: ['./adddatabase.component.css']
})
export class AdddatabaseComponent implements OnInit {

  validateForm: FormGroup;
  selectedDatabaseType: string;//选择的数据库类型
  newDatabase = new DataBase();
  addSuccess: boolean = true;//是否添加成功
  temp: any;
  list = [
    {"key": 1,"title": "PMS"},
    {"key": 2,"title": "ERP"},
    {"key": 3,"title": "营销"}
  ]
  @Output() addMsg = new EventEmitter<number>();


  //提交表单按钮
  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    this.newDatabase["database_type"] = value.database_type;
    this.newDatabase["module_name"] = value.module_name;
    this.newDatabase["user_name"] = value.userName;
    this.newDatabase["password"] = value.password;
    this.newDatabase["ip_address"] = value.ipAddress;
    this.newDatabase["port"] = value.port;
    this.newDatabase["db_name"] = value.db_name;
    this.newDatabase["sid"] = value.sid;

    this.moduleService.newDatabase(this.newDatabase)
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
      this.moduleService.moduleDetail(control.value)
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



  constructor(private fb: FormBuilder, private moduleService:ModuleService) {
    this.validateForm = this.fb.group({
      database_type:['',],
      module_name: ['', [Validators.required], [this.userNameAsyncValidator]],
      userName:['',[Validators.required]],
      password: ['', [Validators.required]],
      ipAddress: ['', [Validators.required]],
      port:['', [Validators.required]],
      db_name:['',],
      sid:['',],
      type:['',],

    });
  }
  ngOnInit(){

  }
}
