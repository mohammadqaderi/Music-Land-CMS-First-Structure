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
      console.log('serviceWorker enabled');
      navigator.serviceWorker.register('../../node_modules/@angular/service-worker/ngsw-worker.js').then(r => console.log('registered'));
    }
    if (this.swUpdate.isEnabled) {
      console.log('serviceWorker enabled');
      this.swUpdate.available.subscribe(() => {

        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }

      });

    }
  }

  ngOnInit(): void {
    this.authService.prepareUserData();
  }

}
