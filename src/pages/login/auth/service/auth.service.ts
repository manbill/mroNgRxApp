import { User } from './../../../../modals/user/user.modal';
import { MroApiProvider } from './../../../../providers/api/api';
import { Authenticate } from './../authenticate';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor(private http: Http, private api: MroApiProvider) { }
  login(auth: Authenticate) {
    return this.http.post(this.api.mroApiEntities.loginApi, auth)
      .map(res => res['data'] as User);
  }
}
