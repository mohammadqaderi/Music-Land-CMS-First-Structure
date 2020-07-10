import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {SingerService} from "../../../../services/media/singer.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Singer} from "../../../../models/media/singer";
import {ArtistData} from "../../../../Shared/classes/artist-data";
import {ArtistFilter} from "../../../../Shared/classes/artist-filter";
import {HelperService} from "../../../../Shared/services/helper.service";

@Component({
  selector: 'app-all-singers',
  templateUrl: './all-singers.component.html',
  styleUrls: ['./all-singers.component.css']
})
export class AllSingersComponent implements OnInit {

  public singers: Singer[];


  // the following data is for filter singers
  searchTerm: string;
  singerData = new ArtistData();
  singerFilter = new ArtistFilter();
  // the following data is for CRUD operations
  newSingerDto: FormGroup;
  updateSingerDto: FormGroup;
  formData: FormData = new FormData();
  selectedImage: string = null;
  viewProgressBar = false;
  public uploader: FileUploader = new FileUploader({});
  loading = false;

  limit: number = 10;

  constructor(private singerService: SingerService,
              public helperService: HelperService,
              private fb: FormBuilder,
              private router: Router,
              ) {
  }

  ngOnInit(): void {
    this.singerService.singers.subscribe((data: Singer[]) => {
      this.singers = data;
    });
    this.newSingerDto = this.fb.group({
      name: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      gender: new FormControl(null),
      nationality: new FormControl(null),
      image: new FormControl(null, Validators.required),
    })

    this.updateSingerDto = this.fb.group({
      name: new FormControl(null),
      info: new FormControl(null),
      type: new FormControl(null),
      nationality: new FormControl(null),
      gender: new FormControl(null),
      image: new FormControl(null)
    })
  }

  loadLimitedSingers() {
    this.loading = true;
    this.singerService.getLimitedSingers(this.limit).subscribe(
      (data: Singer[]) => {
        this.singerService.singers.next(data);
        this.loading = false;
      }
    );
    this.limit += 6;
  }

  getFilteredSingers() {
    this.singerFilter.limit = this.limit;
    this.singerService.getFilteredSingers(this.singerFilter)
      .subscribe((data: Singer[]) => {
        this.singerService.singers.next(data);
      })
  }

  prepareUpdateForm(singer: Singer) {

    this.updateSingerDto.patchValue({
      name: singer.name,
      info: singer.info,
      nationality: singer.nationality,
      type: singer.type,
      gender: singer.gender
    })
  }


  // check if the singer type musicBand or Single
  isBand(singer: any) {
    if (singer.type) {
      return singer.type as unknown as string === 'MUSIC_BAND';
    }
  }


  viewSingerDetails(singer: Singer) {
    this.router.navigate(['/singers', singer.id], {
      queryParams: {
        Name: singer.name
      }
    });
  }

  newSinger() {
    this.formData.append('name', this.newSingerDto.value.name);
    this.formData.append('info', this.newSingerDto.value.info);
    this.formData.append('type', this.newSingerDto.value.type);
    this.formData.append('nationality', this.newSingerDto.value.nationality);

    // if the singer is not music band then add the gender
    if (!this.isBand(this.newSingerDto.value)) {
      this.formData.append('gender', this.newSingerDto.value.gender);
    }
    this.viewProgressBar = true;
    this.singerService.newSinger(this.formData)
      .subscribe((singer: Singer) => {
        this.helperService.hideDialog();
        this.singers.push(singer);
        this.singerService.singers.next(this.singers);
        this.helperService.openSnackbar('Singer added successfully', 'OK');
        this.viewProgressBar = false;
        this.deleteFormsContent();
      }, error => {
        this.helperService.hideDialog();
        this.viewProgressBar = false;
        this.helperService.openSnackbar('An Error Occurred', 'OK');
        console.error(error);
        this.deleteFormsContent();
      })
  }

  updateSinger(singerId: number) {
    this.formData.append('name', this.updateSingerDto.value.name);
    this.formData.append('info', this.updateSingerDto.value.info);
    this.formData.append('type', this.updateSingerDto.value.type);
    this.formData.append('nationality', this.updateSingerDto.value.nationality);

    // if the singer is not music band then add the gender
    if (!this.isBand(this.updateSingerDto.value)) {
      this.formData.append('gender', this.updateSingerDto.value.gender);
    }
    this.viewProgressBar = true;
    this.singerService.updateSinger(singerId, this.formData)
      .subscribe((updatedSinger: Singer) => {
        this.helperService.hideDialog();
        for (let i = 0; i < this.singers.length; i++) {
          if (this.singers[i].id === singerId) {
            this.singers[i] = updatedSinger;
            this.singerService.singers.next(this.singers);
            this.helperService.openSnackbar('Singer updated successfully', 'OK');
            this.viewProgressBar = false;
            this.deleteFormsContent();
            break;
          }
        }
      }, error => {
        this.helperService.hideDialog();
        this.viewProgressBar = false;
        this.helperService.openSnackbar('An Error Occurred', 'OK');
        console.error(error);
        this.deleteFormsContent();
      })
  }

  deleteSinger(singerId: number) {
    this.singerService.deleteSinger(singerId).subscribe(() => {
      for (let i = 0; i < this.singers.length; i++) {
        if (this.singers[i].id === singerId) {
          this.singers.splice(i, 1);
          this.helperService.hideDialog();
          this.singerService.singers.next(this.singers);
          this.helperService.openSnackbar('Singer deleted successfully', 'OK');
          break;
        }
      }
    }, error => {
      this.helperService.openSnackbar('An Error Occurred', 'OK');
      console.error(error);
    })
  }

  onSingerImageSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedImage = file.name;
      this.formData.append('image', file);
    }
  }

  deleteFormsContent(): void {
    this.newSingerDto.reset();
    this.updateSingerDto.reset();
    this.selectedImage = null;
    this.formData.delete('name');
    this.formData.delete('info');
    this.formData.delete('nationality');
    this.formData.delete('gender');
    this.formData.delete('type');
    this.formData.delete('image');
  }
}
