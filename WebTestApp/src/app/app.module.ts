import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardSliderComponent } from './card-slider/card-slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditDescriptionComponent } from './edit-description/edit-description.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { EditExamplesComponent } from './edit-examples/edit-examples.component';
@NgModule({
  declarations: [
    AppComponent,
    CardSliderComponent,
    EditDescriptionComponent,
    EditExamplesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
