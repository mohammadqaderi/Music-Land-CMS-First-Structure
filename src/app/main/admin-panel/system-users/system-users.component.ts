import {Component, OnInit, TemplateRef} from '@angular/core';
import {User} from "../../../models/user/user";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AuthService} from "../../../services/auth/auth.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Role} from "../../../commons/enums/role.enum";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.css']
})
export class SystemUsersComponent implements OnInit {
  // related to Chips material
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  users: User[];
  modalRef: BsModalRef;
  roles: Role[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private authService: AuthService,
              private modalService: BsModalService,
              private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.authService.getSystemUsers().subscribe((usersData: User[]) => {
      this.users = usersData;
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.roles.push(value.trim() as Role);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(role: Role): void {
    const index = this.roles.indexOf(role);

    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }

  openTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hide() {
    this.modalRef.hide()
  }


  editUserRoles(userId: number) {
    this.authService.editUserRoles(userId, this.roles)
      .subscribe((user: User) => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === userId) {
            this.users[i] = user;
            this.hide();
            this
              .openSnackbar(`User: ${user.username} roles updated successfully`, 'OK');
            break;
          }
        }
      })
  }

  fillRoles(userRoles: Role[]) {
    this.roles = [];
    for (let i = 0; i < userRoles.length; i++) {
      this.roles.push(userRoles[i]);
    }
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    })
  }
}
