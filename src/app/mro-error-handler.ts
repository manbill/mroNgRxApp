import { IonicErrorHandler, AlertController } from "ionic-angular";

export class MroErrorHandler extends IonicErrorHandler {
  constructor(private alertCtrl: AlertController) { super() }
  handleError(errors: MroError[]) {
    if (errors.length > 0) {
      const alter = this.alertCtrl.create({
        title: '同步信息出错',
        subTitle: '错误信息：',
        message: `${errors.map(e => e.errorMessage).join(';<br/>')}`,
        buttons: [
          {
            text: '确定',
            handler: () => {
              console.log('错误处理完成');
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('错误处理，点击了取消按钮');
            }
          }
        ]
      })
    }
  }
}
export class MroError {
  errorCode: number;
  errorMessage: string;
  errorReason: any;
}
