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
      "id": 1,
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
      "id": 2,
      "nativeExpression": "kolejka",
      "foreignExpression": "a queue",
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
      "id": 3,
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

  getCardById(id: number): CardDetails{
    return this.cards.filter( c => c.id == id)[0];
  }

  setCardsDescriptionById(id: number, description: string){
    let obj: CardDetails = this.cards.find( c => c.id == id) as CardDetails;
    let index = this.cards.indexOf(obj);
    this.cards[index].description = description;
  }

  setCardsExamplesById(id: number, examples: string[]){
    let obj: CardDetails = this.cards.find( c => c.id == id) as CardDetails;
    let index = this.cards.indexOf(obj);
    this.cards[index].examples = examples;
  }

  addCard(card: CardDetails){
    let maxId:number = Math.max.apply(Math, this.cards.map(function(c) { return c.id; }))
    card.id = maxId+1;
    this.cards.push(card)
  }
  
  addBundle(bundle:CardDetails[]){
    bundle.forEach((c)=>{
      this.addCard(c);
    })

  }
}
