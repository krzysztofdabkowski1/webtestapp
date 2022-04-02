import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DataService } from '../shared/data.service';
import { FolderNode } from '../shared/folder-node.model';

export class CreateFolderErrorStateMatcher implements ErrorStateMatcher {
  private _isNameAllowed: Boolean | undefined;
  setNamePermissiom(value: Boolean){
    this._isNameAllowed = value;
  }
  isErrorState(control: FormControl | null): boolean {
    return !!(control && (control.dirty || control.touched || this._isNameAllowed));
  }
}


@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  matcher = new CreateFolderErrorStateMatcher();
  private searchedFolderName = new Subject<string>();
  isNameAllowed: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.searchedFolderName.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe((expr: string)=>{
        console.log(this.dataService.isFolderNameAllowed(expr));
        this.isNameAllowed = this.dataService.isFolderNameAllowed(expr);
        this.matcher.setNamePermissiom(this.isNameAllowed);
  });
  }

  inputFolderNameChange(name: string){
    this.searchedFolderName.next(name);
  }

  addFolder(){
    if(this.isNameAllowed ){
      let newFolder: FolderNode = {name: this.nameFormControl.value};
      this.dataService.addFolder(newFolder);
    }

  }
}
