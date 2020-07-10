import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from "../../models/user/profile";
import {ApiEndpoints} from "../../commons/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getUserProfile(): Observable<Profile> {
    try {
      return this.http.get<Profile>(ApiEndpoints.ProfileEndpoints.userProfile)
    } catch (error) {
      console.error(error);
    }
  }

  editProfile(updateForm): Observable<Profile> {
    try {
      return this.http.put<Profile>(ApiEndpoints.ProfileEndpoints.editProfile, updateForm)
    } catch (error) {
      console.error(error);
    }
  }

  uploadProfileImage(imageForm): Observable<Profile> {
    try {
      return this.http.post<Profile>(ApiEndpoints.ProfileEndpoints.setProfileImage, imageForm)
    } catch (error) {
      console.error(error);
    }
  }

  changeProfileImage(imageForm): Observable<Profile> {
    try {
      return this.http.put<Profile>(ApiEndpoints.ProfileEndpoints.changeProfileImage, imageForm)
    } catch (error) {
      console.error(error);
    }
  }

  deleteProfileImage(): Observable<Profile> {
    try {
      return this.http.delete<Profile>(ApiEndpoints.ProfileEndpoints.changeProfileImage)
    } catch (error) {
      console.error(error);
    }
  }
}
