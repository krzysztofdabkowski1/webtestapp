import { Component, OnInit } from '@angular/core';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';
import {MatIconModule} from '@angular/material/icon';
import { EditDescriptionComponent } from '../edit-description/edit-description.component';

@Component({
  selector: 'card-slider-component',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.css']
})
export class CardSliderComponent implements OnInit {

   cards!:CardDetails[];  
   cardID:number = 0;
   activeEditDescription: boolean = false;
   quantity!: number;
   number!: number;
   clickedNextCard!: boolean;
   isFront!: boolean;
   isNotesOn!:boolean;
   actualCard!: CardDetails
  


  
  
  frontCard:HTMLDivElement = document.querySelector('.frontCard') as HTMLDivElement;
  backCard:HTMLDivElement = document.querySelector('.backCard') as HTMLDivElement;
  counter:HTMLDivElement = document.querySelector('.counter') as HTMLDivElement;
  progress:HTMLDivElement = document.querySelector('.progress-bar') as HTMLDivElement;
  examples:HTMLDivElement = document.querySelector('.examplesContent') as HTMLDivElement;
  description:HTMLDivElement = document.querySelector('.descriptionContent') as HTMLDivElement;
  countryFlag:HTMLImageElement = document.querySelector('.countryFlag') as HTMLImageElement;
  countryFlagForeign:HTMLImageElement = document.querySelector('.countryFlagForeign') as HTMLImageElement;
  card:HTMLDivElement = document.querySelector('.card') as HTMLDivElement;
  sound:HTMLButtonElement = document.querySelector('.soundBtn') as HTMLButtonElement;
  word:HTMLButtonElement []= document.querySelectorAll('.word') as unknown as HTMLButtonElement[];
  iconsContainer:HTMLDivElement = document.querySelector('.iconsContainer') as HTMLDivElement;
  cardContainer:HTMLDivElement = document.querySelector('.cardContainer') as HTMLDivElement;
  cardContainerReverse:HTMLDivElement = document.querySelector('.cardContainerReverse') as HTMLDivElement;
  container:HTMLDivElement = document.querySelector('.container') as HTMLDivElement;
  

  constructor(private dataService: CardDetailsService) { }

  ngOnInit(): void {
    this.dataService.getLocalCards().subscribe( _cards => {
      this.cards = _cards
      console.log(_cards);
    });
    console.log(this.cards);
    this.quantity = this.cards.length;
    this.number = 0;
    this.clickedNextCard = false;
    this.isFront = true;
    this.isNotesOn = false;
    this.actualCard = this.cards[0];
    
    this.frontCard = document.querySelector('.frontCard') as HTMLDivElement;
    this.backCard = document.querySelector('.backCard') as HTMLDivElement;
    this.counter = document.querySelector('.counter') as HTMLDivElement;
    this.progress= document.querySelector('.progress-bar') as HTMLDivElement;
    this.examples = document.querySelector('.examplesContent') as HTMLDivElement;
    this.description = document.querySelector('.descriptionContent') as HTMLDivElement;
    this.countryFlag = document.querySelector('.countryFlag') as HTMLImageElement;
    this.countryFlagForeign = document.querySelector('.countryFlagForeign') as HTMLImageElement;
    this.card = document.querySelector('.card') as HTMLDivElement;
    this.sound = document.querySelector('.soundBtn') as HTMLButtonElement;
    this.word = document.querySelectorAll('.word') as unknown as HTMLButtonElement[];
    this.iconsContainer= document.querySelector('.iconsContainer') as HTMLDivElement;
    this.cardContainer = document.querySelector('.cardContainer') as HTMLDivElement;
    this.cardContainerReverse = document.querySelector('.cardContainerReverse') as HTMLDivElement;
    this.container = document.querySelector('.container') as HTMLDivElement;

    
    this.cardContainer.style.display='flex';
    this.cardContainerReverse.style.display='none';

    this.frontCard.innerHTML = this.actualCard['nativeExpression'];
    this.backCard.innerHTML = this.actualCard["foreignExpression"];
    this.counter.innerHTML = this.number + 1 + "/" + this.quantity;
    this.description.innerHTML = this.actualCard["description"];
    this.setExamples();
    this.countryFlag.src = this.getCountryCode(this.actualCard["nativeLang"]);
    this.countryFlagForeign.src = this.getCountryCode(this.actualCard["foreignLang"]);

    let self = this;
    this.card.onclick = function(e) { 
      console.log('start'+self.card.classList.contains('is-flipped'));
      
      if(self.clickedNextCard ) {
           
          self.clickedNextCard = false;
      }
      else{
        if(!self.isNotesOn ){
          self.card.classList.toggle('is-flipped');
        }
           
      }

      if(self.card.classList.contains('is-flipped')){
          self.isFront = false;
          self.cardContainer.style.display='none';
          setTimeout(()=>{
            self.cardContainerReverse.style.display='flex';
          },150);
          
          //self.countryFlag.src = self.getCountryCode(self.actualCard["foreignLang"]);
          if(self.iconsContainer.classList.contains('disappearIcons')){
            //self.iconsContainer.classList.toggle('appearIcons');
            //self.frontCard.classList.toggle('appearIcons');
          }
          else{
            //self.iconsContainer.classList.toggle('disappearIcons');
            //self.frontCard.classList.toggle('disappearIcons');
          }
          //self.cardContainer.style.backfaceVisibility='hidden';
          //self.cardContainerReverse.style.backfaceVisibility='visible';
          
      }
      else{
        self.cardContainerReverse.style.display='none';
        setTimeout(()=>{
          self.cardContainer.style.display='flex';       
        },150);
        
          self.isFront = true;
          //self.countryFlag.src = self.getCountryCode(self.actualCard["nativeLang"]);
          //self.iconsContainer.classList.toggle('appearIcons');
          //self.frontCard.classList.toggle('appearIcons');
          //self.cardContainer.style.backfaceVisibility='visible';
          //self.cardContainerReverse.style.backfaceVisibility='hidden';
      }
      console.log('end'+self.card.classList.contains('is-flipped'));
    };

    this.sound.addEventListener( 'click', function(e) { 
      let speech = new SpeechSynthesisUtterance();
      if(self.isFront){
          speech.lang = self.actualCard["nativeLang"];
          speech.text = self.actualCard["nativeExpression"];
      }
      else{
          speech.lang = self.actualCard["foreignLang"];
          speech.text = self.actualCard["foreignExpression"];    
      }

      window.speechSynthesis.speak(speech);
    });

    this.word.forEach( w => {
      w.addEventListener( 'click', function(e) { 
        let speech = new SpeechSynthesisUtterance();
        if(self.isFront){
            speech.lang = self.actualCard["nativeLang"];
            speech.text = self.actualCard["nativeExpression"];
        }
        else{
            speech.lang = self.actualCard["foreignLang"];
            speech.text = self.actualCard["foreignExpression"];    
        }
  
        window.speechSynthesis.speak(speech);
      });
    });
    
  }




setExamples(){
    let examplesListString = '<ul>';
    this.actualCard["examples"].forEach(e => {
        examplesListString += '<li>' + e + '</li>'
    });
    examplesListString += '</ul>';
    this.examples.innerHTML = examplesListString;
    console.log(examplesListString);
}

getCountryCode(countryName: string) {
  return 'assets/4x3/'+countryName+'.svg';
}

updateCard(){
  this.actualCard = this.cards[this.number];

  this.frontCard.innerHTML = this.actualCard["nativeExpression"];
  this.backCard.innerHTML = this.actualCard["foreignExpression"];

  this.counter.innerHTML = this.number + 1 + "/" + this.quantity;

  let percentage: number = ((this.number + 1)  /this.quantity) * 100;
  this.progress.ariaValueNow = <string> <unknown> percentage ;
  this.progress.style.width = percentage+'%';

  this.description.innerHTML = this.actualCard["description"];
  this.setExamples();
}


showAndHideCardDescription(){
  
  const cardDesc:HTMLDivElement = document.querySelector('.cardDescription') as HTMLDivElement;
  if( !cardDesc.classList.contains('showCardDescription')){
      cardDesc.classList.toggle('showCardDescription');
      
  }
  else{
      cardDesc.classList.toggle('hideCardDescription'); 
      this.isNotesOn = false;
  }
  this.isNotesOn = true;
  setTimeout( ()=>{
    this.isNotesOn = false;
  }, 100);
}


hideCardDescription(){
  this.isNotesOn = false;
  const cardDesc:HTMLDivElement = document.querySelector('.cardDescription') as HTMLDivElement;
  if( cardDesc.classList.contains('showCardDescription')){
      cardDesc.classList.toggle('showCardDescription');
  }  
  if(cardDesc.classList.contains('hideCardDescription')){
      cardDesc.classList.toggle('hideCardDescription');
  }
}

nextCard(){
  this.clickedNextCard = true;
  if(this.number == this.quantity-1){
      this.number = 0;
  }
  else {
      this.number += 1;
  }
  this.updateCard();
  if(this.card.classList.contains('is-flipped')){
      this.card.classList.toggle('is-flipped');
  }
  //this.frontCard.classList.toggle('disappearTerm');
  //this.backCard.classList.toggle('disappearTerm');
  const container: HTMLDivElement = document.querySelector('.container') as HTMLDivElement;
  this.hideCardDescription();
  container.classList.toggle('runNextCard');
  setTimeout(()=>{
      //const container = document.querySelector('.container');
      container.classList.toggle('runNextCard');
      //this.frontCard.classList.toggle('disappearTerm');
      //this.backCard.classList.toggle('disappearTerm');
  }, 200);

}

previousCard(){
  this.clickedNextCard = true;
  if(this.number == 0){
      this.number = this.quantity - 1;
  }
  else {
      this.number -= 1;
  }
  this.updateCard();
  if(this.card.classList.contains('is-flipped')){
      this.card.classList.toggle('is-flipped');
  }
  //this.frontCard.classList.toggle('disappearTerm');
  //this.backCard.classList.toggle('disappearTerm');
  const container: HTMLDivElement = document.querySelector('.container') as HTMLDivElement;
  this.hideCardDescription();
  container.classList.toggle('runPreviousCard');
  setTimeout(()=>{
      //const container = document.querySelector('.container');
      container.classList.toggle('runPreviousCard');
      //this.frontCard.classList.toggle('disappearTerm');
      //this.backCard.classList.toggle('disappearTerm');
  }, 200);

}

reloadDescription():void {
  this.description = document.querySelector('.descriptionContent') as HTMLDivElement;
}
editDescription():void {
  this.activeEditDescription = true;
  this.description.style.display="none";
}

getEditDescriptionStatus(active: any){
  this.activeEditDescription = active as boolean;
  this.description.style.display="flex";
  this.updateCard();
}

}

