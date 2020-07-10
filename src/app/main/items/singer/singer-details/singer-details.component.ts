import {Component, OnInit, TemplateRef} from '@angular/core';
import {Singer} from "../../../../models/media/singer";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SingerService} from "../../../../services/media/singer.service";
import {SingerAlbum} from "../../../../models/media/singer-album";
import {SingerAlbumService} from "../../../../services/media/singer-album.service";
import {StartRefresh} from "../../../../Shared/classes/start-refresh";
import {HelperService} from "../../../../Shared/services/helper.service";

@Component({
  selector: 'app-singer-details',
  templateUrl: './singer-details.component.html',
  styleUrls: ['./singer-details.component.css']
})
export class SingerDetailsComponent implements OnInit {
  // localhost:4200/singers/1

  singer: Singer;
  singerId: number;
  createAlbumDto = {
    name: null
  };
  updateAlbumDto = {
    name: null
  };
  startRefresh: StartRefresh = new StartRefresh();

  refreshContent(singer) {
    // receiving the singer of this component from the child
    // updating the value of singer album
    this.singer = singer;
  }

  refreshAlbum(data: { albumId: number, startRefresh: StartRefresh }) {
    const {albumId, startRefresh} = data;
    if (startRefresh.refresh === true || this.startRefresh.refresh === true) {

      // receiving notification from child
      // updating the value of singer album
      this.singerAlbumService.getSingerAlbumById(albumId).subscribe(
        (refreshedAlbum: SingerAlbum) => {
          for (let i = 0; i < this.singer.singerAlbums.length; i++) {
            if (this.singer.singerAlbums[i].id === albumId) {
              this.singer.singerAlbums[i] = refreshedAlbum;
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
              private singerService: SingerService,
              private singerAlbumService: SingerAlbumService) {
    route.paramMap.subscribe((param: ParamMap) => {
      this.singerId = +param.get('id');
      singerService.getSingerById(this.singerId)
        .subscribe((singer: Singer) => this.singer = singer);
    })
  }


  ngOnInit(): void {
  }



  clearAlbumContent(singerAlbumId: number) {
    this.singerAlbumService.clearSingerAlbumContent(singerAlbumId)
      .subscribe((updatedAlbum: SingerAlbum) => {
        for (let i = 0; i < this.singer.singerAlbums.length; i++) {
          if (this.singer.singerAlbums[i].id === singerAlbumId) {
            this.singer.singerAlbums[i] = updatedAlbum;
            this.helperService.openSnackbar(`Singer Album Cleared Successfully`, 'OK');
            this.helperService.hideDialog();
            break;
          }
        }
      })
  }

  prepareSingerAlbumToUpdate(album: SingerAlbum) {
    this.updateAlbumDto.name = album.name;
  }


  createSingerAlbum() {
    this.singerService.newSingerAlbum(this.singerId, this.createAlbumDto)
      .subscribe((singerAlbum: SingerAlbum) => {
        this.singer.singerAlbums.push(singerAlbum);
        this.helperService.openSnackbar(`Album Created Successfully`, 'OK');
        this.helperService.hideDialog();
      })
  }

  updateSingerAlbum(singerAlbumId: number) {
    this.singerAlbumService.updateAlbum(singerAlbumId, this.updateAlbumDto)
      .subscribe((updatedAlbum: SingerAlbum) => {
        for (let i = 0; i < this.singer.singerAlbums.length; i++) {
          if (this.singer.singerAlbums[i].id === singerAlbumId) {
            this.singer.singerAlbums[i] = updatedAlbum;
            this.helperService.openSnackbar(`Album Updated Successfully`, 'OK');
            this.helperService.hideDialog();
            break;
          }
        }
      })
  }

  deleteSingerAlbum(singerAlbumId: number) {
    this.singerAlbumService.deleteSingerAlbum(singerAlbumId)
      .subscribe(() => {
        for (let i = 0; i < this.singer.singerAlbums.length; i++) {
          if (this.singer.singerAlbums[i].id === singerAlbumId) {
            this.singer.singerAlbums.splice(i, 1);
            this.helperService.openSnackbar(`Album Deleted Successfully`, 'OK');
            this.helperService.hideDialog();
            break;
          }
        }
      })
  }
}
