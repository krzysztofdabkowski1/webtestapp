import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
  createCardForm: any;
  examples!: string[];
  id!: number;
  exampleIndex!: number | undefined;

  @Output() savedCard = new EventEmitter<CardDetails>();
  @Input() numberOfCard: number | undefined;
  
  @Input() set save(value: Boolean){
    if(value == true){
      this.ngOnSubmit();
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private dataService: CardDetailsService
  ) { }

  ngOnInit(): void {
    this.createCardForm = this.formBuilder.group({
      nativeWord: ['', Validators.required],
      foreignWord: ['', Validators.required],
      description: '',
      example: ''
    });

    this.setExamples();

    const foreignTextArea = document.querySelector('#foreign-textarea') as HTMLTextAreaElement;
    const foreignP = document.querySelector('#foreign-p') as HTMLElement;
    const nativeTextArea = document.querySelector('#native-textarea') as HTMLTextAreaElement;
    const nativeP = document.querySelector('#native-p') as HTMLElement;
    const descriptionTextArea = document.querySelector('#description-textarea') as HTMLTextAreaElement;
    const descriptionP = document.querySelector('#description-p') as HTMLElement;
    const exampleTextArea = document.querySelector('#example-textarea') as HTMLTextAreaElement;
    const exampleP = document.querySelector('#example-p') as HTMLElement;


    foreignTextArea.addEventListener('input', ()=>{
      if(foreignTextArea.value.length!==0){
        foreignP.style.visibility = "visible";
      }
      else{
        foreignP.style.visibility = "hidden";
      }
    });

    nativeTextArea.addEventListener('input', ()=>{
      if(nativeTextArea.value.length!==0){
        nativeP.style.visibility = "visible";
      }
      else{
        nativeP.style.visibility = "hidden";
      }
    });

    descriptionTextArea.addEventListener('input', ()=>{
      if(descriptionTextArea.value.length!==0){
        descriptionP.style.visibility = "visible";
      }
      else{
        descriptionP.style.visibility = "hidden";
      }
    });

    exampleTextArea.addEventListener('input', ()=>{
      if(exampleTextArea.value.length!==0){
        exampleP.style.visibility = "visible";
      }
      else{
        exampleP.style.visibility = "hidden";
      }
    });

  }

  ngOnSubmit(): void {
    // Process checkout data here
    //this.items = this.cartService.clearCart();
    // console.warn('Ustawiono opis:', this.descriptionForm.value, 'card id:' + this.id);
    if(this.createCardForm.valid){
      let card: CardDetails = {"id": -1,
                            "nativeExpression": this.createCardForm.controls['nativeWord'].value,
                            "foreignExpression": this.createCardForm.controls['foreignWord'].value,
                            "nativeLang": "pl",
                            "foreignLang": "gb",
                            "description": this.createCardForm.controls['description'].value,
                            "examples": this.examples};
    // this.description = this.descriptionForm.controls['content'].value;
    //this.dataService.addCard(card);
    this.examples = [];
    this.createCardForm.reset();
    this.savedCard.emit(card);
    }
    else{
      
    }
    
  }

  cancel() {
    this.createCardForm.controls['example'].setValue('');
    const exampleP = document.querySelector('#example-p') as HTMLElement;
    exampleP.style.visibility = 'hidden'
    
  }

  showCardDescription(){
    if(this.numberOfCard){
      const cardDesc:HTMLDivElement[] = document.querySelectorAll('.cardDescription') as unknown as HTMLDivElement[];
      if( !cardDesc[this.numberOfCard-1].classList.contains('showCardDescription')){
          cardDesc[this.numberOfCard-1].classList.toggle('showCardDescription');
          
      }
      else{
          cardDesc[this.numberOfCard-1].classList.toggle('hideCardDescription'); 
    
      }
    }

  }

  cancelEdit() {
    this.exampleIndex = undefined;
    this.createCardForm.controls['example'].setValue('');
    this.showExampleInput();
  }

  saveEdit(index: number){
      this.examples[index] = this.createCardForm.controls['example'].value;
    
    this.createCardForm.controls['example'].setValue('');
    this.exampleIndex = undefined;
    this.showExampleInput();
  }
  addExample(){
    const exampleP = document.querySelector('#example-p') as HTMLElement;
    exampleP.style.visibility = "hidden";
    this.examples.push(this.createCardForm.controls['example'].value);
    this.createCardForm.controls['example'].setValue('');
  }
  deleteExample(index: number){
    this.examples.splice(index, 1);
  }

  editExample(index: number){
    this.exampleIndex = index;
    this.createCardForm.controls['example'].setValue(this.examples[this.exampleIndex]);
    this.hideExampleInput();
    const exampleP = document.querySelector('#example-p') as HTMLElement;
    exampleP.style.visibility = 'hidden'
  }


  setExamples(){
    this.examples = []
    this.exampleIndex = undefined;

  }

  hideExampleInput(){
    const newExample = document.querySelector('#new-example') as HTMLElement;
    newExample.style.display = 'none';
  }
  showExampleInput(){
    const newExample = document.querySelector('#new-example') as HTMLElement;
    newExample.style.display = 'flex';
  }

  get nativeWord() { return this.createCardForm.get('nativeWord'); }
}
