export class Project {
  activeFlag: string;
  areaCode: string;
  areaCodeName: string;
  attributeGroupid: string;
  beginDate: string;
  contactAddress: string;
  contactMail: string;
  contactNum: string;
  contractNo: string;
  createBy: string;
  createOn: string;
  currPage: number;
  filemappingIdArr: number[];
  isSel: string;
  lastUpdBy: string;
  lastUpdOn: string;
  machineAmount: number;
  machineType: string;
  machineTypeName: string;
  materiaIdArray: number[]
  materiaNumArray: string[];
  materialWorkTypeList: string;
  ownerName: string;
  pageSize: number;
  ProjRouneWbsDtoList: Array<ProjRouneWbsDto>
  ProjSpecialWbsDtoList: Array<ProjSpecialWbsDto>
  projectId: number;
  projectName: string;
  projectNo: string;
  projectProvince: string;
  projectStage: string;
  provinceId: string;
  quanlityWorkTypeList: string;
  receiveAddress: string;
  servicePhaseDate: string;
  servicePhaseWbsno: string;
  siteManager: string;
  techWorkTypeList: string;
  type: string;
  userId: number;
  warrantMouth: number;
  warrantyDate: string;
  warrantyPhaseDate: string;
  warrantyPhaseWbsno: string;
  wbsNo: string;
  workPhaseDate: string;
  workPhaseWbsno: string;
  worktypeName: string;
}
export class ProjSpecialWbsDto {
  activeFlag: number;// 0
  createBy: string;//null
  lastUpdBy: string;// null
  ncrDesc: string;//"TEST技改"
  ncrNum: string;// "TESTCH000001"
  projectId: number;// 848
  specialWbsId: number;// 2676
  specialWbsNum: number;// null
  typeId: number;//2
}
export class ProjRouneWbsDto {
  accetpanceDate: string;// null
  accetpanceDateString: string;// "2012-12-29"
  activeFlag: string;// null
  createBy: string;// null
  lastUpdBy: string;// null
  projectId: number;// 848
  projectStage: string;// "工程阶段"
  routineNcrWbs: string;// "Z-150210025BFB-GC-NC-999"
  routineOverhaulWbs: string;// "jgcgwbs"
  routineWbs: string;// "Z-150210025BFB-GC"
  routineWbsId: number;// 2707
}
