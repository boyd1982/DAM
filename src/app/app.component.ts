import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from './service/common.service'
import {Loginstatus} from './pojo/loginstatus'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loginstatus: Loginstatus;
  isLogged: boolean;//是否登录
  isCollapsed = false;
  index = 0;
  tabs = [];
  loginVisible = false;//登录模态框可见性
  loginFooter = [
    {
      show: false,
    }
  ];
  isVisible = false;//用户信息模态框可见性
  constructor(private router:Router) { }
  ngOnInit() {

    // this.commonService.getLoginInfo()
    //   .subscribe(loginstatus=>{
    //     this.loginstatus= loginstatus;
    //     console.log(this.loginstatus);
    //     this.isLogged = (this.loginstatus.status == "success") ;
    //   })
    this.tabs.push("用户管理后台");
    this.router.navigateByUrl("/admin");

  }
  closeTab(tab: string): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  newTab(tab: string): void {

    if (this.tabs.indexOf(tab) == -1)//若一个元素不在数组中，将返回indexOf函数将返回-1，此部分限制每个标签只能出现一次
    {
      this.tabs.push(tab);
      console.log(this.tabs)
      this.index = this.tabs.length - 1;

    }else{
      this.index = this.tabs.indexOf(tab);
      // this.index = 1;
    }

  }
  //显示用户信息模态框
  showUserInfo(): void{
    this.isVisible= true;
  }
  showLogin():void{
    this.loginVisible= true;
  }
  //用户信息模态框中点击确定
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  //用户信息模态框中点击取消
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  loginCancel(): void{
    this.loginVisible= false;
  }
  getLoginMsg(msg){
    this.loginstatus = msg;
    this.isLogged = (msg['status'] == 1);
  }

}
