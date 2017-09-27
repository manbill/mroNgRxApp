import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AppState } from '../../app/reducers/app.reducer';
import { Store } from '@ngrx/store';
import * as LoginActions from "../login/actions/login.actions";
import { Login } from './actions/login.actions';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, private plt: Platform, private fb: FormBuilder, private store: Store<AppState>, public navParams: NavParams) {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      userName: ['10700510', Validators.required],
      password: ['123456', Validators.required]
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    if (this.loginForm.valid) {
      console.log(this.store)
      this.store.dispatch(new LoginActions.Login(
        {
          deviceFlag: this.plt.is('ios') ? 1 : 2,
          userName: this.loginForm.get('userName').value,
          password: this.loginForm.get('password').value
        }
      ))
    }
  }
}
