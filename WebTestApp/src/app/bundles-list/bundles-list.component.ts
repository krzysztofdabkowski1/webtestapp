import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bundles-list',
  templateUrl: './bundles-list.component.html',
  styleUrls: ['./bundles-list.component.css']
})
export class BundlesListComponent implements OnInit {

  bundles:number[] = [1,2,3]
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToBundle() {
    //const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that item.
    this.router.navigate(['/bundle', { id: 1 }]);
  }
}
