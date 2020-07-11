import {Component, OnInit} from '@angular/core';
import {SwPush, SwUpdate} from "@angular/service-worker";
import {NotificationPayloadDto} from "../../../../../models/notification/classes/notification-payload.dto";
import {NotificationsService} from "../../../../../services/notifications/notifications.service";
import {ApiEndpoints} from "../../../../../commons/api-endpoints";


@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  sub: PushSubscription;
  notificationPayloadDto: NotificationPayloadDto = new NotificationPayloadDto();

  constructor(
    private notifyService: NotificationsService,
    private swUpdate: SwUpdate,
    private swPush: SwPush) {
  }


  ngOnInit() {

  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: ApiEndpoints.vapidKeys.publicKey
    })
      .then(sub => {
        this.sub = sub;
        console.log("Notification Subscription: ", sub);
        this.notifyService.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err => console.log('Could not send subscription object to server, reason: ', err)
        );
      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  sendNotification() {
    this.notifyService.sendNotification(this.notificationPayloadDto).subscribe(res => {
      console.log(res);
    });
  }

}
