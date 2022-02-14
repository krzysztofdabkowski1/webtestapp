

export interface CardDetails{
    id: number ;
    nativeExpression: string;
    foreignExpression: string;
    nativeLang: string;
    foreignLang: string;
    description: string;
    examples: string[];
};

export class EmptyCard implements CardDetails{
    id = 0;
    nativeExpression = '';
    foreignExpression = '';
    nativeLang = '';
    foreignLang = '';
    description = '';
    examples = [];

}