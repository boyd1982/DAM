import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable} from "rxjs";
import {Loginstatus} from "../pojo/loginstatus"
import {LoginUser, User, DeleteUser} from "../pojo/user"
import {SERVERADDRESS} from "../settings"
import {ValidationErrors} from "@angular/forms";
import {tap} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) { }

  //用户登录
  userLogin(user: LoginUser): Observable<Loginstatus>{
    const loginUrl = SERVERADDRESS + '/auth/login';
    return this.http.post<Loginstatus>(loginUrl,user,{withCredentials: true,headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
    );
  }

  //添加用户
  newUser(user:User): Observable<number>{
    const addUrl = SERVERADDRESS + '/user/create';
    return this.http.post<number>(addUrl,user,{withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe();
  }

  //返回用户列表
  userList(): Observable<User []>{
    const userlistUrl = SERVERADDRESS+'/user/list';
    return this.http.get<User []>(userlistUrl,{withCredentials: true});
  }

  //判断用户名是否存在
  userIdExist(userid: string): Observable<any>{
    const checkuseridUrl = SERVERADDRESS+'/auth/queryuser/'+ userid;
    return this.http.get<any>(checkuseridUrl, {withCredentials: true}).pipe(
    );
  }
  //删除用户服务
  deleteUser(user: DeleteUser): Observable<any>{
    const deleteuserUrl = SERVERADDRESS + '/user/delete';
    return this.http.post<any>(deleteuserUrl,user,{withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe();
  }
  //更新用户信息
  updateUser(user: any): Observable<any>{
    const updateuserUrl = SERVERADDRESS + '/user/update';
    return this.http.post<any>(updateuserUrl,user,{withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe();
  }
  //获取数据库列表
  moduleList():Observable<any>{
    const modulelistUrl = SERVERADDRESS + '/module/list';
    return this.http.get<any>(modulelistUrl, {withCredentials: true});
  }
}
