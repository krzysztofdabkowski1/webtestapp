import { Injectable } from '@angular/core';
import { CardDetails } from './card-details.model';
import { CardDetailsService } from './card-details.service';

@Injectable({
  providedIn: 'root'
})
export class BundleCollectorService {

  cards: CardDetails[] = [];
  constructor() { }

  clear(){
    this.cards = [];

  };

  addEmptyCard(amount?: number){
    if( amount=== undefined){
      amount = 1;
    }
    for(let i = 0; i<amount; i++){
      this.cards.push({} as CardDetails);
    }
  }

  getBundle(): CardDetails[]{
    return this.cards;
  }

  updateNativeWord(cardsID: number, expression: string){
    this.cards[cardsID-1].nativeExpression = expression;
    console.log(cardsID+" "+expression);
  }

  updateForeignWord(cardsID: number, expression: string){
    this.cards[cardsID-1].foreignExpression = expression;
    console.log(cardsID+" "+expression);
  }

  updateDescription(cardsID: number, expression: string){
    this.cards[cardsID-1].description = expression;
    console.log(cardsID+" "+expression);
  }

  updateExamples(cardsID: number, expression: string[]){
    this.cards[cardsID-1].examples = expression;
    console.log(cardsID+" "+expression);
  }
}
