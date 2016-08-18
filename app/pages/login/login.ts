import {Component, ViewChild} from '@angular/core';
import {Nav, Loading, NavController} from 'ionic-angular';
import {LoginComponent} from 'tw-common/dist/app/directives/login/login.component';
import {TwAPIService} from 'tw-common/dist/app/services/twapi.service';
import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {Http, HTTP_PROVIDERS, Headers}  from '@angular/http';
import {DashboardPage} from '../dashboard/dashboard';
import {Header} from '../header/header';
import {SignupPage} from '../signup/signup';
import {Facebook} from 'ionic-native';
import {GAService} from 'tw-common/dist/app/services/ga.service';
import { NativeStorage } from 'ionic-native';
import { Wove } from 'aspect.js/dist/lib/aspect';

import {  
  FORM_DIRECTIVES,  
  REACTIVE_FORM_DIRECTIVES,  
  FormBuilder,  
  FormGroup  
} from '@angular/forms';

// @Wove()
@Component({
	templateUrl: 'build/pages/login/login.html',
	pipes: [TranslatePipe],
	directives: [Header]
})
export class LogInPage extends LoginComponent {

	laoding:Loading; 

	constructor(private nav: NavController, translate: TranslateService,
		twapi: TwAPIService, builder: FormBuilder) {
		super(translate, twapi, builder);

		GAService.screenview("LOGIN");

		translate.get('logging-in').subscribe(
			sentence => {
				this.laoding = Loading.create({content: sentence});
			}
		);

		this.userLogged.subscribe(
			user => {
				this.laoding.dismiss();
				this.nav.setRoot(DashboardPage, {
					user:user
				});
				NativeStorage.setItem('tw-api', {key: user.key})
				.then(
				  () => console.log('Stored item!'),
				  error => console.error('Error storing item', error)
				);
			}
		);

		this.loginAttempt.subscribe(
			attempt => {

				if(attempt === true){
					this.nav.present(this.laoding);
				}else{
					setTimeout(()=>{
						this.laoding.dismiss();
					}, 1000);
				}
			}
		);
	}

	onSignup(){

		this.nav.push(SignupPage, {
			email:this.email.value,
			password:this.password.value
		});
	}

}
