import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Musician} from "../../models/media/musician";
import {ApiEndpoints} from "../../commons/api-endpoints";
import {ArtistType} from "../../commons/enums/artist-type.enum";
import {Gender} from "../../commons/enums/gender.enum";
import {MusicianAlbum} from "../../models/media/musician-album";
import {ArtistFilter} from "../../Shared/classes/artist-filter";

@Injectable({
  providedIn: 'root'
})
export class MusicianService {

  constructor(private http: HttpClient) {
    this.getLimitedMusicians(10).subscribe((data: Musician[]) => {
      this.musicians.next(data);
    })
  }

  // this value will be used in many components
  public musicians: BehaviorSubject<Musician[]> = new BehaviorSubject<Musician[]>(null);

  getAllMusicians(): Observable<Musician[]> {
    try {
      return this.http.get<Musician[]>(ApiEndpoints.MusicianEndpoints.allMusicians);
    } catch (err) {
      console.error(err);
    }
  }

  getMusicianById(id: number): Observable<Musician> {
    try {
      return this.http.get<Musician>(`${ApiEndpoints.MusicianEndpoints.allMusicians}/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  newMusician(data: FormData): Observable<Musician> {
    try {
      return this.http.post<Musician>(ApiEndpoints.MusicianEndpoints.allMusicians, data);
    } catch (err) {
      console.error(err);
    }
  }

  newMusicianAlbum(id: number, createAlbumDto: any): Observable<MusicianAlbum> {
    try {
      return this.http
        .post<MusicianAlbum>(`${ApiEndpoints.MusicianEndpoints.allMusicians}/${id}/new-album`, createAlbumDto);
    } catch (err) {
      console.error(err);
    }
  }

  updateMusician(id: number, data: any): Observable<Musician> {
    try {
      return this.http
        .put<Musician>(`${ApiEndpoints.MusicianEndpoints.allMusicians}/${id}/update-musician`, data);
    } catch (err) {
      console.error(err);
    }
  }

  deleteMusician(id: number): Observable<any> {
    try {
      return this.http
        .delete<any>(`${ApiEndpoints.MusicianEndpoints.allMusicians}/${id}/delete-musician`);
    } catch (err) {
      console.error(err);
    }
  }

  getLimitedMusicians(limit: number): Observable<Musician[]> {
    try {
      const params = new HttpParams().set('limit', limit.toString());
      return this.http.get<Musician[]>(ApiEndpoints.MusicianEndpoints.limitedMusicians, {
        params
      });
    } catch (err) {
      console.error(err);
    }
  }

  getFilteredMusicians(musicianFilter: ArtistFilter): Observable<Musician[]> {
    const {type, gender, limit, nationality} = musicianFilter;
    try {
      let params = new HttpParams();
      if (limit) {
        params = params.append('limit', limit.toString());
      }
      if (type) {
        params = params.append('type', type);
      }
      if (gender) {
        params = params.append('gender', gender);
      }
      if (nationality) {
        params = params.append('nationality', nationality);
      }
      return this.http.get<Musician[]>(ApiEndpoints.MusicianEndpoints.filteredMusicians, {
        params
      });
    } catch (err) {
      console.error(err);
    }
  }
}
