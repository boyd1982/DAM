import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../../../service/module.service';
import {NzMessageService, properties} from 'ng-zorro-antd';
import {QualityService} from '../../../service/quality.service';
import {JOBDESCRIPTION_DICTIONARY, JOBNAME_DICTIONARY} from '../../../settings';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  statModalInfo: { [key: string]: any } = {};
  statusList: any;
  datetimeList: any;
  datetimeListAll: any;
  moduleStatus: { [key: string]: any } = {};
  iconType: { [key: string]: any } = {};
  statusDescription: { [key: string]: any } = {};
  jbdict: any;
  jddict: any;
  neverStatus: any;
  workingStatus: any;
  finishedStatus: any;
  module: { [key: string]: any } = {};
  moduleS: { [key: string]: any } = {};
  paramsStop: { [key: string]: any } = {};
  paramsStart: { [key: string]: any } = {};
  timer: any;
  timerAll: any;
  jobs: any;

  constructor(private qualityService: QualityService, private message: NzMessageService) { }

  // 更新当前模块状态
  updateModuleStatus() {
    for (const item of this.statusList) {
      if (item.status === 1) {
        this.moduleStatus[item.module_name] = true;
      } else {
        this.moduleStatus[item.module_name] = false;
      }
    }
  }
  // 更新图标状态
  updateIconStatus() {
    for (const item of this.statusList) {
      if (this.moduleStatus[item.module_name]) {
        this.iconType[item.module_name] = 'poweroff';
      } else {
        this.iconType[item.module_name] = 'caret-right';
      }
    }
  }
  // 更新描述信息状态
  updateStatusDescription() {
    for (const item of this.statusList) {

      if (this.moduleStatus[item.module_name]) {

        this.statusDescription[item.module_name] = '当前数据库正在评估流程中，请耐心等待评估流程结束；';
      } else {
        if (Object.keys(this.datetimeListAll).indexOf(item.module_name) === -1) {
          this.statusDescription[item.module_name] = '该数据库尚未被评估过，点击按钮开始数据质量评估流程';
        }  else {
          this.statusDescription[item.module_name] = '共评估' + this.datetimeListAll[item.module_name].length + '次;' +
              '最近一次评估时间为:' + this.datetimeListAll[item.module_name][0];
        }

      }
    }
  }
  // 点击开始按钮事件
  handleStartClick(moduleName: string, moduleStatus: number, status: boolean) {
    // 如果当前为正在运行的状态
    if (status) {
      this.paramsStop.module_name = moduleName;
      this.qualityService.stopService(this.paramsStop).subscribe(
        (res) => {
          if (res.status === 1) {
            this.moduleStatus[moduleName] = !status;
            this.updateIconStatus();
            this.updateStatusDescription();
            // this.updateDateTimeList();
          } else {
            this.message.create('error', res.Err_info);
          }
        }
      );
    } else {
      this.paramsStart.module_name = moduleName;
      // 若为非正常停止
      if (moduleStatus === 3 ) {
        this.paramsStart.resume = 1;
        // 正常停止
      } else {
        this.paramsStart.resume = 0;
      }
      this.qualityService.startService(this.paramsStart).subscribe(
        () => {
          this.moduleStatus[moduleName] = !status;
          this.updateIconStatus();
          this.updateStatusDescription();
          // this.updateDateTimeList();
          // this.updateModuleStatus();
        }
      );
    }
    this.updateDateTimeList();
  }
  // 点击统计按钮事件
  handleStatClick(module: any) {

    this.statModalInfo.jobs = module.jobs;
    this.statModalInfo.status = module.status;
    this.statModalInfo.module_name = module.module_name;
    this.module.module_name = module.module_name;
    this.module.result_name = 'integrity';
    this.moduleS.module_name = module.module_name;
    this.qualityService.datetimeList(this.module).subscribe(
      (res) => {
        if (res.status === 1) {
          this.statModalInfo.isVisible = true;
          this.datetimeList = res.result_list[this.module.module_name];
          this.updateNeverStatus();
          this.updateWorkingStatus();
          this.updateFinishStatus();
        } else {
          this.message.create('error', '获取数据失败！');
        }
      }
    );

    this.timer = setInterval(() => {
      this.qualityService.moduleQualityStatus(this.moduleS).subscribe(
        (res) => {
          this.jobs = res.module_status.jobs;
          this.statModalInfo.jobs = res.module_status.jobs;
        }
      );
      // this.updateModuleStatus();
      // this.updateIconStatus();
      // this.updateStatusDescription();
    }, 500);
  }
  handleCancel() {
    this.statModalInfo.isVisible = false;
    if (this.timer) {
      clearInterval(this.timer); // 销毁定时器
    }
  }
  handleOk() {
    this.statModalInfo.isVisible = false;
    if (this.timer) {
      clearInterval(this.timer); // 销毁定时器
    }
  }
  updateNeverStatus() {
    if (this.datetimeList == null && (!this.moduleStatus[this.module.module_name])) {
      this.neverStatus = true;
    } else {
      this.neverStatus = false;
    }
    console.log(this.neverStatus);
  }
  updateWorkingStatus() {
    if (this.moduleStatus[this.module.module_name]) {
      this.workingStatus = true;
    } else {
      this.workingStatus = false;
    }
    console.log(this.workingStatus);
  }
  updateFinishStatus() {
    if (this.datetimeList != null && (!this.moduleStatus[this.module.module_name])) {
      this.finishedStatus = true;
    } else {
      this.finishedStatus = false;
    }
    console.log(this.finishedStatus);
  }
  updateDateTimeList() {
    this.module.module_name = '';
    this.module.result_name = 'integrity';
    this.qualityService.datetimeList(this.module).subscribe(
      (res) => {
        if (res.status === 1) {
          this.datetimeListAll = res.result_list;
          // this.updateModuleStatus();
          // this.updateStatusDescription();
          // this.updateIconStatus();
        } else {
          this.message.create('error', '获取数据失败！');
        }
      });
  }

  ngOnInit() {
    this.jbdict = JOBNAME_DICTIONARY;
    this.jddict = JOBDESCRIPTION_DICTIONARY;
    // 获取模块状态信息列表
    this.qualityService.qualityStatus().subscribe(
      (res) => {
        this.statusList = res.status;
        this.module.module_name = '';
        this.module.result_name = 'integrity';
        this.qualityService.datetimeList(this.module).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          (res) => {
            if (res.status === 1) {
              this.datetimeListAll = res.result_list;
            } else {
              this.message.create('error', '获取数据失败！');
            }
            this.updateModuleStatus();
            this.updateStatusDescription();
            this.updateIconStatus();
          }
        );


      }
    );

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    if (this.timerAll) {
      clearInterval(this.timerAll); // 销毁定时器
    }
  }
}
