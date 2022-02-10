import { Component, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCardComponent } from '../create-card/create-card.component';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bundleCardsID = [1,2,3];
  }

  addCard(){
    this.bundleCardsID.push(this.bundleCardsID.length+1);
  }

  cancel() {

    
  }

  submit(){
    this.saveCards = true;
    let interval = setInterval(()=>{
      if(this.isCollectingCardsfinished()){
        this.dataService.addBundle(this.bundle);
        this.bundle = [];
        clearInterval(interval);
        //this.router.navigate(['/cards'])
      }
    },100)
    
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
}
