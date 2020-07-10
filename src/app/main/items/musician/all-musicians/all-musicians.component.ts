import {Component, OnInit} from '@angular/core';
import {ArtistData} from "../../../../Shared/classes/artist-data";
import {ArtistFilter} from "../../../../Shared/classes/artist-filter";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {Router} from "@angular/router";
import {Musician} from "../../../../models/media/musician";
import {MusicianService} from "../../../../services/media/musician.service";
import {HelperService} from "../../../../Shared/services/helper.service";

@Component({
  selector: 'app-all-musicians',
  templateUrl: './all-musicians.component.html',
  styleUrls: ['./all-musicians.component.css']
})
export class AllMusiciansComponent implements OnInit {

  public musicians: Musician[];


  // the following data is for filter musicians
  searchTerm: string;
  musicianData = new ArtistData();
  musicianFilter = new ArtistFilter();
  // the following data is for CRUD operations
  newMusicianDto: FormGroup;
  updateMusicianDto: FormGroup;
  formData: FormData = new FormData();
  selectedImage: string = null;
  viewProgressBar = false;
  public uploader: FileUploader = new FileUploader({});
  loading = false;

  limit: number = 10;

  constructor(private musicianService: MusicianService,
              private fb: FormBuilder,
              private router: Router,
              public helperService: HelperService
         ) {
  }

  ngOnInit(): void {
    this.musicianService.musicians.subscribe((data: Musician[]) => {
      this.musicians = data;
    });
    this.newMusicianDto = this.fb.group({
      name: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      gender: new FormControl(null),
      nationality: new FormControl(null),
      image: new FormControl(null, Validators.required),
    });

    this.updateMusicianDto = this.fb.group({
      name: new FormControl(null),
      info: new FormControl(null),
      type: new FormControl(null),
      nationality: new FormControl(null),
      gender: new FormControl(null),
      image: new FormControl(null)
    })
  }

  loadLimitedMusicians() {
    this.loading = true;
    this.musicianService.getLimitedMusicians(this.limit).subscribe(
      (data: Musician[]) => {
        this.musicianService.musicians.next(data);
        this.loading = false;
      }
    );
    this.limit += 6;
  }

  getFilteredMusicians() {
    this.musicianFilter.limit = this.limit;
    this.musicianService.getFilteredMusicians(this.musicianFilter)
      .subscribe((data: Musician[]) => {
        this.musicianService.musicians.next(data);
      })
  }

  prepareUpdateForm(musician: Musician) {

    this.updateMusicianDto.patchValue({
      name: musician.name,
      info: musician.info,
      nationality: musician.nationality,
      type: musician.type,
      gender: musician.gender
    })
  }


  // check if the singer type musicBand or Single
  isBand(musician: any) {
    if (musician.type) {
      return musician.type as unknown as string === 'MUSIC_BAND';
    }
  }


  viewMusicianDetails(musician: Musician) {
    this.router.navigate(['/musicians', musician.id], {
      queryParams: {
        Name: musician.name
      }
    });
  }

  newMusician() {
    this.formData.append('name', this.newMusicianDto.value.name);
    this.formData.append('info', this.newMusicianDto.value.info);
    this.formData.append('type', this.newMusicianDto.value.type);
    this.formData.append('nationality', this.newMusicianDto.value.nationality);

    // if the singer is not music band then add the gender
    if (!this.isBand(this.newMusicianDto.value)) {
      this.formData.append('gender', this.newMusicianDto.value.gender);
    }
    this.viewProgressBar = true;
    this.musicianService.newMusician(this.formData)
      .subscribe((musician: Musician) => {
        this.helperService.hideDialog();
        this.musicians.push(musician);
        this.musicianService.musicians.next(this.musicians);
        this.helperService.openSnackbar('Musician added successfully', 'OK');
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

  updateMusician(musicianId: number) {
    this.formData.append('name', this.updateMusicianDto.value.name);
    this.formData.append('info', this.updateMusicianDto.value.info);
    this.formData.append('type', this.updateMusicianDto.value.type);
    this.formData.append('nationality', this.updateMusicianDto.value.nationality);

    // if the singer is not music band then add the gender
    if (!this.isBand(this.updateMusicianDto.value)) {
      this.formData.append('gender', this.updateMusicianDto.value.gender);
    }
    this.viewProgressBar = true;
    this.musicianService.updateMusician(musicianId, this.formData)
      .subscribe((updatedMusician: Musician) => {
        this.helperService.hideDialog();
        for (let i = 0; i < this.musicians.length; i++) {
          if (this.musicians[i].id === musicianId) {
            this.musicians[i] = updatedMusician;
            this.musicianService.musicians.next(this.musicians);
            this.helperService.openSnackbar('Musician updated successfully', 'OK');
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

  deleteMusician(musicianId: number) {
    this.musicianService.deleteMusician(musicianId).subscribe(() => {
      for (let i = 0; i < this.musicians.length; i++) {
        if (this.musicians[i].id === musicianId) {
          this.musicians.splice(i, 1);
          this.helperService.hideDialog();
          this.musicianService.musicians.next(this.musicians);
          this.helperService.openSnackbar('Musician deleted successfully', 'OK');
          break;
        }
      }
    }, error => {
      this.helperService.openSnackbar('An Error Occurred', 'OK');
      console.error(error);
    })
  }

  onMusicianImageSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedImage = file.name;
      this.formData.append('image', file);
    }
  }

  deleteFormsContent(): void {
    this.newMusicianDto.reset();
    this.updateMusicianDto.reset();
    this.selectedImage = null;
    this.formData.delete('name');
    this.formData.delete('info');
    this.formData.delete('nationality');
    this.formData.delete('gender');
    this.formData.delete('type');
    this.formData.delete('image');
  }

}
