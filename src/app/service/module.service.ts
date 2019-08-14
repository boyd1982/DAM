import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVERADDRESS} from "../settings";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }

  //添加新数据库
  newDatabase(database: any): Observable<any>{
    const newDatabaseUrl = SERVERADDRESS + "/module/create";
    return this.http.post<any>(newDatabaseUrl,database,{withCredentials: true,headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }
  //返回数据库列表
  moduleList():Observable<any>{
    const modulelistUrl = SERVERADDRESS + '/module/list';
    return this.http.get<any>(modulelistUrl, {withCredentials: true});
  }
  //返回数据库信息
  moduleDetail(module_name: string):Observable<any>{
    const moduleDetailUrl = SERVERADDRESS + '/module/'+module_name;
    return this.http.get<any>(moduleDetailUrl,{withCredentials: true});
  }
  updateDatabase(database: any): Observable<any>{
    const updateDatabaseUrl = SERVERADDRESS + "/module/update";
    return this.http.post<any>(updateDatabaseUrl,database,{withCredentials: true,headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }
  deleteDatabase(database:any): Observable<any>{
    const deleteDatabaseUrl = SERVERADDRESS + "/module/delete"
    return this.http.post<any>(deleteDatabaseUrl,database, {withCredentials: true,headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }
}
