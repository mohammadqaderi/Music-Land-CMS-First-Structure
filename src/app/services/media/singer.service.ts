import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ApiEndpoints} from "../../commons/api-endpoints";
import {ArtistType} from "../../commons/enums/artist-type.enum";
import {Gender} from "../../commons/enums/gender.enum";
import {Singer} from "../../models/media/singer";
import {SingerAlbum} from "../../models/media/singer-album";
import {ArtistFilter} from "../../Shared/classes/artist-filter";

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient) {
    this.getLimitedSingers(10).subscribe((data: Singer[]) => {
      this.singers.next(data);
    })
  }

  // this value will be used in many components
  public singers: BehaviorSubject<Singer[]> = new BehaviorSubject<Singer[]>(null);

  getAllSingers(): Observable<Singer[]> {
    try {
      return this.http.get<Singer[]>(ApiEndpoints.SingersEndpoints.allSingers);
    } catch (err) {
      console.error(err);
    }
  }

  getSingerById(id: number): Observable<Singer> {
    try {
      return this.http.get<Singer>(`${ApiEndpoints.SingersEndpoints.allSingers}/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  newSinger(data: FormData): Observable<Singer> {
    try {
      return this.http.post<Singer>(ApiEndpoints.SingersEndpoints.allSingers, data);
    } catch (err) {
      console.error(err);
    }
  }

  newSingerAlbum(id: number, createAlbumDto: any): Observable<SingerAlbum> {
    try {
      return this.http
        .post<SingerAlbum>(`${ApiEndpoints.SingersEndpoints.allSingers}/${id}/new-album`, createAlbumDto);
    } catch (err) {
      console.error(err);
    }
  }

  updateSinger(id: number, data: FormData): Observable<Singer> {
    try {
      return this.http
        .put<Singer>(`${ApiEndpoints.SingersEndpoints.allSingers}/${id}/update-singer`, data);
    } catch (err) {
      console.error(err);
    }
  }

  deleteSinger(id: number): Observable<any> {
    try {
      return this.http
        .delete<any>(`${ApiEndpoints.SingersEndpoints.allSingers}/${id}/delete-singer`);
    } catch (err) {
      console.error(err);
    }
  }

  getLimitedSingers(limit: number): Observable<Singer[]> {
    try {
      const params = new HttpParams().set('limit', limit.toString());
      return this.http.get<Singer[]>(ApiEndpoints.SingersEndpoints.limitedSingers, {
        params
      });
    } catch (err) {
      console.error(err);
    }
  }

  getFilteredSingers(singerFilter: ArtistFilter): Observable<Singer[]> {
    const {limit, gender, nationality, type} = singerFilter;
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
      return this.http.get<Singer[]>(ApiEndpoints.SingersEndpoints.filteredSingers, {
        params
      });
    } catch (err) {
      console.error(err);
    }
  }
}
