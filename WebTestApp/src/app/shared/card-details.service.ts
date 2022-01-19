import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardDetails } from './card-details.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  baseUrl: string = 'http://localhost:65419/api/';
  constructor(private http: HttpClient) { }

  cards: CardDetails[] = [
    {
      "nativeExpression": "rzeka konstantynopolitańczykowianeczka",
      "foreignExpression": "a river",
      "nativeLang": "pl",
      "foreignLang": "gb",
      "description": " it is a simple word, no description needed",
      "examples": [
        "first example",
        "secomd example",
        "third example"
      ]
  
    },
    {
      "nativeExpression": "drzewo",
      "foreignExpression": "a tree",
      "nativeLang": "pl",
      "foreignLang": "gb",
      "description": " it is a simple word, no description needed",
      "examples": [
        "first example",
        "secomd example",
        "third example"
      ]
    },
    {
      "nativeExpression": "rodzina",
      "foreignExpression": "something special",
      "nativeLang": "pl",
      "foreignLang": "gb",
      "description": " it is a simple word, no description needed",
      "examples": [
        "first example",
        "secomd example",
        "third example"
      ]
    }
  ];  

  getCards(): Observable<CardDetails[]>{
    let url = this.baseUrl+'CardDetails';
    let c = this.http.get<CardDetails[]>(url);
    c.subscribe(c => console.log("get: "+c[1].nativeExpression));
    return c;
  }

  getLocalCards(): Observable<CardDetails[]> {
    const CARDS = this.cards;
    return of(CARDS);
  }
}
