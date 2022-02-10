import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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

  id!: number;
  description!:string;
  activeEditDescription!: boolean;

  @Input() set cardId(value: number){
    
    this.id = value;
    this.activeEditDescription = false;
    this.setDescription();
  }

  @ViewChild("myTextArea") set myTextAreaRef(ref: ElementRef) {
    if (!!ref) {
      ref.nativeElement.focus() ;
    }
  }
 
  descriptionForm = this.formBuilder.group({
    content: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private dataService: CardDetailsService
  ) { }

  ngOnInit(): void {
    //this.setDescription();
  }

  onSubmit(): void {
    // Process checkout data here
    //this.items = this.cartService.clearCart();
    console.warn('Ustawiono opis:', this.descriptionForm.value, 'card id:' + this.id);
    this.description = this.descriptionForm.controls['content'].value;
    this.dataService.setCardsDescriptionById(this.id, this.description );
    //this.activeEditDescriptionOutput.emit(false);
    this.setDescription();
    this.activeEditDescription = false;
  }

  

  cancel() {
    this.activeEditDescription = false;
    //this.activeEditDescriptionOutput.emit(false);
    this.setDescription();
  }

  private setDescription(){
    let card:CardDetails = this.dataService.getCardById(this.id);
    this.description = card.description;
    this.descriptionForm.controls['content'].setValue(this.description);
  }

  editDescription(){
    this.activeEditDescription = !this.activeEditDescription;
    this.setDescription();
  }
}
