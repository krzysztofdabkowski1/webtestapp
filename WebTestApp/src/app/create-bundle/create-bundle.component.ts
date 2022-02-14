import { Component, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCardComponent } from '../create-card/create-card.component';
import { BundleCollectorService } from '../shared/bundle-collector.service';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CardsValidator } from './cards-validator';

@Component({
  selector: 'app-create-bundle',
  templateUrl: './create-bundle.component.html',
  styleUrls: ['./create-bundle.component.css']
})
export class CreateBundleComponent implements OnInit {

  bundleCardsID: number[] = [];

  saveCards: Boolean = false;
  bundle:CardDetails[] = [];

  constructor(
    private dataService: CardDetailsService,
    private bundleCollector: BundleCollectorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.bundleCardsID = [1,2,3];
    this.bundleCollector.addEmptyCard(3);
  }

  addCard(){
    this.bundleCardsID.push(this.bundleCardsID.length+1);
    this.bundleCollector.addEmptyCard();
  }

  cancel() {

    
  }

  submit(){
    let bundle: CardDetails[] = this.bundleCollector.getBundle();
    let validator = new CardsValidator(bundle);
    if(validator.areFieldsFilled()){
      this.dataService.addBundle(bundle);
      this.bundleCollector.clear();
      this.openSnackBar("Dodano zestaw kart!", bundle.length.toString());
      this.router.navigate(['/cards'])
    }
    else{
      this.saveCards = true;
      this.openSnackBar("Uzupełnij wszystkie pola!",'');
    }
 
  }
  isCollectingCardsfinished(): Boolean {
    if(this.bundle.length === this.bundleCardsID.length){
      return true;
    }
    else{
      return false;
    }
  }
  getSavedCard(card:CardDetails){
    this.bundle.push(card);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}


