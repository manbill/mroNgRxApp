import { Project } from '../project/project.modal';
import { Company } from '../company/company.modal';
export class User{
  areaCode : string;
  areaName : string;
  certificateType : string;
  company : Company;
  companyName : string;
  currPage : number;
  department : number;
  departmentName : string;
  email : string;
  filemappingIdArr : string;
  id : number;
  ifDepartmentSupport : number;
  job : string;
  jobName : string;
  jobType : string;
  jobTypeName : string;
  list : string[];
  name : string;
  pageSize : number;
  password : string;
  projectId : number;
  projectList : Project[];
  realname : string;
  roleNames : string;
  selProjectIds : string;
  selProjects : string;
  token : string;
  typechname : string;
  userRole : string;
  userType : number;
}
