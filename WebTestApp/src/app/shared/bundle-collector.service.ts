import { Injectable } from '@angular/core';
import { Bundle } from './bundle.model';
import { CardDetails, EmptyCard } from './card-details.model';
import { CardDetailsService } from './card-details.service';

@Injectable({
  providedIn: 'root'
})
export class BundleCollectorService {

  bundle: Bundle = new Bundle();
  constructor() { }

  clear(){
    this.bundle.cards = [];
    this.bundle.name = '';
    this.bundle.description = '';
  };

  addEmptyCard(amount?: number){
    if( amount=== undefined){
      amount = 1;
    }
    for(let i = 0; i<amount; i++){
      this.bundle.cards.push(new EmptyCard());
    }
  }

  getBundle(): Bundle{
    return this.bundle;
  }

  updateNativeWord(cardsID: number, expression: string){
    this.bundle.cards[cardsID-1].nativeExpression = expression;
    console.log(cardsID+" "+expression);
  }

  updateForeignWord(cardsID: number, expression: string){
    this.bundle.cards[cardsID-1].foreignExpression = expression;
    console.log(cardsID+" "+expression);
  }

  updateDescription(cardsID: number, expression: string){
    this.bundle.cards[cardsID-1].description = expression;
    console.log(cardsID+" "+expression);
  }

  updateExamples(cardsID: number, expression: string[]){
    this.bundle.cards[cardsID-1].examples = expression;
    console.log(cardsID+" "+expression);
  }

  updateBundleTitle(value: string){
    this.bundle.name = value;
  }

  updateBundleDescription(value: string){
    this.bundle.description = value;
  }
}
