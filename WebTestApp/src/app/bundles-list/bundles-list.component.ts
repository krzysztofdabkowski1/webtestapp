import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bundle } from '../shared/bundle.model';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { FolderNode, BundleNode, FOLDER_DATA,  searchFolder, searchBundle } from './folder-node';
import { CardDetailsService } from '../shared/card-details.service';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'bundles-list',
  templateUrl: './bundles-list.component.html',
  styleUrls: ['./bundles-list.component.css']
})
export class BundlesListComponent implements OnInit {

  bundles!:Bundle[] ;
  treeControl = new NestedTreeControl<FolderNode>(node => node.children);
  searchWordFormControl = new FormControl('', [ Validators.maxLength(100)]);
  dataSource = new MatTreeNestedDataSource<FolderNode>();
  private searchedWordSubject = new Subject<string>();
  DEBOUNCE_TIME:number = 300;
  searched_folders: FolderNode[] = [];
  searched_bundles: BundleNode[] = [];

  constructor(private router: Router,
              private dataService: CardDetailsService){
    this.dataSource.data = FOLDER_DATA;
   }

   hasChild = (_: number, node: FolderNode) => !!node.children && node.children.length > 0;
   hasBundleId = (_: number, node: FolderNode) => node.bundleId !== undefined;

  ngOnInit(): void {
    this.dataService.getBundles().subscribe( (bundles) => {
      this.bundles = bundles;
    } );

    this.searchedWordSubject.pipe(
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged())
      .subscribe((expr: string)=>{
        console.log(searchFolder(expr))
        this.searched_folders = searchFolder(expr);
        this.searched_bundles = searchBundle(expr);
  });
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

  searchExpression(expr: string){
    this.searchedWordSubject.next(expr);
  }

  toggleSideNav(){

  }
}
