import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bundle, EmptyBundle } from './bundle.model';
import { CardDetails, Card } from './card-details.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BundleCollectorService {

  bundle!: Bundle;
  constructor(private dataService: DataService) { 
    this.bundle = new EmptyBundle();
    this.bundle.bundleID = this.dataService.getNewBundleId();
  }

  clear(){
    this.bundle.cards = [];
    this.bundle.name = '';
    this.bundle.description = '';
  };

  addEmptyCard(id: number){

      this.bundle.cards.push(new Card(id, this.bundle.bundleID));
  }

  deleteCard(id: number){
    this.bundle.cards = this.bundle.cards.filter(b => b.id !== id);
  }

  getBundle(): Bundle{
    return this.bundle;
  }

  updateNativeWord(cardsID: number, expression: string){
    this.bundle.cards.find( c => c.id === cardsID)!.nativeExpression = expression;
    console.log(cardsID+" "+expression);
  }

  updateForeignWord(cardsID: number, expression: string){
    this.bundle.cards.find( c => c.id === cardsID)!.foreignExpression = expression;
    console.log(cardsID+" "+expression);
  }

  updateDescription(cardsID: number, expression: string){
    this.bundle.cards.find( c => c.id === cardsID)!.description = expression;
    console.log(cardsID+" "+expression);
  }

  updateExamples(cardsID: number, expression: string[]){
    this.bundle.cards.find( c => c.id === cardsID)!.examples = expression;
    console.log(cardsID+" "+expression);
  }

  updateBundleTitle(value: string){
    this.bundle.name = value;
  }

  updateBundleDescription(value: string){
    this.bundle.description = value;
  }

  updateNativeLang(value: string){
    this.bundle.nativeLang = value;
  }

  updateForeignLang(value: string){
    this.bundle.foreignLang = value;
  }
}
