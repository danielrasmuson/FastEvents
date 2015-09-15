/// <reference path="typings/angular2/angular2.d.ts" />

import {
  Component,
  View,
} from "angular2/angular2";

@Component({
  selector: 'google-calendar-auth'
})
@View({
  template: `<a href="{{url}}" target="popup">Grant Access to Google Calendar</a>`
})
export class GoogleCalendarAuth{
  url: string;

  constructor(){
    var REDIRECT_URI = "http%3A%2F%2Flocalhost%3A3000%2Fgooglecalendar%2Fauth";
    this.url = `https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=1011069552027-p8olaid6s9fvcc5dht3mqa0mu8o412kk.apps.googleusercontent.com&redirect_uri=${REDIRECT_URI}`
  }

}
