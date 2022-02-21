import { Component, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCardComponent } from '../create-card/create-card.component';
import { BundleCollectorService } from '../shared/bundle-collector.service';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BundleValidator } from './bundle-validator';
import { Subject } from 'rxjs';
import { Bundle } from '../shared/bundle.model';

@Component({
  selector: 'app-create-bundle',
  templateUrl: './create-bundle.component.html',
  styleUrls: ['./create-bundle.component.css']
})
export class CreateBundleComponent implements OnInit {


  bundleCardsID: number[] = [];

  validate: Subject<Boolean> = new Subject();
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
    this.validate.next(true);
    let bundle: Bundle = this.bundleCollector.getBundle();
    let validator = new BundleValidator(bundle);
    if(validator.areFieldsFilled()){
      this.dataService.addBundle(bundle);
      this.bundleCollector.clear();
      this.openSnackBar("Dodano zestaw kart!", bundle.cards.length.toString());
      this.router.navigate(['/cards'])
    }
    else{
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


