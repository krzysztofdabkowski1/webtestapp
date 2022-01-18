import { Component, OnInit } from '@angular/core';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';

@Component({
  selector: 'card-slider-component',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.css']
})
export class CardSliderComponent implements OnInit {

   cards!:CardDetails[];  
   quantity!: number;
   number!: number;
   isFront!: boolean;
   actualCard!: CardDetails
  


  
  
  frontCard:HTMLDivElement = document.querySelector('.frontCard') as HTMLDivElement;
  backCard:HTMLDivElement = document.querySelector('.backCard') as HTMLDivElement;
  counter:HTMLDivElement = document.querySelector('.counterIcon') as HTMLDivElement;
  examples:HTMLDivElement = document.querySelector('.examples') as HTMLDivElement;
  description:HTMLDivElement = document.querySelector('.description') as HTMLDivElement;
  countryFlag:HTMLImageElement = document.querySelector('.countryFlag') as HTMLImageElement;
  card:HTMLDivElement = document.querySelector('.card') as HTMLDivElement;
  sound:HTMLButtonElement = document.querySelector('.soundBtn') as HTMLButtonElement;

  

  constructor(private dataService: CardDetailsService) { }

  ngOnInit(): void {
    this.dataService.getLocalCards().subscribe( _cards => {
      this.cards = _cards
      console.log(_cards);
    });
    console.log(this.cards);
    this.quantity = this.cards.length;
    this.number = 0;
    this.isFront = true;
    this.actualCard = this.cards[0];
    
    this.frontCard = document.querySelector('.frontCard') as HTMLDivElement;
    this.backCard = document.querySelector('.backCard') as HTMLDivElement;
    this.counter = document.querySelector('.counterIcon') as HTMLDivElement;
    this.examples = document.querySelector('.examples') as HTMLDivElement;
    this.description = document.querySelector('.description') as HTMLDivElement;
    this.countryFlag = document.querySelector('.countryFlag') as HTMLImageElement;
    this.card = document.querySelector('.card') as HTMLDivElement;
    this.sound = document.querySelector('.soundBtn') as HTMLButtonElement;


    

    
    this.frontCard.innerHTML = this.actualCard['nativeExpression'];
    this.backCard.innerHTML = this.actualCard["foreignExpression"];
    this.counter.innerHTML = this.number + 1 + "/" + this.quantity;
    this.description.innerHTML = this.actualCard["description"];
    this.setExamples();
    this.countryFlag.src = this.getCountryCode(this.actualCard["nativeExpression"]);

    let self = this;
    this.card.onclick = function(e) { 
      if(!(<HTMLButtonElement>e.target).classList.contains('nextBtn')) {
          (self.card as HTMLDivElement).classList.toggle('is-flipped');
          
      }
      if(self.card.classList.contains('is-flipped')){
          self.isFront = false;
          self.countryFlag.src = self.getCountryCode(self.actualCard["foreignLang"]);
      }
      else{
          self.isFront = true;
          self.countryFlag.src = self.getCountryCode(self.actualCard["nativeLang"]);
      }

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
  return 'https://lipis.github.io/flag-icon-css/flags/4x3/'+countryName+'.svg';
}

updateCard(){
  this.actualCard = this.cards[this.number];

  this.frontCard.innerHTML = this.actualCard["nativeExpression"];
  this.backCard.innerHTML = this.actualCard["foreignExpression"];

  this.counter.innerHTML = this.number + 1 + "/" + this.quantity;

  this.setExamples();
}


showAndHideCardDescription(){
  const cardDesc:HTMLDivElement = document.querySelector('.cardDescription') as HTMLDivElement;
  if( !cardDesc.classList.contains('showCardDescription')){
      cardDesc.classList.toggle('showCardDescription');
  }
  else{
      cardDesc.classList.toggle('hideCardDescription'); 
  }
      
}


hideCardDescription(){
  const cardDesc:HTMLDivElement = document.querySelector('.cardDescription') as HTMLDivElement;
  if( cardDesc.classList.contains('showCardDescription')){
      cardDesc.classList.toggle('showCardDescription');
  }  
  if(cardDesc.classList.contains('hideCardDescription')){
      cardDesc.classList.toggle('hideCardDescription');
  }
}

nextCard(){
  if(this.number == this.quantity){
      this.number = 0;
  }
  else {
      this.number += 1;
  }
  this.updateCard();
  if(this.card.classList.contains('is-flipped')){
      this.card.classList.toggle('is-flipped');
  }
  this.frontCard.classList.toggle('disappearTerm');
  this.backCard.classList.toggle('disappearTerm');
  const container: HTMLDivElement = document.querySelector('.container') as HTMLDivElement;
  this.hideCardDescription();
  container.classList.toggle('runNextCard');
  setTimeout(()=>{
      //const container = document.querySelector('.container');
      container.classList.toggle('runNextCard');
      this.frontCard.classList.toggle('disappearTerm');
      this.backCard.classList.toggle('disappearTerm');
  }, 200);

}

previousCard(){
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
  this.frontCard.classList.toggle('disappearTerm');
  this.backCard.classList.toggle('disappearTerm');
  const container: HTMLDivElement = document.querySelector('.container') as HTMLDivElement;
  this.hideCardDescription();
  container.classList.toggle('runPreviousCard');
  setTimeout(()=>{
      //const container = document.querySelector('.container');
      container.classList.toggle('runPreviousCard');
      this.frontCard.classList.toggle('disappearTerm');
      this.backCard.classList.toggle('disappearTerm');
  }, 200);

}


}

