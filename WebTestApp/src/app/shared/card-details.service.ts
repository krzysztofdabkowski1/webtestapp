import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardDetails } from './card-details.model';
import { Observable, of } from 'rxjs';
import { Bundle } from './bundle.model';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  baseUrl: string = 'http://localhost:65419/api/';
  constructor(private http: HttpClient) { }

  bundles: Bundle[] = [
    {"name": "Fiszki #1",
      "bundleID": 1,
      "owenerID": 1,
      "startDate": new Date("2022-01-16"),
      "updateDate": new Date("2022-01-19"),
      "description": " to są fiszki",
      "cards":[
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
  ]}];  

  getCards(): Observable<CardDetails[]>{
    let url = this.baseUrl+'CardDetails';
    let c = this.http.get<CardDetails[]>(url);
    c.subscribe(c => console.log("get: "+c[1].nativeExpression));
    return c;
  }

  getLocalCards(): Observable<CardDetails[]> {
    const CARDS = this.bundles[0].cards;
    return of(CARDS);
  }

  getBundle(id: number): Observable<Bundle>{
    return of(this.bundles[id] )
  }
  
  getCardById(id: number): CardDetails{
    return this.bundles[0].cards.filter( c => c.id == id)[0];
  }

  setCardsDescriptionById(id: number, description: string){
    let obj: CardDetails = this.bundles[0].cards.find( c => c.id == id) as CardDetails;
    let index = this.bundles[0].cards.indexOf(obj);
    this.bundles[0].cards[index].description = description;
  }

  setCardsExamplesById(id: number, examples: string[]){
    let obj: CardDetails = this.bundles[0].cards.find( c => c.id == id) as CardDetails;
    let index = this.bundles[0].cards.indexOf(obj);
    this.bundles[0].cards[index].examples = examples;
  }

  addCard(card: CardDetails){
    let maxId:number = Math.max.apply(Math, this.bundles[0].cards.map(function(c) { return c.id; }))
    card.id = maxId+1;
    this.bundles[0].cards.push(card)
  }
  
  addBundle(bundle:Bundle){
    
    bundle.cards.forEach((c)=>{
      this.addCard(c);
    })

  }
}
