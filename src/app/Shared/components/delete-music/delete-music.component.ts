import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from "../../../models/media/song";
import {Singer} from "../../../models/media/singer";
import {SongService} from "../../../services/media/song.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Music} from "../../../models/media/music";
import {Musician} from "../../../models/media/musician";
import {MusicService} from "../../../services/media/music.service";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-delete-music',
  templateUrl: './delete-music.component.html',
  styleUrls: ['./delete-music.component.css']
})
export class DeleteMusicComponent implements OnInit {

  @Input() music: Music;
  @Input() musics: Music[];
  @Input() musician: Musician;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor(private musicService: MusicService,
              public helperService: HelperService) {
  }


  ngOnInit(): void {
  }

  deleteMusic() {
    this.musicService
      .deleteMusic(this.music.id)
      .subscribe(
        () => {
          if (this.musician) {
            for (let i = 0; i < this.musician.musicianAlbums.length; i++) {
              if (this.musician.musicianAlbums[i].id === this.music.musicianAlbumId) {
                for (let j = 0; j < this.musician.musicianAlbums[i].musics.length; j++) {
                  if (this.musician.musicianAlbums[i].musics[j].id === this.music.id) {
                    this.musician.musicianAlbums[i].musics.splice(j, 1);
                    this.change.emit(this.musician);
                    break;
                  }
                }
              }
            }
          } else if (this.musics) {
            for (let i = 0; i < this.musics.length; i++) {
              if (this.musics[i].id === this.music.id) {
                this.musics.splice(i, 1);
                this.change.emit(this.musics);
                break;
              }
            }
          }

          this.helperService.hideDialog();
          this.helperService.openSnackbar("Music Deleted successfully", "OK");
        },
        err => {
          this.helperService.hideDialog();
          this.helperService.openSnackbar("An error has occurred", "Cancel");
          console.error(err);
        }
      );
  }


}
