import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardDetails } from './card-details.model';
import { Observable, of } from 'rxjs';
import { Bundle, EmptyBundle } from './bundle.model';
import { FolderNode } from './folder-node.model';
import { BundleNode } from './bundle-node.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  static baseUrl: string = 'http://api.fcmanager.pl/api/';
  
  constructor(private http: HttpClient) { 
 
  }

  bundles: Bundle[] = [
    {"name": "Fiszki #1",
      "bundleID": 1,
      "ownerID": 1,
      "startDate": new Date("2022-01-16"),
      "updateDate": new Date("2022-01-19"),
      "nativeLang": "pl",
      "foreignLang": "gb",
      "description": " to są fiszki",
      "isPublic": 0,
      "cardsQuantity": 0,
      "cards":[
    {
      "id": 1,
      "bundleId": 1,
      "nativeExpression": "rzeka konstantynopolitańczykowianeczka",
      "foreignExpression": "a river",
      "nativeLang": "pl",
      "foreignLang": "gb",
      "description": " it is a simple word, no description needed",
      "examples": [
        "first example",
        "secomd example",
        "third example"
      ]
  
    },
    {
      "id": 2,
      "bundleId": 1,
      "nativeExpression": "kolejka",
      "foreignExpression": "a queue",
      "nativeLang": "pl",
      "foreignLang": "gb",
      "description": " it is a simple word, no description needed",
      "examples": [
        "first example",
        "secomd example",
        "third example"
      ]
    },
    {
      "id": 3,
      "bundleId": 1,
      "nativeExpression": "rodzina",
      "foreignExpression": "something special",
      "nativeLang": "pl",
      "foreignLang": "gb",
      "description": " it is a simple word, no description needed",
      "examples": [
        "first example",
        "secomd example",
        "third example"
      ]
    }
  ]}];  

  
  FOLDER_DATA: FolderNode[] = [
    {
      name: 'Folder 1',
      folderId: 1,
      children: [
        {name: 'Fiszki long long long longer title example #1', bundleId: 1},
        {name: 'Fiszki #2', bundleId: 2},
        {name: 'Fiszki #3', bundleId: 3}
      ],
    },
    {
      name: 'Folder 2',
      folderId: 2,
      children: [
        {name: 'Fiszki long long long longer title example #1', bundleId: 1},
        {name: 'Fiszki #2', bundleId: 2},
        {name: 'Fiszki #3', bundleId: 3}
      ],
    },
    {
      name: 'Folder 3 long long very long folder name',
      folderId: 3,
      children: [
        {name: 'Fiszki long long long longer title example #1', bundleId: 1},
        {name: 'Fiszki #2', bundleId: 2},
        {name: 'Fiszki #3', bundleId: 3}
      ],
    },
    {
      name: 'Folder 4',
      folderId: 4,
      children: [
        {name: 'Fiszki long long long longer title example #1', bundleId: 1},
        {name: 'Fiszki #2', bundleId: 2},
        {name: 'Fiszki #3', bundleId: 3}
      ],
    },
  ];

  getFolders(): Observable<FolderNode[]>{
    const folders = this.FOLDER_DATA;
    return of(folders);
  }
  searchFolder(term: string): FolderNode[] {
    return this.FOLDER_DATA.filter( f=>{
      return f.name?.includes(term);
    })
  }
  searchBundle(term: string): BundleNode[] {
    let bundleNodeList: BundleNode[] = [];
    this.FOLDER_DATA.forEach( f =>{
      f.children?.forEach( c =>{
        bundleNodeList.push({
          "name": c.name,
          "folderName": f.name,
          "bundleId": c.bundleId
        })
      })
    })
    return bundleNodeList.filter( f=>{
      return f.name?.includes(term);
    })
  }

  addFolder(folder: FolderNode){
    folder.folderId = 0;
    this.FOLDER_DATA.push(folder);
  }

  isFolderNameAllowed(name: string): boolean{
    let isNameAllowed: FolderNode | undefined = this.FOLDER_DATA.find( f => f.name == name);
    if(isNameAllowed == undefined){
      return true;
    }
    else{
      return false;
    }
  }

  getCards(){
    let url = DataService.baseUrl+'Card';
    let c = this.http.get<{
      "id": number,
      "description": string,
      "cards_quantity": number,
      "created_at": Date,
      "native_lang": string,
      "foreign_lang": string,
      "is_public": number
    }[]>(url);

    let retData = [];
    c.subscribe( card =>{
      console.log(card)
    });

  }

  getLocalCards(): Observable<CardDetails[]> {
    const CARDS = this.bundles[0].cards;
    return of(CARDS);
  }

  getBundle(id: number): Observable<Bundle> {
    let searchedBundle = this.bundles.find( b => b.bundleID == id);
    if(searchedBundle){
      return of(searchedBundle)
    }
    else{
      throw 'No bundle found';
    }   
  }

  getBundles(): Observable<Bundle[]> {
    let url = DataService.baseUrl+'Bundle';
    let c = this.http.get<Bundle[]>(url);

    c.subscribe( card => console.log(card))

    return c;  
  }
  
  getBundleById(bundleId: number): Bundle {
    let bundle = this.bundles.find( b => b.bundleID == bundleId);
    if(!bundle){
      bundle = new EmptyBundle();
    }
    return bundle;
  }

  setCardsDescriptionById(id: number, bundleId: number, description: string){
    let bundle = this.bundles.find( b => b.bundleID == bundleId);
    if(bundle){
      let card = bundle.cards.find( c => c.id == id) as CardDetails;
      let index = bundle.cards.indexOf(card);
      bundle.cards[index].description = description;
    }
    
  }

  setCardsExamplesById(id: number, bundleId: number, examples: string[]){
    console.log(id+'   '+bundleId+'    '+examples)
    let bundle= this.bundles.find( b => b.bundleID == bundleId);
    if(bundle){
      let card = bundle.cards.find( c => c.id == id) as CardDetails;
      let index = bundle.cards.indexOf(card);
      bundle.cards[index].examples = examples;
    }
  }

  addCard(card: CardDetails){
    let maxId:number = Math.max.apply(Math, this.bundles[0].cards.map(function(c) { return c.id; }))
    card.id = maxId+1;
    this.bundles[0].cards.push(card)
  }
  
  addBundle(bundle:Bundle){
    bundle.startDate = new Date();
    this.bundles.push(bundle);
    console.log(JSON.stringify(this.bundles[1].name ))

  }

  getNewBundleId(){
    let maxId:number = Math.max.apply(Math, this.bundles.map(function(c) { return c.bundleID; }))
    return maxId + 1;
  }
}
