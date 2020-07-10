import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Music} from "../../models/media/music";
import {ApiEndpoints} from "../../commons/api-endpoints";
import {MusicType} from "../../commons/enums/music-type.enum";
import {MusicFilter} from "../../Shared/classes/music-filter";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  public musics: BehaviorSubject<Music[]> = new BehaviorSubject<Music[]>(null);

  constructor(private http: HttpClient) {
    // initializing the behavior subject
    this.getLimitedMusics(10).subscribe((data: Music[]) => {
      this.musics.next(data);
    })
  }

  /*
   try {

    }catch (err) {
      console.error(err);
    }
   */
  getAllMusics(): Observable<Music[]> {
    try {
      return this.http.get<Music[]>(ApiEndpoints.MusicEndpoints.allMusics);
    } catch (err) {
      console.error(err);
    }
  }

  getLimitedMusics(limit: number): Observable<Music[]> {
    try {
      const params = new HttpParams().set('limit', limit.toString());
      return this.http.get<Music[]>(ApiEndpoints.MusicEndpoints.limitedMusics, {
        params
      });
    } catch (err) {
      console.error(err);
    }
  }

  getFilteredMusics(musicFilter: MusicFilter): Observable<Music[]> {
    const {limit, type, rate} = musicFilter;
    try {
      let params = new HttpParams();
      if (limit) {
        params = params.append('limit', limit.toString());
      }
      if (type) {
        params = params.append('type', type);
      }
      if (rate) {
        params = params.append('rate', rate.toString());
      }
      return this.http.get<Music[]>(ApiEndpoints.MusicEndpoints.filteredMusics, {
        params
      });
    } catch (err) {
      console.error(err);
    }
  }

  getMusicById(id: number): Observable<Music> {
    try {
      return this.http.get<Music>(`${ApiEndpoints.MusicEndpoints.allMusics}/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  editMusic(id: number, data: FormData): Observable<Music> {
    try {
      return this.http.put<Music>(`${ApiEndpoints.MusicEndpoints.allMusics}/${id}/update-music`, data);
    } catch (err) {
      console.error(err);
    }
  }

  deleteMusic(id: number): Observable<any> {
    try {
      return this.http.delete<any>(`${ApiEndpoints.MusicEndpoints.allMusics}/${id}/delete-music`);
    } catch (err) {
      console.error(err);
    }
  }


}
