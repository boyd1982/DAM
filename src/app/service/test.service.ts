import { Injectable } from '@angular/core';
// import {InMemoryDbService} from 'angular-in-memory-web-api'
import {User,LoginUser} from '../pojo/user'
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TestService{
  constructor (private http: HttpClient){};
  private userlistUrl = "http://219.216.69.63:5000/admin/userlist"
  userList(): Observable<User []>{
    // const userlistUrl = SERVERADDRESS+'/admin/userlist';
    console.log(this.userlistUrl);
    return this.http.get<User []>(this.userlistUrl);
  }


}
