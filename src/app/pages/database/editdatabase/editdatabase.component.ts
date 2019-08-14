import { Component, OnInit } from '@angular/core';
import {ModuleService} from "../../../service/module.service";
import {NzMessageService} from "ng-zorro-antd";
import {DataBase} from "../../../pojo/database";

@Component({
  selector: 'app-editdatabase',
  templateUrl: './editdatabase.component.html',
  styleUrls: ['./editdatabase.component.css']
})
export class EditdatabaseComponent implements OnInit {
  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  database: DataBase = new DataBase();
  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item['module_name']] = {
        edit: false,
        data: { ...item },//...运算符是将item打散，作为参数传入
      };
    });
  }
  refresh(){
    this.moduleService.moduleList()
      .subscribe(
        (res)=>{
          this.listOfData=res['module_list'];
          this.updateEditCache();
        }
      );

  }
  startEdit(module_name: string): void {
    this.editCache[module_name].edit = true;
  }

  cancelEdit(module_name: string): void {
    const index = this.listOfData.findIndex(item => item.module_name === module_name);
    this.editCache[module_name] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }
  saveEdit(module_name: string): void {
    const index = this.listOfData.findIndex(item => item.module_name === module_name);
    this.moduleService.updateDatabase(this.editCache[module_name].data)
      .subscribe(
        (res)=>{
          if (res['status']==1){
            this.message.create("success", `用户信息更新成功`);
            Object.assign(this.listOfData[index], this.editCache[module_name].data);
            this.editCache[module_name].edit = false;
          }else {
            this.message.create("error","用户信息更新失败！");
          }
        }
      )

  }
  deleteRow(module_name: string): void {
    this.database.module_name = module_name;
    this.moduleService.deleteDatabase(this.database)
      .subscribe(
        (res)=>{
          if (res['status']==1){
            this.message.create("success", `用户删除成功`);
            this.listOfData = this.listOfData.filter(d => d.module_name !== module_name);
          }else {
            this.message.create("error","用户删除失败！");
          }
        }
      )
  }
  constructor(private moduleService:ModuleService,private message: NzMessageService) { }

  ngOnInit() {
    this.moduleService.moduleList().subscribe(
      (res) => {
        this.listOfData = res['module_list'];
        this.updateEditCache();
      }
    )
  }
}
