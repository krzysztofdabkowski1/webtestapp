import { Bundle } from "../shared/bundle.model";
import { CardDetails } from "../shared/card-details.model";

export class BundleValidator {

    bundle!: Bundle;
    constructor(bundle: Bundle){
        this.bundle = bundle;
    }

    areFieldsFilled(): boolean{
        let areAllFilled = true;
        this.bundle.cards.forEach( c => {
            if(c.nativeExpression == '' || c.foreignExpression == ''){
                console.log(c)
                areAllFilled = false;
            }
        })
        if(this.bundle.name==''){
            areAllFilled = false;
        }
        if(this.bundle.nativeLang=='' || this.bundle.foreignLang==''){
            areAllFilled = false;
        }
        return areAllFilled;
    }
}