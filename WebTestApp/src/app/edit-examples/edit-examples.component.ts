import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatLine } from '@angular/material/core';
import { HasElementRef } from '@angular/material/core/common-behaviors/color';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';

@Component({
  selector: 'edit-examples',
  templateUrl: './edit-examples.component.html',
  styleUrls: ['./edit-examples.component.css']
})
export class EditExamplesComponent implements OnInit {

  examples!: string[];
  id!: number;
  exampleIndex!: number | undefined;
  activeEditExamples: boolean = false;
  @ViewChild('myTextArea', {static: true})
  textAreaRef!: ElementRef;

  @Input() set cardId(value: number){
    this.id = value;
    this.activeEditExamples = false;
    this.examplesForm.reset();
    this.setExamples();
  }
  
  @ViewChild("myTextArea") set myTextAreaRef(ref: ElementRef) {
    if (!!ref) {
      ref.nativeElement.focus() ;
    }
  }


 
  examplesForm = this.formBuilder.group({
    content: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private dataService: CardDetailsService
  ) { }



  ngOnInit(): void {
    this.examplesForm = this.formBuilder.group({
      content: ''
    });
    this.exampleIndex = undefined;
    
  }


  onSubmit(): void {
    // Process checkout data here
    if(this.exampleIndex === undefined){
      console.log(this.examplesForm.controls['content'].value)
      this.examples.push(this.examplesForm.controls['content'].value);
    }
    else {
      this.examples[this.exampleIndex] = this.examplesForm.controls['content'].value;
    }
    this.dataService.setCardsExamplesById(this.id, this.examples );
    //this.activeEditExamplesOutput.emit(false);
    this.examplesForm.reset();
    this.exampleIndex = undefined;
  }

  cancel() {
    this.activeEditExamples = false;
    this.examplesForm.reset();
  }

  cancelEdit() {
    this.exampleIndex = undefined;
    this.examplesForm.reset();
  }

  deleteExample(index: number){
    this.examples.splice(index, 1);
  }

  editExample(index: number){
    this.exampleIndex = index;
    this.examplesForm.controls['content'].setValue(this.examples[this.exampleIndex]);
  }

  editExamples(e: Event): void {
    this.activeEditExamples = !this.activeEditExamples;
    this.setExamples();
  }

  setExamples(){
    let card:CardDetails = this.dataService.getCardById(this.id);
    if(card.examples === undefined){
      this.examples = []
    }
    else{
      this.examples = card.examples;
    }
    
    this.exampleIndex = undefined;

  }
}


