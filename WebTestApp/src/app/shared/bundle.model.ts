import { Injectable } from "@angular/core";
import { VoidExpression } from "typescript";
import { CardDetails } from "./card-details.model";

export interface Bundle{
    name: string;
    bundleID: number;
    ownerID: number;
    startDate: Date;
    updateDate: Date | undefined;
    description: string;
    nativeLang: string;
    foreignLang: string;
    cards: CardDetails[];

};

export class EmptyBundle implements Bundle{
    name: string = '';
    bundleID: number = 0;
    ownerID: number = 0;
    startDate: Date = new Date();
    updateDate: Date | undefined ;
    description: string = '';
    nativeLang: string = '';
    foreignLang: string = '';
    cards: CardDetails[] = [];
    
}