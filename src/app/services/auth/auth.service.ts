import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/user/user";
import {Favorite} from "../../models/media/favorite";
import {UserData} from "../../commons/classes/user-data";
import {ApiEndpoints} from "../../commons/api-endpoints";
import {Router} from "@angular/router";
import {Role} from "../../commons/enums/role.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // public data: will be used in the entire project
  public username: string;
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public favoriteList: BehaviorSubject<Favorite> = new BehaviorSubject<Favorite>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  pUserData(): Observable<UserData> {
    try {
      return this.http.get<UserData>(ApiEndpoints.AuthEndpoints.userMainData);
    } catch (error) {
      console.error(error);
    }
  }

  loginAdmin(emailLoginDto: any): Observable<{ accessToken: string, user: User }> {
    try {
      return this.http.post<{ accessToken: string, user: User }>
      (ApiEndpoints.AuthEndpoints.loginAdmin, emailLoginDto);
    } catch (err) {
      console.error(err);
    }
  }

  prepareUserData() {
    if (this.isLoggedIn()) {
      this.pUserData().subscribe((userData: UserData) => {
        this.currentUser.next(userData.user);
        this.favoriteList.next(userData.favorite);
        this.username = userData.profile.firstName + ' ' + userData.profile.lastName;
      })
    }


  }




  getSystemUsers():Observable<User[]>{
    try {
      return this.http.get<User[]>(ApiEndpoints.AuthEndpoints.systemUsers);
    } catch (error) {
      console.error(error);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  verifyEmail(token: string) {
    try {
      return this.http.get(`${ApiEndpoints.AuthEndpoints.emailVerify}/${token}`);
    } catch (error) {
      console.error(error);
    }
  }

  forgotPassword(email: string) {
    try {
      return this.http.get(`${ApiEndpoints.AuthEndpoints.emailForgotPassword}/${email}`);
    } catch (error) {
      console.error(error);
    }
  }

  resetPassword(resetPasswordDto: any) {
    try {
      return this.http
        .post<any>(`${ApiEndpoints.AuthEndpoints.emailResetPassword}`, resetPasswordDto);
    } catch (error) {
      console.error(error);
    }
  }

  userLogout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/auth/login'])
  }

  isAdmin(): boolean {
    return this.currentUser.value.roles.some(role => role === Role.ADMIN);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  showAccountVerificationAlert(): boolean {
    return this.isLoggedIn() && this.currentUser.value.isEmailVerified;
  }

  editUserRoles(userId: number, roles: Role[]): Observable<User> {
    try {
      return this.http
        .put<User>(`${ApiEndpoints.AuthEndpoints.editUserRoles}/${userId}`, roles);
    } catch (error) {
      console.error(error);
    }
  }

  deleteUserAccount(userId: number) {
    try {
      return this.http
        .delete<any>(`${ApiEndpoints.AuthEndpoints.deleteUserAccount}/${userId}`);
    } catch (error) {
      console.error(error);
    }
  }

}
