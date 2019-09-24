import { OnChanges, Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'pm-star',
    /*template: `<div title={{rating}} [style.width.px]='ratingWidth' class="crop">
    <div style="width:75px">
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    </div></div>`*/
    template: `<div (click)='onClickRate(rating)' title={{rating}} style="cursor: pointer !important;background-color:gold;height: 14px;" [style.width.px]='ratingWidth'></div>`
})

export class StarComponent implements OnChanges {
    @Input() rating: string = "0"
    ratingWidth: number
    @Output() rateClickEvent: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        this.ratingWidth =  +this.rating * 75 / 5;
    }

    onClickRate(rate: string): void {
        this.rateClickEvent.emit(`Product clicked with rating: ${rate}`);
    }
}