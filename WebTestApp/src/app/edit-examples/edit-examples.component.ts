import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';

@Component({
  selector: 'app-edit-examples',
  templateUrl: './edit-examples.component.html',
  styleUrls: ['./edit-examples.component.css']
})
export class EditExamplesComponent implements OnInit {


  @Input()
  cardId!: number;

  @Output()
  activeEditExamplesOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

  examplesForm = this.formBuilder.group({
    content: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private dataService: CardDetailsService
  ) { }

  ngOnInit(): void {
    let card:CardDetails = this.dataService.getCardById(this.cardId);
    this.examplesForm = this.formBuilder.group({
      content: card.description
    });
  }

  onSubmit(): void {
    // Process checkout data here
    //this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.examplesForm.value);
  
    this.dataService.setCardsDescriptionById(this.cardId, this.examplesForm.controls['content'].value );
    this.activeEditExamplesOutput.emit(false);
    this.examplesForm.reset();
  }

}
