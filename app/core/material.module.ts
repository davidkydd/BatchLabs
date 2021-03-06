import { NgModule } from "@angular/core";
import {
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdTabsModule,
    MdTooltipModule,
    PortalModule,
} from "@angular/material";

const modules = [
    MdButtonModule,
    MdAutocompleteModule,
    MdCheckboxModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdTabsModule,
    MdTooltipModule,
    MdIconModule,
    MdSelectModule,
    MdMenuModule,
    MdSlideToggleModule,
    MdDialogModule,
    MdSidenavModule,
    MdCardModule,
    MdInputModule,
    PortalModule,
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule { }
