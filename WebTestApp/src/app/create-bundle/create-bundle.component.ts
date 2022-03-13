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

  hoverAddCard: Boolean = false;

  bundleCardsID: {'id':number,'displayId':number}[] = [];

  validate: Subject<Boolean> = new Subject();
  bundle:CardDetails[] = [];

  constructor(
    private dataService: CardDetailsService,
    private bundleCollector: BundleCollectorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.bundleCardsID = [{'id':1, 'displayId':1},
    {'id':2, 'displayId':2},
    {'id':3, 'displayId':3}];
    this.bundleCollector.addEmptyCard(1);
    this.bundleCollector.addEmptyCard(2);
    this.bundleCollector.addEmptyCard(3);
  }

  addCard(){
    let maxDisplayId = this.getDisplayId();
    let maxId = this.getId();
 
    this.bundleCardsID.push({'displayId':maxDisplayId, 'id': maxId});
    this.bundleCollector.addEmptyCard(maxId);
    
    
  }

  getDisplayId(): number{
    let maxDisplayId: number = Math.max.apply(Math, this.bundleCardsID.map(function(c) { return c.displayId; }))
    maxDisplayId += 1;
    if( maxDisplayId == -Infinity){
      maxDisplayId = 1;
    }
    return maxDisplayId;
  }

  getId(): number{
    let maxId: number = Math.max.apply(Math, this.bundleCardsID.map(function(c) { return c.id; }))
    maxId += 1;
    if( maxId == -Infinity){
      maxId = 1;
    }
    return maxId;
  }
  cancel() {

    
  }

  submit(){
    this.validate.next(true);
    let bundle: Bundle = Object.assign({},this.bundleCollector.getBundle() );
    let validator = new BundleValidator(bundle);
    if(validator.areFieldsFilled()){
      this.dataService.addBundle(bundle);
      this.bundleCollector.clear();
      this.openSnackBar("Dodano zestaw kart!", bundle.cards.length.toString());
      this.router.navigate(['/bundles'])
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

  deleteCard(id: number){
    let card: HTMLElement = document.querySelector('#card-'+String(id)) as HTMLElement;
    let cardContainer: HTMLElement = document.querySelector('#card-container-'+String(id)) as HTMLElement;
    card.classList.toggle('move-to-right');
    cardContainer.classList.toggle('height-to-zero');
    setTimeout(() =>{
      
      card?.remove();
      this.bundleCollector.deleteCard(id);
      this.bundleCardsID = this.bundleCardsID.filter(b => b.id !== id);
      
      let num = 1;
      this.bundleCardsID.forEach( b=> {
        b.displayId = num;
        num += 1;
      })
    },1000);
    
  }

  deleteRequest(event:any, id:number){
    if(event){
      this.deleteCard(id);
    }
  }
}


