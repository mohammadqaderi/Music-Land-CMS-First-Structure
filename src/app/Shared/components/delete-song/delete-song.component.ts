import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from "../../../models/media/song";
import {SongService} from "../../../services/media/song.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Singer} from "../../../models/media/singer";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.css']
})
export class DeleteSongComponent implements OnInit {
  @Input() song: Song;
  @Input() songs: Song[];
  @Input() singer: Singer;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor(private songService: SongService,
              public dialog: MatDialog,
              public helperService: HelperService,
              private _snackBar: MatSnackBar) {
  }



  ngOnInit(): void {
  }

  deleteSong() {
    this.songService
      .deleteSong(this.song.id)
      .subscribe(
        () => {
          if (this.singer) {
            for (let i = 0; i < this.singer.singerAlbums.length; i++) {
              if (this.singer.singerAlbums[i].id === this.song.singerAlbumId) {
                for (let j = 0; j < this.singer.singerAlbums[i].songs.length; j++) {
                  if (this.singer.singerAlbums[i].songs[j].id === this.song.id) {
                    this.singer.singerAlbums[i].songs.splice(j, 1);
                    this.change.emit(this.singer);
                    break;
                  }
                }
              }
            }
          } else if (this.songs) {
            for (let i = 0; i < this.songs.length; i++) {
              if (this.songs[i].id === this.song.id) {
                this.songs.splice(i, 1);
                this.change.emit(this.songs);
                break;
              }
            }
          }

          this.helperService.hideDialog();
          this.helperService.openSnackbar("Song Deleted successfully", "OK");
        },
        err => {
          this.helperService.hideDialog();
          this.helperService.openSnackbar("An error has occurred", "Cancel");
          console.error(err);
        }
      );
  }


}
