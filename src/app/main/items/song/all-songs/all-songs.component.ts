import {Component, OnInit, TemplateRef} from '@angular/core';
import {Song} from "../../../../models/media/song";
import {SongData} from "../../../../Shared/classes/song-data";
import {SongFilter} from "../../../../Shared/classes/song-filter";
import {SongService} from "../../../../services/media/song.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../../../Shared/services/helper.service";

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit {

  // the following data are for filtering
  searchTerm: string;
  songs: Song[];
  songData = new SongData();
  limit = 10;
  songFilter = new SongFilter();

  // the following data are for spinner loading
  showSpinner = false;
  state = '';

  constructor(private songService: SongService,
              public helperService: HelperService) {
  }

  refreshContent(songs) {
    // receiving the songs of this component from the child component
    // updating the value of songs array
    this.songs = songs;
  }
  ngOnInit(): void {
    this.state = 'Loading...';
    this.helperService.showSpinner();
    this.songService.songs.subscribe((data: Song[]) => {
      this.songs = data;
      this.helperService.hideSpinner();
    })
  }

  getLimitedSongs() {
    this.showSpinner = true;
    this.songService.getLimitedSongs(this.limit)
      .subscribe((data: Song[]) => {
        this.songService.songs.next(data);
        this.showSpinner = false;
      });
    this.limit += 6;
  }

  getFilteredSongs() {
    this.state = 'Filtering...';
    this.songFilter.limit = this.limit;
    this.helperService.showSpinner();
    this.songService.getFilteredSongs(this.songFilter)
      .subscribe((data: Song[]) => {
        this.songService.songs.next(data);
        this.helperService.hideSpinner();
      })
  }

}
