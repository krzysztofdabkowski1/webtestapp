import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardSliderComponent } from './card-slider/card-slider.component'
import { CreateBundleComponent } from './create-bundle/create-bundle.component';
import { CreateCardComponent } from './create-card/create-card.component';

const routes: Routes = [
  { path: 'cards', component: CardSliderComponent },
  { path: 'create-bundle', component: CreateBundleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }