import { Component, OnInit } from '@angular/core';
import { CardDetails } from '../shared/card-details.model';
import { CardDetailsService } from '../shared/card-details.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  cardsJSON = this.readStringFromFileAtPath('cards.json');
  cards = JSON.parse(this.cardsJSON);
  quantity = this.cards.length;
  number = 1;
  isFront = true;
  actualCard: CardDetails = this.cards[0];
  
  frontCard = document.querySelector('.frontCard');
  backCard = document.querySelector('.backCard');
  counter = document.querySelector('.counterIcon');
  examples = document.querySelector('.examples');
  description = document.querySelector('.description');
  countryFlag:HTMLImageElement = document.querySelector('.countryFlag');
  card = document.querySelector('.card');
  sound = document.querySelector('.soundBtn');

  constructor(private dataService: CardDetailsService) { }

  ngOnInit(): void {
    this.dataService.getCards().subscribe( _cards => this.cards = _cards);

    
    this.frontCard.innerHTML = this.actualCard['frontTerm'];
    this.backCard.innerHTML = this.actualCard["reverseTerm"];
    this.counter.innerHTML = this.number + "/" + this.quantity;
    this.description.innerHTML = this.actualCard["description"];
    this.setExamples();
    this.countryFlag.src = this.getCountryCode(this.actualCard["frontLang"]);

    this.card.addEventListener( 'click', function(e) { 
      if(!(<HTMLButtonElement>e.target).classList.contains('nextBtn')) {
          this.card.classList.toggle('is-flipped');
          
      }
      if(this.card.classList.contains('is-flipped')){
          this.isFront = false;
          this.countryFlag.src = this.getCountryCode(this.actualCard["reverseLang"]);
      }
      else{
          this.isFront = true;
          this.countryFlag.src = this.getCountryCode(this.actualCard["frontLang"]);
      }

    });

    this.sound.addEventListener( 'click', function(e) { 
      let speech = new SpeechSynthesisUtterance();
      if(this.isFront){
          speech.lang = this.actualCard["frontLang"];
          speech.text = this.actualCard["frontTerm"];
      }
      else{
          speech.lang = this.actualCard["reverseLang"];
          speech.text = this.actualCard["reverseTerm"];    
      }

      window.speechSynthesis.speak(speech);
    });
  }


readStringFromFileAtPath(pathOfFileToReadFrom: string){
    var request = new XMLHttpRequest();
    request.open("GET", pathOfFileToReadFrom, false);
    request.send(null);
    var returnValue = request.responseText;

    return returnValue;
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

getCountryCode(countryName) {
  return 'https://lipis.github.io/flag-icon-css/flags/4x3/'+countryName+'.svg';
}

updateCard(){
  this.actualCard = this.cards[this.number];

  this.frontCard.innerHTML = this.actualCard["frontTerm"];
  this.backCard.innerHTML = this.actualCard["reverseTerm"];

  this.counter.innerHTML = this.number + "/" + this.quantity;

  this.setExamples();
}


showAndHideCardDescription(){
  const cardDesc = document.querySelector('.cardDescription');
  if( !cardDesc.classList.contains('showCardDescription')){
      cardDesc.classList.toggle('showCardDescription');
  }
  else{
      cardDesc.classList.toggle('hideCardDescription'); 
  }
      
}


hideCardDescription(){
  const cardDesc = document.querySelector('.cardDescription');
  if( cardDesc.classList.contains('showCardDescription')){
      cardDesc.classList.toggle('showCardDescription');
  }  
  if(cardDesc.classList.contains('hideCardDescription')){
      cardDesc.classList.toggle('hideCardDescription');
  }
}

nextCard(){
  if(this.number == this.quantity){
      this.number = 1;
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
  const container = document.querySelector('.container');
  this.hideCardDescription();
  container.classList.toggle('runNextCard');
  setTimeout(()=>{
      const container = document.querySelector('.container');
      container.classList.toggle('runNextCard');
      this.frontCard.classList.toggle('disappearTerm');
      this.backCard.classList.toggle('disappearTerm');
  }, 200);

}

previousCard(){
  if(this.number == 1){
      this.number = this.quantity;
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
  const container = document.querySelector('.container');
  this.hideCardDescription();
  container.classList.toggle('runPreviousCard');
  setTimeout(()=>{
      const container = document.querySelector('.container');
      container.classList.toggle('runPreviousCard');
      this.frontCard.classList.toggle('disappearTerm');
      this.backCard.classList.toggle('disappearTerm');
  }, 200);

}


}
