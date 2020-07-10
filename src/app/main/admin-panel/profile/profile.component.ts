import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FileUploader, FileUploadModule} from "ng2-file-upload";
import {AuthService} from "../../../services/auth/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ProfileService} from "../../../services/auth/profile.service";
import {Profile} from "../../../models/user/profile";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  ///
  profile: Profile;
  // for showing dialog
  modalRef: BsModalRef;

  // for updating profile
  updateProfileData = {
    firstName: null,
    lastName: null,
    age: null,
    gender: null,
    phone: null,
    country: null,
    city: null,
    address: null
  };

  // for uploading file (Profile Image)
  public uploader: FileUploader = new FileUploader({});
  formData: FormData = new FormData();
  selectedFile = null;

  constructor(public authService: AuthService, private modalService: BsModalService,
              private spinner: NgxSpinnerService, private profileService: ProfileService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe((data: Profile) => {
      this.profile = data;
      this.updateProfileData.firstName = data.firstName;
      this.updateProfileData.lastName = data.lastName;
      this.updateProfileData.age = data.age;
      this.updateProfileData.city = data.city;
      this.updateProfileData.country = data.country;
      this.updateProfileData.phone = data.phone;
      this.updateProfileData.address = data.address;
      this.updateProfileData.gender = data.gender;

    })
  }


// methods for showing dialogs
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hide() {
    this.modalRef.hide();
  }

  // handling uploading file (Profile Image)
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedFile = file.name;
      this.formData.set('image', file);
    }

  }

  getImage() {
    return this.formData.get('image');
  }

  uploadingNewPicture() {
    this.spinner.show();
    this.profileService.uploadProfileImage(this.formData)
      .subscribe((profile: Profile) => {
        this.profile = profile;
        this.selectedFile = null;
        this.spinner.hide();
        this.openSnackbar('Profile Image uploaded successfully', 'OK');
      })
  }

  changingExistingProfilePicture() {
    this.spinner.show();
    this.profileService.changeProfileImage(this.formData)
      .subscribe((profile: Profile) => {
        this.profile = profile;
        this.selectedFile = null;
        this.spinner.hide();
        this.openSnackbar('Profile Image Updated successfully', 'OK');
      })
  }

  updateProfile() {
    this.profileService.editProfile(this.updateProfileData)
      .subscribe((profile: Profile) => {
        this.profile = profile;
        this.openSnackbar('Profile Data Updated successfully', 'OK');
      })
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    })
  }
}
