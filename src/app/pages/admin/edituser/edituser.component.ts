import {Component, OnInit, Input} from '@angular/core';
import {CommonService} from "../../../service/common.service";
import {ROLE_DICTIONARY} from "../../../settings";
import {NzMessageService} from "ng-zorro-antd";
import {User, DeleteUser} from "../../../pojo/user";


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})

export class EdituserComponent implements OnInit {
  selectedValue=10;
  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  @Input() newData: any[] = [];
  roleDict = ROLE_DICTIONARY;

  user = new DeleteUser();
  test: any = [];
  // checkOptions = [
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' },
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear' },
  //   { label: 'Orange', value: 'Orange' }
  // ];
  checkOptions = [];
  checkOptionsTemp=[];
  cOptionsTemp=[];
  checkOptionCache = [];

  constructor(private commonService:CommonService, private message: NzMessageService){}
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.user_id === id);
    for (const key of Object.keys(this.listOfData[index].user_permissions)){
      this.cOptionsTemp.push(key);
    }
    for (const item1 of this.checkOptionCache){
      if (this.cOptionsTemp.indexOf(item1)==-1){
        this.checkOptionsTemp.push({label:item1,value:item1,checked: false});
      }else{
        this.checkOptionsTemp.push({label:item1,value:item1,checked: true});
      }
    }
    this.cOptionsTemp = [];
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
      checkOptions:[...this.checkOptionsTemp],
      selectedRole:this.listOfData[index].user_role.toString()
    };
    this.checkOptionsTemp=[];
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.user_id === id);
    this.editCache[id].data['user_permissions']={};
    for (const item of this.editCache[id]['checkOptions']){
      if (item['checked']){
        this.editCache[id].data['user_permissions'][item['label']] = 1;
      }
    }
    this.editCache[id].data['user_role'] = Number(this.editCache[id].selectedRole);
    // Object.assign(this.listOfData[index], this.editCache[id].data);
    // this.editCache[id].edit = false;
    this.commonService.updateUser(this.editCache[id].data)
      .subscribe(
        (res)=>{
          if (res['status']==1){
            this.message.create("success", `用户信息更新成功`);
            Object.assign(this.listOfData[index], this.editCache[id].data);
            this.editCache[id].edit = false;
          }else {
            this.message.create("error","用户信息更新失败！");
          }
        }
      )

  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      for (const key of Object.keys(item.user_permissions)){
        this.cOptionsTemp.push(key);
      }
      for (const item1 of this.checkOptionCache){
        if (this.cOptionsTemp.indexOf(item1)==-1){
          this.checkOptionsTemp.push({label:item1,value:item1,checked: false});
        }else{
          this.checkOptionsTemp.push({label:item1,value:item1,checked: true});
        }
      }
      this.cOptionsTemp = [];
      //item["checkOptions"] = [...this.checkOptionsTemp];

      this.editCache[item.user_id] = {
        edit: false,
        data: { ...item },//...运算符是将item打散，作为参数传入
        // data:item
        checkOptions:[...this.checkOptionsTemp],
        selectedRole: item["user_role"].toString()
      };
      // this.checkOptionCache=[];
      this.checkOptionsTemp=[];
    });
  }

//删除用户信息
  deleteRow(id: string): void {
    this.user.user_id = id;
    this.commonService.deleteUser(this.user)
      .subscribe(
        (res)=>{
          if (res['status']==1){
            this.message.create("success", `用户删除成功`);
            this.listOfData = this.listOfData.filter(d => d.user_id !== id);
          }else {
            this.message.create("error","用户删除失败！");
          }
        }
      )
  }
  log(value: Object[]): void {
    console.log(value);
  }

  refresh(){
    this.commonService.userList()
      .subscribe(
        (res)=>{
          this.listOfData=res['user_list'];
          this.updateEditCache();
        }
      );

  }
  ngOnInit(): void {
    this.commonService.moduleList()
      .subscribe(
        (res)=>{
          this.checkOptions = res['module_list'];
          for (const item of this.checkOptions){
            this.checkOptionCache.push(item["module_name"]);
          }
          this.commonService.userList()
            .subscribe(
              (res1)=>{

                this.listOfData=res1['user_list'];
                this.updateEditCache();
              }
            );
        }
      )



  }
}
