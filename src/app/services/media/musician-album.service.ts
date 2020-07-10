import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MusicianAlbum} from "../../models/media/musician-album";
import {ApiEndpoints} from "../../commons/api-endpoints";
import {Observable} from "rxjs";
import {Music} from "../../models/media/music";
import {SingerAlbum} from "../../models/media/singer-album";

@Injectable({
  providedIn: 'root'
})
export class MusicianAlbumService {

  constructor(private http: HttpClient) {
  }

  getAllMusiciansAlbums(): Observable<MusicianAlbum[]> {
    try {
      return this.http.get<MusicianAlbum[]>(ApiEndpoints.MusiciansAlbumsEndpoints.allMusiciansAlbums);
    } catch (err) {
      console.error(err);
    }
  }

  getMusicianAlbumById(id: number): Observable<MusicianAlbum> {
    try {
      return this.http
        .get<MusicianAlbum>(`${ApiEndpoints.MusiciansAlbumsEndpoints.allMusiciansAlbums}/${id}`);
    } catch (err) {
      console.error(err);
    }
  }
  deleteMusicianAlbum(id: number): Observable<any> {
    try {
      return this.http
        .delete<any>
        (`${ApiEndpoints.MusiciansAlbumsEndpoints.allMusiciansAlbums}/${id}/delete-album`);
    } catch (err) {
      console.error(err);
    }
  }
  updateAlbum(id: number, createAlbumDto: any): Observable<MusicianAlbum> {
    try {
      return this.http
        .put<MusicianAlbum>
        (`${ApiEndpoints.MusiciansAlbumsEndpoints.allMusiciansAlbums}/${id}/update-album`, createAlbumDto);
    } catch (err) {
      console.error(err);
    }
  }

  newMusic(id: number, musicData: FormData): Observable<Music> {
    try {
      return this.http
        .post<Music>
        (`${ApiEndpoints.MusiciansAlbumsEndpoints.allMusiciansAlbums}/${id}/new-music`, musicData);
    } catch (err) {
      console.error(err);
    }
  }
  clearMusicianAlbumContent(id: number): Observable<MusicianAlbum> {
    try {
      return this.http
        .delete<MusicianAlbum>
        (`${ApiEndpoints.MusiciansAlbumsEndpoints.allMusiciansAlbums}/${id}/clear-musician-album`);
    } catch (err) {
      console.error(err);
    }
  }

}
