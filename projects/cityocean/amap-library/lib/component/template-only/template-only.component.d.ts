import { ElementRef, OnInit } from '@angular/core';
export declare class TemplateOnlyComponent implements OnInit {
    shipmentEl: ElementRef;
    readonly shipmentStatus: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
    };
    shipmentData: any;
    constructor();
    ngOnInit(): void;
}
