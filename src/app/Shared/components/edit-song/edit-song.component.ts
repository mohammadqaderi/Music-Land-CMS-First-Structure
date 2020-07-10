import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SongData} from "../../classes/song-data";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Song} from "../../../models/media/song";
import {SongService} from "../../../services/media/song.service";
import {Singer} from "../../../models/media/singer";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {

  @Input() song: Song;
  @Input() singer: Singer;
  @Input() songs: Song[];
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  uploader: FileUploader = new FileUploader({});
  updateSongDto: FormGroup;
  formData: FormData = new FormData();
  songData = new SongData();
  selectedSong: string;
  viewProgressBar = false;

  constructor(private songService: SongService,
              public helperService: HelperService,
              private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.updateSongDto = this.fb.group({
      name: new FormControl(this.song.name),
      description: new FormControl(this.song.description),
      artist: new FormControl(this.song.artist),
      type: new FormControl(this.song.type),
      language: new FormControl(this.song.language),
      source: new FormControl(null)
    })
  }

  deleteFormsContent(): void {
    this.updateSongDto.reset();
    this.selectedSong = null;
    this.formData.delete("name");
    this.formData.delete("description");
    this.formData.delete("artist");
    this.formData.delete("type");
    this.formData.delete("language");
    this.formData.delete("source");
  }


  updateSong() {
    console.log('it works');
    this.formData.append("name", this.updateSongDto.value.name);
    this.formData.append("description", this.updateSongDto.value.description);
    this.formData.append("artist", this.updateSongDto.value.artist);
    this.formData.append("type", this.updateSongDto.value.type);
    this.formData.append("language", this.updateSongDto.value.language);
    this.songService
      .editSong(this.song.id, this.formData)
      .subscribe(
        (updatedSong: Song) => {
          if (this.singer) {
            for (let i = 0; i < this.singer.singerAlbums.length; i++) {
              if (this.singer.singerAlbums[i].id === this.song.singerAlbumId) {
                for (let j = 0; j < this.singer.singerAlbums[i].songs.length; j++) {
                  if (this.singer.singerAlbums[i].songs[j].id === this.song.id) {
                    this.singer.singerAlbums[i].songs[j] = updatedSong;
                    this.change.emit(this.singer);
                    break;
                  }
                }
              }
            }
          } else if (this.songs) {
            for (let i = 0; i < this.songs.length; i++) {
              if (this.songs[i].id === this.song.id) {
                this.songs[i] = updatedSong;
                this.change.emit(this.songs);
                break;
              }
            }
          }


          this.viewProgressBar = false;
          this.helperService.hideDialog();
          this.helperService.openSnackbar("Song updated successfully", "OK");
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
