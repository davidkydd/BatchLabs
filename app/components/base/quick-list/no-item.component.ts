import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { LoadingStatus } from "app/components/base/loading";
import { Filter } from "app/utils/filter-builder";

@Component({
    selector: "bl-no-item",
    template: `
        <div
            class="no-item-message"
            [ngClass]="{'slim': _slimline }"
            *ngIf="status !== loadingStatuses.Loading && itemCount === 0">

            <ng-content select="[icon]"></ng-content>
            <ng-content select="[no-filter]" *ngIf="!withFilter"></ng-content>
            <ng-content select="[with-filter]" *ngIf="withFilter"></ng-content>
            <ng-content select="[description]"></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoItemComponent {
    @Input()
    public status: LoadingStatus;

    @Input()
    public itemCount: number;

    @Input()
    public set filter(filter: Filter) {
        this.withFilter = Boolean(filter && !filter.isEmpty());
    }

    @Input()
    public set slimline(slimline: boolean) {
        this._slimline = slimline;
    }

    public withFilter = false;
    public loadingStatuses = LoadingStatus;

    private _slimline = false;
}
