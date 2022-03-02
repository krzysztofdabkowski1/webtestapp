import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
import { BundleCollectorService } from "../shared/bundle-collector.service";
const DEBOUNCE_TIME:number = 300;

export class BundleDetailsSubject {

    
    private titleSubject = new Subject<string>();
    private descriptionSubject = new Subject<string>();

    
    constructor(
        private bundleCollector: BundleCollectorService
    ){
        this.titleSubject.pipe(
            debounceTime(DEBOUNCE_TIME),
            distinctUntilChanged())
            .subscribe((expr: string)=>{
                if(expr)
                    this.bundleCollector.updateBundleTitle( expr);
        });

        this.descriptionSubject.pipe(
            debounceTime(DEBOUNCE_TIME),
            distinctUntilChanged())
            .subscribe((expr: string)=>{
                if(expr)
                    this.bundleCollector.updateBundleDescription( expr);
        });


        
    }


    updateBundleTitle(expr: string){
        this.titleSubject.next(expr);
    }

    updateBundleDescription(expr: string){
        this.descriptionSubject.next(expr);
    }

    updateNativeLang(expr: string){
        this.bundleCollector.updateNativeLang(expr);
    }

    updateForeignLang(expr: string){
        this.bundleCollector.updateForeignLang(expr);
    }
}