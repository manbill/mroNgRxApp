import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Db } from '../../providers/db/db';
import { tableNames } from '../../providers/db/mro.tables';
import { MroUtils } from '../../shared/utils';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/reducers/app.reducer';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private db: Db, private store: Store<AppState>) {

  }
}
