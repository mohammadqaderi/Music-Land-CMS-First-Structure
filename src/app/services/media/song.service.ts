import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiEndpoints} from "../../commons/api-endpoints";
import {MusicType} from "../../commons/enums/music-type.enum";
import {Song} from "../../models/media/song";
import {SongLanguage} from "../../commons/enums/song-language.enum";
import {SongFilter} from "../../Shared/classes/song-filter";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  public songs: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>(null);

  constructor(private http: HttpClient) {
    // initializing the behavior subject
    this.getLimitedSongs(10).subscribe((data: Song[]) => {
      this.songs.next(data);
    })
  }

  getAllSongs(): Observable<Song[]> {
    try {
      return this.http.get<Song[]>(ApiEndpoints.SongEndpoints.allSongs);
    } catch (err) {
      console.error(err);
    }
  }

  getLimitedSongs(limit: number): Observable<Song[]> {
    try {
      let queryParams = new HttpParams();
      if (limit) {
        queryParams = queryParams.append('limit', limit.toString());
      }
      return this.http.get<Song[]>(ApiEndpoints.SongEndpoints.limitedSongs, {
        params: queryParams
      });
    } catch (err) {
      console.error(err);
    }
  }

  getFilteredSongs(songFilter: SongFilter): Observable<Song[]> {
    const {limit, type, language, rate} = songFilter;
    try {
      let params = new HttpParams();
      if (limit) {
        params = params.append('limit', limit.toString());
      }
      if (type) {
        params = params.append('type', type);
      }
      if (language) {
        params = params.append('language', language);
      }
      if (rate) {
        params = params.append('rate', rate.toString());
      }
      return this.http.get<Song[]>(ApiEndpoints.SongEndpoints.filteredSongs, {
        params
      });
    } catch (err) {
      console.error(err);
    }
  }

  getSongById(id: number): Observable<Song> {
    try {
      return this.http.get<Song>(`${ApiEndpoints.SongEndpoints.allSongs}/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  editSong(id: number, data: FormData): Observable<Song> {
    try {
      return this.http.put<Song>(`${ApiEndpoints.SongEndpoints.allSongs}/${id}/update-song`, data);
    } catch (err) {
      console.error(err);
    }
  }

  deleteSong(id: number): Observable<any> {
    try {
      return this.http.delete<any>(`${ApiEndpoints.SongEndpoints.allSongs}/${id}/delete-song`);
    } catch (err) {
      console.error(err);
    }
  }

}
