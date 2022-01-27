import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isTemplateExpression } from 'typescript';
import { FormBuilder } from '@angular/forms';
import { CardDetailsService } from '../shared/card-details.service';
import { CardDetails } from '../shared/card-details.model';

@Component({
  selector: 'edit-description',
  templateUrl: './edit-description.component.html',
  styleUrls: ['./edit-description.component.css']
})
export class EditDescriptionComponent implements OnInit {

  @Input()
  cardId!: number;

  @Output()
  activeEditDescriptionOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

  descriptionForm = this.formBuilder.group({
    content: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private dataService: CardDetailsService
  ) { }

  ngOnInit(): void {
    let card:CardDetails = this.dataService.getCardById(this.cardId);
    this.descriptionForm = this.formBuilder.group({
      content: card.description
    });
  }

  onSubmit(): void {
    // Process checkout data here
    //this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.descriptionForm.value);
  
    this.dataService.setCardsDescriptionById(this.cardId, this.descriptionForm.controls['content'].value );
    this.activeEditDescriptionOutput.emit(false);
    this.descriptionForm.reset();
  }

  cancel() {
    this.activeEditDescriptionOutput.emit(false);
    this.descriptionForm.reset();
  }

}
