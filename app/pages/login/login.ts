import {Component} from '@angular/core';
import {LoginComponent} from 'tw-common/dist/app/directives/login/login.component';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators}  from '@angular/common';
import {TwAPIService} from 'tw-common/dist/app/services/twapi.service';
import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {Http, HTTP_PROVIDERS, Headers}  from '@angular/http';


@Component({
	templateUrl: 'build/pages/login/login.html',
	// styleUrls: ['build/pages/login/login.css'],
	pipes: [TranslatePipe],
	providers: [TwAPIService, HTTP_PROVIDERS, LoginComponent],
})
export class LogInPage extends LoginComponent {
	constructor(translate: TranslateService,
		twapi: TwAPIService, builder: FormBuilder) {
		super(translate, twapi, builder);

		this.userLogged.subscribe(
			event => console.log("logged", event)
		);
	}
}
