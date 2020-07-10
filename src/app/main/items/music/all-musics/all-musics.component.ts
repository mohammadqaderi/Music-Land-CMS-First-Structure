import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {Music} from "../../../../models/media/music";
import {MusicData} from "../../../../Shared/classes/music-data";
import {MusicFilter} from "../../../../Shared/classes/music-filter";
import {MusicService} from "../../../../services/media/music.service";
import {HelperService} from "../../../../Shared/services/helper.service";

@Component({
  selector: 'app-all-musics',
  templateUrl: './all-musics.component.html',
  styleUrls: ['./all-musics.component.css']
})
export class AllMusicsComponent implements OnInit {

  // the following data are for filtering
  searchTerm: string;
  musics: Music[];
  musicData = new MusicData();
  limit = 10;
  musicFilter = new MusicFilter();

  // the following data are for spinner loading
  showSpinner = false;
  state = '';

  constructor(private musicService: MusicService,
              public helperService: HelperService) {
  }

  refreshContent(musics) {
    // receiving the musics of this component from the child component
    // updating the value of musics array
    this.musics = musics;
  }
  ngOnInit(): void {
    this.state = 'Loading...';
    this.helperService.showSpinner();
    this.musicService.musics.subscribe((data: Music[]) => {
      this.musics = data;
      this.helperService.hideSpinner();
    })
  }

  getLimitedMusics() {
    this.showSpinner = true;
    this.musicService.getLimitedMusics(this.limit)
      .subscribe((data: Music[]) => {
        this.musicService.musics.next(data);
        this.showSpinner = false;
      });
    this.limit += 6;
  }

  getFilteredMusics() {
    this.state = 'Filtering...';
    this.musicFilter.limit = this.limit;
    this.helperService.showSpinner();
    this.musicService.getFilteredMusics(this.musicFilter)
      .subscribe((data: Music[]) => {
        this.musicService.musics.next(data);
        this.helperService.hideSpinner();
      })
  }


}
