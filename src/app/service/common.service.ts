import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable} from "rxjs";
import {Loginstatus} from "../pojo/loginstatus"
import {LoginUser,User} from "../pojo/user"
import {SERVERADDRESS} from "../settings"

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
    const addUrl = SERVERADDRESS + '/admin/newuser';
    return this.http.post<number>(addUrl,user,{withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe();
  }

  //返回用户列表
  userList(): Observable<User []>{
    const userlistUrl = SERVERADDRESS+'/admin/userlist';
    return this.http.get<User []>(userlistUrl,{withCredentials: true});
  }

}
