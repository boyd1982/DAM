import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVERADDRESS} from '../settings';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QualityService {

  constructor(private http: HttpClient) { }

  // 返回当前所有模块的状态
  qualityStatus(): Observable<any> {
    const qualitystatusUrl = SERVERADDRESS + '/quality/status';
    return this.http.get(qualitystatusUrl, {withCredentials: true});
  }
  // 返回当前指定模块的状态
  moduleQualityStatus(module: any): Observable<any> {
    const moduleQualityStatusUrl = SERVERADDRESS + '/quality/module_status';
    return this.http.post(moduleQualityStatusUrl, module,
      {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  // 返回所有评估历史记录
  datetimeList(module: any): Observable<any> {
    const datetimeListUrl = SERVERADDRESS + '/report/datetimelist';
    return this.http.post(datetimeListUrl, module, {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  // 停止当前模块的检测
  stopService(module: any): Observable<any> {
    const stopUrl = SERVERADDRESS + '/quality/stop';
    return this.http.post(stopUrl, module, {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  // 开始当前模块的检测，resume=0为重新开始，1为继续开始
  startService(module: any): Observable<any> {
    const startUrl = SERVERADDRESS + '/quality/assess';
    return this.http.post(startUrl, module, {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

}
