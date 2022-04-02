import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { textChangeRangeIsUnchanged } from 'typescript';
import { BundleCollectorService } from '../shared/bundle-collector.service';
import { CardDetails } from '../shared/card-details.model';
import { DataService } from '../shared/data.service';
import { CardSubject } from './card-subject';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  private _failedSubmit: Boolean | undefined;
  setFailedSubmit(value: Boolean){
    this._failedSubmit = value;
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted || this._failedSubmit;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
  createCardForm: any;
  examples!: string[];
  id!: number;
  areNotesOpen: boolean = false;
  exampleIndex!: number | undefined;
  @Output() deleteThisCardEvent = new EventEmitter<boolean>();
  nativeWordFormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  foreignWordFormControl = new FormControl('',[Validators.required, Validators.maxLength(50)]);
  descriptionFormControl = new FormControl('', [ Validators.maxLength(500)]);
  exampleFormControl = new FormControl('',[ Validators.maxLength(150)])
  matcher = new MyErrorStateMatcher();
  preventAnimation: Boolean = true;

  @Input() numberOfCard: number | undefined;
  @Input() displayNumberOfCard: number | undefined;
  cardSubject!: CardSubject;

  @Input() set validate(subject: Subject<Boolean>){
    subject.subscribe(
    (value)=>{
      this.matcher.setFailedSubmit(value);
    })
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
    
    
    const cardDescription = document.querySelector('.cardDescription') as HTMLDivElement;

  
    if(this.numberOfCard && this.displayNumberOfCard){


    

    // descriptionTextArea[this.displayNumberOfCard-1].addEventListener('input', ()=>{
    //   if(this.displayNumberOfCard){
    //   if(descriptionTextArea[this.displayNumberOfCard-1].value.length!==0){
    //     descriptionP[this.displayNumberOfCard-1].style.visibility = "visible";
    //   }
    //   else{
    //     descriptionP[this.displayNumberOfCard-1].style.visibility = "hidden";
    //   }
    // }
    // });

  }
  }


  ngOnSubmit(): void {
    if(this.createCardForm.valid){
      let card: CardDetails = {"id": -1,
                            "bundleId": -1,
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
    this.exampleFormControl.setValue('');
  }

  deleteThisCard(){
    this.deleteThisCardEvent.emit(true);
  }
  showCardDescription(){
    if(this.preventAnimation){
      this.preventAnimation = false;
    }
    this.areNotesOpen = !this.areNotesOpen;
  }

  cancelEdit() {
    this.exampleIndex = undefined;
    this.exampleFormControl.setValue('');
  }

  saveEdit(index: number){
    this.examples[index] = this.exampleFormControl.value;
    this.exampleFormControl.setValue('');
    this.exampleIndex = undefined;
    this.changedExamples();
  }
  addExample(){
   
    console.log(this.exampleFormControl.value)
    this.examples.push(this.exampleFormControl.value);
    this.exampleFormControl.setValue('');
    this.changedExamples();
  }
  deleteExample(index: number){
    this.examples.splice(index, 1);
    this.changedExamples();
  }

  editExample(index: number){
    this.exampleIndex = index;
    this.exampleFormControl.setValue(this.examples[this.exampleIndex]);
  }


  setExamples(){
    this.examples = []
    this.exampleIndex = undefined;

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
