import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, MatButtonModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
