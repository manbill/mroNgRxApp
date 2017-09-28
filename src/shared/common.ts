import { Action } from '@ngrx/store';
export interface IFetchDataAction {
  syncAction: string;
}
export const LOAD_PAGENATION = 10;//数据库获取的item数目
export type Type2InitialActionName<S> = {
  [t in keyof S]: {
    type: t;
    initActionName: string;
  }
}
