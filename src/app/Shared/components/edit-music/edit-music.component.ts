import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Music} from "../../../models/media/music";
import {Musician} from "../../../models/media/musician";
import {MusicData} from "../../classes/music-data";
import {MusicService} from "../../../services/media/music.service";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-edit-music',
  templateUrl: './edit-music.component.html',
  styleUrls: ['./edit-music.component.css']
})
export class EditMusicComponent implements OnInit {

  @Input() music: Music;
  @Input() musician: Musician;
  @Input() musics: Music[];
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  uploader: FileUploader = new FileUploader({});
  updateMusicDto: FormGroup;
  formData: FormData = new FormData();
  musicData = new MusicData();
  selectedMusic: string;
  viewProgressBar = false;

  constructor(private musicService: MusicService,
              private fb: FormBuilder,
              public helperService: HelperService
              ) {
  }

  ngOnInit(): void {
    this.updateMusicDto = this.fb.group({
      name: new FormControl(this.music.name),
      description: new FormControl(this.music.description),
      artist: new FormControl(this.music.artist),
      type: new FormControl(this.music.type),
      source: new FormControl(null)
    })
  }

  deleteFormsContent(): void {
    this.updateMusicDto.reset();
    this.selectedMusic = null;
    this.formData.delete("name");
    this.formData.delete("description");
    this.formData.delete("artist");
    this.formData.delete("type");
    this.formData.delete("source");
  }



  updateMusic() {
    this.formData.append("name", this.updateMusicDto.value.name);
    this.formData.append("description", this.updateMusicDto.value.description);
    this.formData.append("artist", this.updateMusicDto.value.artist);
    this.formData.append("type", this.updateMusicDto.value.type);
    this.musicService
      .editMusic(this.music.id, this.formData)
      .subscribe(
        (updatedMusic: Music) => {
          if (this.musician) {
            for (let i = 0; i < this.musician.musicianAlbums.length; i++) {
              if (this.musician.musicianAlbums[i].id === this.music.musicianAlbumId) {
                for (let j = 0; j < this.musician.musicianAlbums[i].musics.length; j++) {
                  if (this.musician.musicianAlbums[i].musics[j].id === this.music.id) {
                    this.musician.musicianAlbums[i].musics[j] = updatedMusic;
                    this.change.emit(this.musician);
                    break;
                  }
                }
              }
            }
          } else if (this.musics) {
            for (let i = 0; i < this.musics.length; i++) {
              if (this.musics[i].id === this.music.id) {
                this.musics[i] = updatedMusic;
                this.change.emit(this.musics);
                break;
              }
            }
          }


          this.viewProgressBar = false;
          this.helperService.hideDialog();
          this.helperService.openSnackbar("Music updated successfully", "OK");
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
