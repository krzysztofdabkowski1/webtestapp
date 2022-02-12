import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
import { BundleCollectorService } from "../shared/bundle-collector.service";
const DEBOUNCE_TIME:number = 300;

export class CardSubject {

    
    private nativeWordSubject = new Subject<string>();
    private foreignWordSubject = new Subject<string>();
    private descriptionSubject = new Subject<string>();
    private examplesSubject = new Subject<string[]>();
    
    constructor(
        private bundleCollector: BundleCollectorService,
        private numberOfCard: number
    ){
        this.nativeWordSubject.pipe(
            debounceTime(DEBOUNCE_TIME),
            distinctUntilChanged())
            .subscribe((expr: string)=>{
              if(this.numberOfCard){
                this.bundleCollector.updateNativeWord(this.numberOfCard, expr);
              }
        });

        this.foreignWordSubject.pipe(
            debounceTime(DEBOUNCE_TIME),
            distinctUntilChanged())
            .subscribe((expr: string)=>{
                if(this.numberOfCard){
                this.bundleCollector.updateForeignWord(this.numberOfCard, expr);
                }
        });

        this.descriptionSubject.pipe(
            debounceTime(DEBOUNCE_TIME),
            distinctUntilChanged())
            .subscribe((expr: string)=>{
                if(this.numberOfCard){
                this.bundleCollector.updateDescription(this.numberOfCard, expr);
                }
        });

        this.examplesSubject.subscribe((expr: string[])=>{
                if(this.numberOfCard){
                this.bundleCollector.updateExamples(this.numberOfCard, expr);
                }
        });
    }


    updateNativeWord(expr: string){
        this.nativeWordSubject.next(expr);
    }

    updateForeignWord(expr: string){
        this.foreignWordSubject.next(expr);
    }

    updateDescription(expr: string){
        this.descriptionSubject.next(expr);
    }

    updateExamples(expr: string[]){
        this.examplesSubject.next(expr);
    }
}