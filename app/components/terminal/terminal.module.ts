import { NgModule } from "@angular/core";
import { commonModules } from "app/common";
import { TerminalHomeComponent } from "./home";

const components = [
    TerminalHomeComponent,
];

@NgModule({
    declarations: components,
    exports: components,
    imports: [...commonModules],
    entryComponents: [
    ],
})
export class TerminalModule {
}
