/// <reference path="typings/angular2/angular2.d.ts" />

import {
  Component,
  View,
  bootstrap,
} from "angular2/angular2";

import {
  GoogleCalendarAuth
} from './google-calendar-auth';

@Component({
  selector: 'app'
})
@View({
  templateUrl: 'app.html',
  directives: [GoogleCalendarAuth]
})
class App{}

bootstrap(App);
