import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {SwUpdate} from "@angular/service-worker";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private swUpdate: SwUpdate) {
    if ('serviceWorker' in navigator) {
      console.log('Service Worker is in navigator ');
      navigator.serviceWorker.register('../../node_modules/@angular/service-worker/' +
        'ngsw-worker.js').then(r => console.log('registered'));
    }
    if (swUpdate.isEnabled) {
      console.log('Service Worker Enabled ');
    }
  }

  ngOnInit(): void {
    this.authService.prepareUserData();
  }

}
