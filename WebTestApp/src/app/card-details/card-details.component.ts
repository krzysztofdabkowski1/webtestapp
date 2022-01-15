import { Component, OnInit } from '@angular/core';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  cards: CardDetails[] = [
    {"cardDetailsID": 1, "nativeExpression": "drzewo","foriegnExpression":"a tree","nativeLang":1,"foreignLang":2},
    {"cardDetailsID": 2, "nativeExpression": "las","foriegnExpression":"a forest","nativeLang":1,"foreignLang":2}
  ];
  constructor(private dataService: CardDetailsService) { }

  ngOnInit(): void {
    this.dataService.getCards().subscribe( _cards => this.cards = _cards);
  }

}
