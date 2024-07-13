import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { ShowType } from "../models/show";
import {Observable} from "rxjs";
import {RawSearch} from "../models/rawSearch";

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  baseUrl: string = `http://www.omdbapi.com/?apikey=${environment.moviesKey}`;
  constructor(protected http: HttpClient) { }

  getShows (title: string, type: ShowType, page: number, year?: number): Observable<RawSearch>{
    let url = `${this.baseUrl}&s=${title}&type=${type}&page=${page}`;
    url = year ? `${url}&y=${year}` : url;
    return this.http.get<RawSearch>(url);
  }
}
