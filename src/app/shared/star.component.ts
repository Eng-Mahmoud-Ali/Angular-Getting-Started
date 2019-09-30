import { OnChanges, Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'pm-star',
    styles: [`.crop {
        overflow: hidden;
      }
      div {
        cursor: pointer;
      }`],

    template: `<div class="crop"
            [style.width.px]="starWidth"
            [title]="rating"
            (click)="onClick()">
        <div style="width: 75px">
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </div>
        </div>`
    //`<div (click)='onClickRate(rating)' title={{rating}} style="cursor: pointer !important;background-color:gold;height: 14px;" [style.width.px]='ratingWidth'></div>`

})

export class StarComponent implements OnChanges {
    @Input() rating = 0;
    starWidth = 0;
    @Output() rateClickEvent: EventEmitter<string> =
      new EventEmitter<string>();
  
    ngOnChanges(): void {
      this.starWidth = this.rating * 75 / 5;
    }
  
    onClick(): void {
      this.rateClickEvent.emit(`The rating ${this.rating} was clicked!`);
    }
  }