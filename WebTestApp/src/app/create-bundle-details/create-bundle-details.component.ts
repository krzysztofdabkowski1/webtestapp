import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Subject } from 'rxjs';
import { BundleCollectorService } from '../shared/bundle-collector.service';
import { BundleDetailsSubject } from './bundle-details-subject';
import {ErrorStateMatcher} from '@angular/material/core';

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
  selector: 'create-bundle-details',
  templateUrl: './create-bundle-details.component.html',
  styleUrls: ['./create-bundle-details.component.css']
})
export class CreateBundleDetailsComponent implements OnInit {

  createBundleDetailsForm: any;
  bundleDetailsSubject: any;
  colorValue: string = 'primary';

  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  nativeLanguageFormControl = new FormControl('', [Validators.required]);
  foreignLanguageFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  languages: {'text': string, 'country': string}[] = [
    {'text':'polski',
     'country': 'pl'},
     {'text':'angielski',
     'country': 'gb'},
     {'text':'niemiecki',
     'country': 'de'},
     {'text':'francuski',
     'country': 'fr'}
  ]
  selectedNativeLanguage: string = '';
  selectedForeignLanguage: string = '';
  @ViewChild('select' , {static: false}) select!: ElementRef;

  @Input() set validate(subject: Subject<Boolean>){
    subject.subscribe(
    (value)=>{
      if(value){
        this.matcher.setFailedSubmit(value);
        if(this.matcher.isErrorState(this.nameFormControl,null)){
          //
        }
      }
      
    })
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private bundleCollector: BundleCollectorService
  ) { }

  ngOnInit(): void {
    this.bundleDetailsSubject = new BundleDetailsSubject(this.bundleCollector);
    this.createBundleDetailsForm = this.formBuilder.group({
      bundleName: '',
      bundleDescription: ''
    });

    const nameTextArea = document.querySelector('#bundle-name-textarea') as HTMLTextAreaElement;
    const nameP = document.querySelector('#bundle-name') as HTMLElement;
    const descriptionTextArea = document.querySelector('#bundle-description-textarea') as HTMLTextAreaElement;
    const descriptionP = document.querySelector('#bundle-description') as HTMLElement;

    

    // nameTextArea.addEventListener('input', ()=>{
    //     if(nameTextArea.value.length!==0){
    //       nameP.style.visibility = "visible";
    //     }
    //     else{
    //       nameP.style.visibility = "hidden";
    //     }
    // });

  //   descriptionTextArea.addEventListener('input', ()=>{
  //     if(descriptionTextArea.value.length!==0){
  //       descriptionP.style.visibility = "visible";
  //     }
  //     else{
  //       descriptionP.style.visibility = "hidden";
  //     }
  // });
  }

  ngOnSubmit(): void {

  }

  detectBundleNameChange(value: string){
    this.bundleDetailsSubject.updateBundleTitle(value);
  }

  detectBundleDescriptionChange(value: string){
    this.bundleDetailsSubject.updateBundleDescription(value);
  }

  detectNativeLangChange(value: string){
    this.bundleDetailsSubject.updateNativeLang(value);
  }

  detectForeignLangChange(value: string){
    this.bundleDetailsSubject.updateForeignLang(value);
  }

}
