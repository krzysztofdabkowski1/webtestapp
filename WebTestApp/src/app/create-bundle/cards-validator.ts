import { CardDetails } from "../shared/card-details.model";

export class CardsValidator {

    cards!: CardDetails[];
    constructor(cards: CardDetails[]){
        this.cards = cards;
    }

    areFieldsFilled(): boolean{
        let areAllFilled = true;
        this.cards.forEach( c => {
            if(c.nativeExpression == '' || c.foreignExpression == ''){
                areAllFilled = false;
            }
        })
        console.log(this.cards)
        return areAllFilled;
    }
}