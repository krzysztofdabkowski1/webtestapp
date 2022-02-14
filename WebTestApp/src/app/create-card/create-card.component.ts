import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { BundleCollectorService } from '../shared/bundle-collector.service';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';
import { CardSubject } from './card-subject';

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

  @Input() numberOfCard: number | undefined;
  cardSubject!: CardSubject;

  @Input() set unvalidated(value: Boolean){
  
    if(value == true){
      const required:HTMLTextAreaElement[] = document.querySelectorAll('.required') as unknown as HTMLTextAreaElement[];
      required.forEach( (r)=>{
        r.classList.add('warning');
      })
      let arrReq = Array.from(required);
      arrReq.find( r => r.value=='')?.focus()
      
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private bundleCollector: BundleCollectorService
  ) { }

  ngOnInit(): void {
    this.createCardForm = this.formBuilder.group({
      nativeWord: ['', Validators.required],
      foreignWord: ['', Validators.required],
      description: '',
      example: ''
    });

    this.cardSubject = new CardSubject(this.bundleCollector, this.numberOfCard!);
    this.setExamples();

    const foreignTextArea = document.querySelectorAll('#foreign-textarea') as unknown as HTMLTextAreaElement[];
    const foreignP = document.querySelectorAll('#foreign-p') as unknown as HTMLElement[];
    const nativeTextArea = document.querySelectorAll('#native-textarea') as unknown as HTMLTextAreaElement[];
    const nativeP = document.querySelectorAll('#native-p') as unknown as HTMLElement[];
    const descriptionTextArea = document.querySelectorAll('#description-textarea') as unknown as HTMLTextAreaElement[]
    const descriptionP = document.querySelectorAll('#description-p') as unknown as HTMLElement[];
    const exampleTextArea = document.querySelectorAll('#example-textarea') as unknown as HTMLTextAreaElement[];
    const exampleP = document.querySelectorAll('#example-p') as unknown as HTMLElement[];

    if(this.numberOfCard){

    

    foreignTextArea[this.numberOfCard-1].addEventListener('input', ()=>{
      if(this.numberOfCard){
        if(foreignTextArea[this.numberOfCard-1].value.length!==0){
          foreignP[this.numberOfCard-1].style.visibility = "visible";
        }
        else{
          foreignP[this.numberOfCard-1].style.visibility = "hidden";
        }
      } 
    });

    nativeTextArea[this.numberOfCard-1].addEventListener('input', ()=>{
      if(this.numberOfCard){
      if(nativeTextArea[this.numberOfCard-1].value.length!==0){
        nativeP[this.numberOfCard-1].style.visibility = "visible";
      }
      else{
        nativeP[this.numberOfCard-1].style.visibility = "hidden";
      }
    }
    });

    descriptionTextArea[this.numberOfCard-1].addEventListener('input', ()=>{
      if(this.numberOfCard){
      if(descriptionTextArea[this.numberOfCard-1].value.length!==0){
        descriptionP[this.numberOfCard-1].style.visibility = "visible";
      }
      else{
        descriptionP[this.numberOfCard-1].style.visibility = "hidden";
      }
    }
    });

    exampleTextArea[this.numberOfCard-1].addEventListener('input', ()=>{
      if(this.numberOfCard){
      if(exampleTextArea[this.numberOfCard-1].value.length!==0){
        exampleP[this.numberOfCard-1].style.visibility = "visible";
      }
      else{
        exampleP[this.numberOfCard-1].style.visibility = "hidden";
      }
    }
    });

  }
  }


  ngOnSubmit(): void {
    if(this.createCardForm.valid){
      let card: CardDetails = {"id": -1,
                            "nativeExpression": this.createCardForm.controls['nativeWord'].value,
                            "foreignExpression": this.createCardForm.controls['foreignWord'].value,
                            "nativeLang": "pl",
                            "foreignLang": "gb",
                            "description": this.createCardForm.controls['description'].value,
                            "examples": this.examples};
    this.examples = [];
    this.createCardForm.reset();
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
    this.changedExamples();
  }
  addExample(){
    const exampleP = document.querySelector('#example-p') as HTMLElement;
    exampleP.style.visibility = "hidden";
    this.examples.push(this.createCardForm.controls['example'].value);
    this.createCardForm.controls['example'].setValue('');
    this.changedExamples();
  }
  deleteExample(index: number){
    this.examples.splice(index, 1);
    this.changedExamples();
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


  detectNativeWordChange(expr: string){
    this.cardSubject.updateNativeWord(expr);
  }

  detectForeignWordChange(expr: string){
    this.cardSubject.updateForeignWord(expr);
  }

  detectDescriptionChange(expr: string){
    this.cardSubject.updateDescription(expr);
  }

  changedExamples(){
    this.cardSubject.updateExamples(this.examples);
  }
}
