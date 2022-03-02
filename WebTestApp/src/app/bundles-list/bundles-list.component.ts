import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bundle } from '../shared/bundle.model';

import { CardDetailsService } from '../shared/card-details.service';

@Component({
  selector: 'bundles-list',
  templateUrl: './bundles-list.component.html',
  styleUrls: ['./bundles-list.component.css']
})
export class BundlesListComponent implements OnInit {

  bundles!:Bundle[] ;
  constructor(
    private router: Router,
    private dataService: CardDetailsService
  ) { }

  ngOnInit(): void {
    this.dataService.getBundles().subscribe( (bundles) => {
      this.bundles = bundles;
    } )
  }
  getDate(bundle: Bundle){
    if(bundle.updateDate === undefined){
      return 'Dodano: '+bundle.startDate.getDate()+' '+this.getMonth(bundle.startDate.getMonth())+ ' '+ bundle.startDate.getFullYear();
    }
    else{
      return 'Aktualizowano: '+bundle.updateDate.getDate()+' '+this.getMonth(bundle.updateDate.getMonth())+ ' '+ bundle.updateDate.getFullYear();
    
    }

  }

  getMonth(month: number){
    switch(month){
      case 0:
        return 'Stycznia';
      case 1:
        return 'Lutego';
      case 2:
        return 'Marca';
      case 3:
        return 'Kwietnia';
      case 4:
        return 'Maja';
      case 5:
        return 'Czerwca';
      case 6:
        return 'Lipca';
      case 7:
        return 'Sierpnia';
      case 8:
        return 'Września';
      case 9:
        return 'Października';
      case 10:
        return 'Listopda';
      case 11:
        return 'Grudnia';
      default:
        return '';
    }
  }

  goToBundle() {
    //const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that item.
    this.router.navigate(['/bundle', { id: 1 }]);
  }
}
