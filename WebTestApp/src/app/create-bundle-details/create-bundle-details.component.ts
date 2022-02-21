import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BundleCollectorService } from '../shared/bundle-collector.service';
import { BundleDetailsSubject } from './bundle-details-subject';

@Component({
  selector: 'create-bundle-details',
  templateUrl: './create-bundle-details.component.html',
  styleUrls: ['./create-bundle-details.component.css']
})
export class CreateBundleDetailsComponent implements OnInit {

  createBundleDetailsForm: any;
  bundleDetailsSubject: any;

  @Input() set validate(subject: Subject<Boolean>){
    subject.subscribe(
    ()=>{
      const required:HTMLTextAreaElement[] = document.querySelectorAll('.required') as unknown as HTMLTextAreaElement[];
      required.forEach( (r)=>{
        r.classList.add('warning');
      })
      let arrReq = Array.from(required);
      arrReq.find( r => r.value=='')?.focus()
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

  
    

    nameTextArea.addEventListener('input', ()=>{
        if(nameTextArea.value.length!==0){
          nameP.style.visibility = "visible";
        }
        else{
          nameP.style.visibility = "hidden";
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
  }

  ngOnSubmit(): void {
  }

  detectBundleNameChange(value: string){
    this.bundleDetailsSubject.updateBundleTitle(value);
  }

  detectBundleDescriptionChange(value: string){
    this.bundleDetailsSubject.updateBundleDescription(value);
  }

}
