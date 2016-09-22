import {Nav, Loading, LoadingController, NavController} from 'ionic-angular';
import {Facebook, NativeStorage} from 'ionic-native';

import {Component} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import {DashboardPage} from '../dashboard/dashboard';
import {Header} from '../header/header';
import {SignupPage} from '../signup/signup';

import {MobileInput} from '../../components/mobile-input/mobile-input';
import {MobileError} from '../../components/mobile-error/mobile-error';


import {
	LoginComponent,
	TwAPIService, 
	GAService,
	User
} from 'tw-common/dist/app';

import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
	templateUrl: 'build/pages/login/login.html',
	pipes: [TranslatePipe],
	directives: [Header, MobileInput, MobileError]
})
export class LogInPage extends LoginComponent{

	laoding:Loading; 
	loadindSentence:string;
	errors = [
		{flag:this.credientials, label:"credientials"}, 
		{flag:this.error, label:"error"}
	];

	constructor(	
		//Own injections
		private nav: NavController, 
		private loadingController: LoadingController, 
		//Injections for LoginComponent	
		translate: TranslateService,
		twapi: TwAPIService, 
		builder: FormBuilder
	) {

		super(translate, twapi, builder);

		GAService.screenview("LOGIN");

		translate.get('logging-in').subscribe(
			sentence => this.loadindSentence = sentence
		);

		this.userLogged.subscribe(
			user => this.onSuccessLogging(user)
		);

		this.loginAttempt.subscribe(
			attempt => this.onLoggingAttempt(attempt)
		);
	}

	ngAfterViewInit(){
		
		// this.onSubmit(this.loginForm.value);
	}

	/**
	 * Displays SignupPage
	 */
	onSignup(){

		this.nav.push(SignupPage, {
			email:this.loginForm.controls["email"].value,
			password:this.loginForm.controls["password"].value
		});
	}


	/**
	 * Display loading animation when user attempt to log
	 * @param {boolean} attempt
	 */
	private onLoggingAttempt(attempt:boolean){
		if(attempt === true){
			/**
			 * We can't present a loader twice. Seams like dismiss() destroys it.
			 * @see https://github.com/Toolwatchapp/tw-mobile/issues/41
			 */
			this.laoding = this.loadingController.create({content: this.loadindSentence})
			this.laoding.present();
		}else{
			setTimeout(()=>{
				this.laoding.dismiss();
			}, 1000);
		}
	}

	/**
	 * Go to the dashboard and store API key
	 * @param {User} user
	 */
	private onSuccessLogging(user:User){
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
}