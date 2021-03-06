import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogInPage } from './login';

import { Facebook } from '@ionic-native/facebook';
import {
  LoginComponentModule
} from 'tw-core';

import { HeaderComponentModule } from './../../components/header/header.module';
import { FooterComponentModule } from './../../components/footer/footer.module';
import { MobileErrorComponentModule } from './../../components/mobile-error/mobile-error.module';
import { MobileInputComponentModule } from './../../components/mobile-input/mobile-input.module';
import { TranslateModule } from '@ngx-translate/core';

import { AppModule } from './../../app/app.module';

@NgModule({
  declarations: [
    LogInPage
  ],
  imports: [
    IonicPageModule.forChild(LogInPage),
    LoginComponentModule,
    HeaderComponentModule,
    FooterComponentModule,
    MobileErrorComponentModule,
    MobileInputComponentModule,
    AppModule.translateModule
  ],
  exports: [LogInPage]
})
export class LoginPageModule { }