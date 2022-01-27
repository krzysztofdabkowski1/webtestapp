import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  @Input() set cardId(value: number){
    console.log(value);
    this.id = value;
    let card:CardDetails = this.dataService.getCardById(this.id);
    this.examples = card.examples;
  }
  
  @Input()
  activeEditExamples!: boolean;

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
    this.examplesForm = this.formBuilder.group({
      content: ''
    });
    this.exampleIndex = undefined;
    
  }

  onSubmit(): void {
    // Process checkout data here
    if(this.exampleIndex === undefined){
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
    this.activeEditExamplesOutput.emit(false);
    this.examplesForm.reset();
  }

  deleteExample(index: number){
    this.examples.splice(index, 1);
  }

  editExample(index: number){
    this.exampleIndex = index;
    this.examplesForm.controls['content'].setValue(this.examples[this.exampleIndex]);
  }
}


