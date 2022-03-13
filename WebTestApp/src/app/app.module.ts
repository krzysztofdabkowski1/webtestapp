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
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateCardComponent } from './create-card/create-card.component';
import {AutosizeModule} from 'ngx-autosize';
import { CreateBundleComponent } from './create-bundle/create-bundle.component';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreateBundleDetailsComponent } from './create-bundle-details/create-bundle-details.component';
import { BundlesListComponent } from './bundles-list/bundles-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';

@NgModule({
  declarations: [
    AppComponent,
    CardSliderComponent,
    EditDescriptionComponent,
    EditExamplesComponent,
    NavBarComponent,
    CreateCardComponent,
    CreateBundleComponent,
    CreateBundleDetailsComponent,
    BundlesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    FormsModule, 
    ReactiveFormsModule, 
    AppRoutingModule,
    AutosizeModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatTreeModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
