import { VoidExpression } from "typescript";
import { CardDetails } from "./card-details.model";

export class Bundle{
    name!: string;
    bundleID!: number;
    owenerID!: number;
    startDate!: Date;
    updateDate!: Date;
    description!: string;
    cards!: CardDetails[];
};