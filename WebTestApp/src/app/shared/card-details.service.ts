import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardDetails } from './card-details.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  baseUrl: string = 'http://localhost:65419/api/';
  constructor(private http: HttpClient) { }


  getCards(): Observable<CardDetails[]>{
    let url = this.baseUrl+'CardDetails';
    let c = this.http.get<CardDetails[]>(url);
    c.subscribe(c => console.log("get: "+c[1].nativeExpression));
    return c;
  }
}
