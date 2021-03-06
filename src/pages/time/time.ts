import { Loading, NavController, LoadingController, NavParams, Platform, IonicPage } from 'ionic-angular';

import { Component, ElementRef } from '@angular/core';

import {
    TwAPIService,
    ClockComponent,
    User,
    AnalyticsService
} from 'tw-core';

import { TranslateService } from '@ngx-translate/core';

@IonicPage({
  name: 'TimePage'
})
@Component({
    templateUrl: 'time.html'
})
export class TimePage extends ClockComponent {

    //So I can use the math lib in the view
    //for rounding milliseconds
    Math: any = Math;
    intervalTime: number = 100;
    offset: number;
    user: User;
    background: string = "time-background";
    loading: Loading;
    twelveHoursFormat: boolean = true;
    interval: any;


    constructor(
        //own injection
        private nav: NavController,
        private navParams: NavParams,
        private twapi: TwAPIService,
        private translate: TranslateService,
        private loadingController: LoadingController,
        private platform: Platform,
        private analytics: AnalyticsService,
        //injection for ClockComponent
        elementRef: ElementRef
    ) {

        super(elementRef);

        this.loading = this.loadingController.create({
            content: this.translate.instant('sync'),
            dismissOnPageChange: false
        });

        this.analytics.screenview("TIME");

        this.user = this.navParams.get('user');

        platform.ready().then(() => {
            this.platform.pause.subscribe(() => {
                console.log('[INFO] App paused');
                TwAPIService.resetTime();
                clearInterval(this.interval);
            });

            this.platform.resume.subscribe(() => {
                console.log('[INFO] App resumed');
                this.ngAfterViewInit();
            });
        });
    }

    ngAfterViewInit() {

        this.loading.present();

        this.twapi.accurateTime().then(
            date => {
                this.interval = setInterval(() => {
                    this.date = new Date(this.date.getTime() + this.intervalTime);
                    this.initLocalClocks();
                },
                    this.intervalTime
                );

                setTimeout(() => {
                    this.loading.dismiss();
                });

                this.date = date;
                this.initLocalClocks();
                this.offset = this.twapi.getOffsetTime();
            }
        );
    }

}
