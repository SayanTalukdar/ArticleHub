import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserService } from '../users/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient, private userService: UserService) { }

  baseUrl = environment.serverUrl;

  getAllArticles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createArticle(articleData: any, imgPath: any): Observable<any> {
    var token = "Bearer " + JSON.parse(localStorage.getItem("data") || '').token;
    var header = new HttpHeaders({
      "ContentType": "application/json",
      "Authorization": token,
      "ResponseType": "text"
    });

    const options = {
      headers: header
    }
    const data: any = {}
    return this.http.post(`${this.baseUrl}create`, data, options)
  }

  searchArticles(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?search=${keyword}`);
  }

  getAllArticlesByUserId(userId: string): Observable<any> {
    var token = "Bearer " + JSON.parse(localStorage.getItem("data") || '').token;
    var header = new HttpHeaders({
      "ContentType": "application/json",
      "Authorization": token,
      "ResponseType": "text"
    });

    const options = {
      headers: header
    }
    return this.http.get(`${this.baseUrl}`, options);
  }

  uploadImage(formData: any): Observable<any>  {
    return this.http.post(`${environment.serverUrl}/upload`, formData, { reportProgress: true, observe: 'events' })
  }

  getArticleById(id: number): Observable<any>  {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateArticleById(id: number, data: any): Observable<any>  {
    var token = "Bearer " + JSON.parse(localStorage.getItem("data") || '').token;

    var header = new HttpHeaders({
      "ContentType": "application/json",
      "Authorization": token,
      "ResponseType": "text"
    });

    const options = {
      headers: header
    }
    return this.http.put(`${this.baseUrl}/${id}`, data, options)
  }

  deleteArticle(id: number): Observable<any>  {
    var token = "Bearer " + JSON.parse(localStorage.getItem("data") || '').token;

    var header = new HttpHeaders({
      "ContentType": "application/json",
      "Authorization": token,
      "ResponseType": "text"
    });

    const options = {
      headers: header
    }
    return this.http.delete(`${this.baseUrl}/${id}`, options);
  }
}
