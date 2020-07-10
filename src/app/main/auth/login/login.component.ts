import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user/user";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailLoginDto: FormGroup;

  // special Case
  parentModalRef: BsModalRef;
  @ViewChild('invalidCredentials', {static: true}) invalidCredentials: TemplateRef<any>;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private modalService: BsModalService) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.emailLoginDto = this.fb.group({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  userLogin() {
    this.authService.loginAdmin(this.emailLoginDto.value)
      .subscribe((data: { accessToken: string, user: User }) => {
        const {accessToken} = data;
        localStorage.setItem('accessToken', accessToken);
        this.authService.prepareUserData();
        this.router.navigate(['/dashboard']);
      }, error => {
        this.openModal(this.invalidCredentials)
      })
  }

  openModal(template: TemplateRef<any>) {
    this.parentModalRef = this.modalService.show(template);
  }

}
