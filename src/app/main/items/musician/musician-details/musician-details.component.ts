import {Component, OnInit, TemplateRef} from '@angular/core';
import {StartRefresh} from "../../../../Shared/classes/start-refresh";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Musician} from "../../../../models/media/musician";
import {MusicianAlbumService} from "../../../../services/media/musician-album.service";
import {MusicianService} from "../../../../services/media/musician.service";
import {MusicianAlbum} from "../../../../models/media/musician-album";
import {HelperService} from "../../../../Shared/services/helper.service";

@Component({
  selector: 'app-musician-details',
  templateUrl: './musician-details.component.html',
  styleUrls: ['./musician-details.component.css']
})
export class MusicianDetailsComponent implements OnInit {

  musician: Musician;
  musicianId: number;
  createAlbumDto = {
    name: null
  };
  updateAlbumDto = {
    name: null
  };
  startRefresh: StartRefresh = new StartRefresh();

  refreshContent(musician) {
    // receiving the musician of this component from the child
    // updating the value of musician album
    this.musician = musician;
  }

  refreshAlbum(data: { albumId: number, startRefresh: StartRefresh }) {
    const {albumId, startRefresh} = data;
    if (startRefresh.refresh === true || this.startRefresh.refresh === true) {

      // receiving notification from child
      // updating the value of singer album
      this.musicianAlbumService.getMusicianAlbumById(albumId).subscribe(
        (refreshedAlbum: MusicianAlbum) => {
          for (let i = 0; i < this.musician.musicianAlbums.length; i++) {
            if (this.musician.musicianAlbums[i].id === albumId) {
              this.musician.musicianAlbums[i] = refreshedAlbum;
              this.startRefresh.refresh = false;
              break;
            }
          }
        }
      )
    }
  }
  constructor(private route: ActivatedRoute,
              public helperService: HelperService,
              private musicianService: MusicianService,
              private musicianAlbumService: MusicianAlbumService) {
    route.paramMap.subscribe((param: ParamMap) => {
      this.musicianId = +param.get('id');
      musicianService.getMusicianById(this.musicianId)
        .subscribe((musician: Musician) => this.musician = musician);
    })
  }


  ngOnInit(): void {
  }



  clearAlbumContent(musicianAlbumId: number) {
    this.musicianAlbumService.clearMusicianAlbumContent(musicianAlbumId)
      .subscribe((updatedAlbum: MusicianAlbum) => {
        for (let i = 0; i < this.musician.musicianAlbums.length; i++) {
          if (this.musician.musicianAlbums[i].id === musicianAlbumId) {
            this.musician.musicianAlbums[i] = updatedAlbum;
            this.helperService.openSnackbar(`Musician Album Cleared Successfully`, 'OK');
            this.helperService.hideDialog();
            break;
          }
        }
      })
  }

  prepareSingerAlbumToUpdate(album: MusicianAlbum) {
    this.updateAlbumDto.name = album.name;
  }


  createMusicianAlbum() {
    this.musicianService.newMusicianAlbum(this.musicianId, this.createAlbumDto)
      .subscribe((musicianAlbum: MusicianAlbum) => {
        this.musician.musicianAlbums.push(musicianAlbum);
        this.helperService.openSnackbar(`Album Created Successfully`, 'OK');
        this.helperService.hideDialog();
      })
  }

  updateMusicianAlbum(musicianAlbumId: number) {
    this.musicianAlbumService.updateAlbum(musicianAlbumId, this.updateAlbumDto)
      .subscribe((updatedAlbum: MusicianAlbum) => {
        for (let i = 0; i < this.musician.musicianAlbums.length; i++) {
          if (this.musician.musicianAlbums[i].id === musicianAlbumId) {
            this.musician.musicianAlbums[i] = updatedAlbum;
            this.helperService.openSnackbar(`Album Updated Successfully`, 'OK');
            this.helperService.hideDialog();
            break;
          }
        }
      })
  }

  deleteMusicianAlbum(musicianAlbumId: number) {
    this.musicianAlbumService.deleteMusicianAlbum(musicianAlbumId)
      .subscribe(() => {
        for (let i = 0; i < this.musician.musicianAlbums.length; i++) {
          if (this.musician.musicianAlbums[i].id === musicianAlbumId) {
            this.musician.musicianAlbums.splice(i, 1);
            this.helperService.openSnackbar(`Album Deleted Successfully`, 'OK');
            this.helperService.hideDialog();
            break;
          }
        }
      })
  }

}
