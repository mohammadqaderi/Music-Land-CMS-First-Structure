import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ApiEndpoints} from "../../commons/api-endpoints";
import {SingerAlbum} from "../../models/media/singer-album";
import {HttpClient} from "@angular/common/http";
import {Song} from "../../models/media/song";

@Injectable({
  providedIn: 'root'
})
export class SingerAlbumService {
  constructor(private http: HttpClient) {
  }

  getAllSingersAlbums(): Observable<SingerAlbum[]> {
    try {
      return this.http.get<SingerAlbum[]>(ApiEndpoints.SingersAlbumsEndpoints.allSingersAlbums);
    } catch (err) {
      console.error(err);
    }
  }

  getSingerAlbumById(id: number): Observable<SingerAlbum> {
    try {
      return this.http
        .get<SingerAlbum>(`${ApiEndpoints.SingersAlbumsEndpoints.allSingersAlbums}/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  deleteSingerAlbum(id: number): Observable<any> {
    try {
      return this.http
        .delete<any>
        (`${ApiEndpoints.SingersAlbumsEndpoints.allSingersAlbums}/${id}/delete-album`);
    } catch (err) {
      console.error(err);
    }
  }

  clearSingerAlbumContent(id: number): Observable<SingerAlbum> {
    try {
      return this.http
        .delete<SingerAlbum>
        (`${ApiEndpoints.SingersAlbumsEndpoints.allSingersAlbums}/${id}/clear-singer-album`);
    } catch (err) {
      console.error(err);
    }
  }
  updateAlbum(id: number, createAlbumDto: any): Observable<SingerAlbum> {
    try {
      return this.http
        .put<SingerAlbum>
        (`${ApiEndpoints.SingersAlbumsEndpoints.allSingersAlbums}/${id}/update-album`, createAlbumDto);
    } catch (err) {
      console.error(err);
    }
  }

  newSong(id: number, songData: FormData): Observable<Song> {
    try {
      return this.http
        .post<Song>
        (`${ApiEndpoints.SingersAlbumsEndpoints.allSingersAlbums}/${id}/new-song`, songData);
    } catch (err) {
      console.error(err);
    }
  }
}
