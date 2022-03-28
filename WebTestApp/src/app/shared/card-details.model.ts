
export interface CardDetails{
    id: number ;
    bundleId: number;
    nativeExpression: string;
    foreignExpression: string;
    nativeLang: string;
    foreignLang: string;
    description: string;
    examples: string[];
};


export class Card implements CardDetails{
    id = 0;
    bundleId = 0;
    nativeExpression = '';
    foreignExpression = '';
    nativeLang = '';
    foreignLang = '';
    description = '';
    examples = [];

    constructor(id:number, bundleId: number){
        this.id = id;
        this.bundleId = bundleId;
    }

}