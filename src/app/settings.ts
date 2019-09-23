import {keyframes} from '@angular/animations';
/**
 * Created by lenovo on 2019/7/12.
 */
export const SERVERADDRESS = 'http://219.216.69.63:5000';
export const ROLE_DICTIONARY: { [key: string]: any } = {
  0: '超级管理员',
  5: '数据库管理员',
  10: '普通用户'
};
export const VALUE_ROLE_DICTIONARY: { [key: string]: any } = {
  超级管理员: '0',
  数据库管理员: '5',
  普通用户: '10'
};
export const JOBNAME_DICTIONARY: { [key: number]: string} = {
  0: '数据资产目录检测',
  1: '数据完整性检测',
  2: '表冗余检测',
  3: '一致性检测',
}
export const JOBDESCRIPTION_DICTIONARY: { [key: number]: string} = {
  0: '对该数据库的总体数据资产结构进行检测分析',
  1: '检测数据库中空行、空列以及空表的数量及分布',
  2: '对数据库中存在的冗余表进行自动检测，给出表的相似度，用于发现疑似冗余表',
  3: '对数据库中不同表间的数据一致性进行检测',
}
