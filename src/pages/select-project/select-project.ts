import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Company } from '../../modals/company/company.modal';
import { AppState } from '../../app/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../modals/project/project.modal';
import * as fromUser from "../../user/reducer/user.reducer";
import * as ProjectActions from "../../user/projects/actions/project.actions";
import * as CompanyActions from "../../user/companies/actions/company.actions";
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the SelectProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-project',
  templateUrl: 'select-project.html',
})
export class SelectProjectPage {
  selectProjectForm: FormGroup;
  companies$: Observable<Company[]>;
  projects$: Observable<Project[]>;
  constructor(public navCtrl: NavController, private store: Store<AppState>, public navParams: NavParams, private fb: FormBuilder) {
    this.createForm();
    this.selectProjectForm.get('company').valueChanges.subscribe(company => {
      this.store.dispatch(new CompanyActions.SelectCompany(company));
      this.updateProjects(company);
    });
    this.companies$ = store.select(fromUser.getCompanies);
  }
  updateProjects(company: Company) {
    this.projects$ = this.store.select(fromUser.getProjects).filter(projects => projects.every(p => company.projectIds.some(cpId => cpId === p.projectId)));
  }
  createForm() {
    this.selectProjectForm = this.fb.group({
      company: [null, Validators.required],
      project: [null, Validators.required]
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectProjectPage');
  }
  selectProject() {
    this.store.dispatch(new ProjectActions.SelectProject(this.selectProjectForm.get('project').value));
    this.navCtrl.setRoot(TabsPage);
  }
  companyCompareFn(c1: Company, c2: Company) {
    return c1 && c2 ? c1.companyId === c2.companyId : c1 === c2;
  }
  companyProjectFn(p1: Project, p2: Project) {
    return p1 && p2 ? p1.projectId === p2.projectId : p1 === p2;
  }
}
