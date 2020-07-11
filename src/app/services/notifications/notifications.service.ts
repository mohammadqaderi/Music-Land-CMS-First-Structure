import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiEndpoints} from "../../commons/api-endpoints";
import {Observable} from "rxjs";
import {NotificationPayloadDto} from "../../models/notification/classes/notification-payload.dto";

@Injectable({
  providedIn: "root"
})
export class NotificationsService {

  constructor(private http: HttpClient) {
  }

  getAllSubscribers() {
    try {
      return this.http.get(ApiEndpoints.NotificationEndpoints.Subscribers);
    } catch (err) {
      console.error(err);
    }
  }

  addPushSubscriber(sub: any): Observable<any> {
    try {
      return this.http.post<any>(ApiEndpoints.NotificationEndpoints.newSubscriber, sub);
    } catch (err) {
      console.error(err);
    }
  }

  sendNotification(notificationPayloadDto: NotificationPayloadDto): Observable<any> {
    try {
      return this.http.post<any>(ApiEndpoints.NotificationEndpoints.sendNotification, notificationPayloadDto);
    } catch (err) {
      console.error(err);
    }
  }
}
