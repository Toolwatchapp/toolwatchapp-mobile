import {Component, forwardRef} from '@angular/core';
import {Nav, Loading, NavController, NavParams} from 'ionic-angular';
import {TwAPIService} from 'tw-common/dist/app/services/twapi.service';
import {BlogPost} from 'tw-common/dist/app/models/blog-post.model';
import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { HTTP_PROVIDERS }  from '@angular/http';
import {Header}  from '../header/header';
import {Footer} from '../footer/footer';
import {GAService} from 'tw-common/dist/app/services/ga.service';


@Component({
	templateUrl: 'build/pages/about/about.html',
	pipes: [TranslatePipe],
	directives: [forwardRef(() => Footer), Header]
})
export class AboutPage {

	user:any;

	constructor(private nav: NavController, private navParams: NavParams,
		private twapi: TwAPIService, private translate: TranslateService) {

        GAService.screenview("ABOUT");

		this.user = this.navParams.get('user');


	}
}
