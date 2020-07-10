import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SongData} from "../../classes/song-data";
import {SingerAlbumService} from "../../../services/media/singer-album.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StartRefresh} from "../../classes/start-refresh";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

  @Input() albumId: number;
  @Input() startRefresh: StartRefresh;

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  uploader: FileUploader = new FileUploader({});
  newSongDto: FormGroup;
  formData: FormData = new FormData();
  songData = new SongData();
  selectedSong: string;
  viewProgressBar = false;

  constructor(private albumService: SingerAlbumService,
              public helperService: HelperService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.newSongDto = this.fb.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      artist: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      language: new FormControl(null, Validators.required),
      source: new FormControl(null, Validators.required)
    })
  }

  deleteFormsContent(): void {
    this.newSongDto.reset();
    this.selectedSong = null;
    this.formData.delete("name");
    this.formData.delete("description");
    this.formData.delete("artist");
    this.formData.delete("type");
    this.formData.delete("language");
    this.formData.delete("source");
  }


  createNewSong() {
    this.formData.append("name", this.newSongDto.value.name);
    this.formData.append("description", this.newSongDto.value.description);
    this.formData.append("artist", this.newSongDto.value.artist);
    this.formData.append("type", this.newSongDto.value.type);
    this.formData.append("language", this.newSongDto.value.language);
    this.albumService
      .newSong(this.albumId, this.formData)
      .subscribe(
        () => {
          this.startRefresh.refresh = true;
          const data = {albumId: this.albumId, startRefresh: this.startRefresh};
          this.change.emit(data); // sending notification to parent component
          this.viewProgressBar = false;
          this.helperService.hideDialog();
          this.helperService.openSnackbar("Song Created Successfully", "OK");
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
      this.selectedSong = file.name;
      this.formData.append("source", file);
    }
  }



}
