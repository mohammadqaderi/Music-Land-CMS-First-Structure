import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StartRefresh} from "../../classes/start-refresh";
import {FileUploader} from "ng2-file-upload";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MusicData} from "../../classes/music-data";
import {MusicianAlbumService} from "../../../services/media/musician-album.service";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrls: ['./add-music.component.css']
})
export class AddMusicComponent implements OnInit {

  @Input() albumId: number;
  @Input() startRefresh: StartRefresh;

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  uploader: FileUploader = new FileUploader({});
  newMusicDto: FormGroup;
  formData: FormData = new FormData();
  musicData = new MusicData();
  selectedMusic: string;
  viewProgressBar = false;

  constructor(private albumService: MusicianAlbumService,
              public helperService: HelperService,
              private fb: FormBuilder
              ) {
  }

  ngOnInit(): void {
    this.newMusicDto = this.fb.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      artist: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      source: new FormControl(null, Validators.required)
    })
  }

  deleteFormsContent(): void {
    this.newMusicDto.reset();
    this.selectedMusic = null;
    this.formData.delete("name");
    this.formData.delete("description");
    this.formData.delete("artist");
    this.formData.delete("type");
    this.formData.delete("source");
  }



  createNewMusic() {
    this.formData.append("name", this.newMusicDto.value.name);
    this.formData.append("description", this.newMusicDto.value.description);
    this.formData.append("artist", this.newMusicDto.value.artist);
    this.formData.append("type", this.newMusicDto.value.type);
    this.albumService
      .newMusic(this.albumId, this.formData)
      .subscribe(
        () => {
          this.startRefresh.refresh = true;
          const data = {albumId: this.albumId, startRefresh: this.startRefresh};
          this.change.emit(data); // sending notification to parent component
          this.viewProgressBar = false;
          this.helperService.hideDialog();
          this.helperService.openSnackbar("Music Created Successfully", "OK");
          this.deleteFormsContent();
        },
        err => {
          this.viewProgressBar = false;
          this.helperService.hideDialog();
          this.helperService.openSnackbar("An error has occurred", "Cancel");
          console.error(err);
          this.deleteFormsContent();
        }
      );
  }

  onSourceSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedMusic = file.name;
      this.formData.append("source", file);
    }
  }



}
