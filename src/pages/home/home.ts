import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { tableNames } from '../../providers/db/mro.tables';
import { Db } from '../../providers/db/db';
import { AppState } from '../../app/reducers/app.reducer';
import { MroUtils } from '../../shared/utils';
import { Store } from '@ngrx/store';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private db: Db, private store: Store<AppState>) {

  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
