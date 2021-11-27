import {
    Component, createNgModuleRef,
    Injector,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";
import {Subscription} from "rxjs";

@Component({
    selector: "app-root",
    template: `
        <div style="text-align:center;margin-top: 100px;" class="content">
            <h1>Welcome to lazy loading a Component</h1>
            <button mat-raised-button color="primary" (click)="loadForm()">
                Load component form!
            </button>
            <ng-template #formComponent></ng-template>
        </div>
    `,
    styles: [],
})
export class AppComponent implements OnDestroy {
    @ViewChild("formComponent", {read: ViewContainerRef})
    formComponent!: ViewContainerRef;
    formSubmittedSubscription = new Subscription();

    constructor(private injector: Injector) {
    }

    async loadForm() {
        const {LazyFormModule, LazyFormComponent} = await import("./lazy-form.component");
        const moduleRef = createNgModuleRef(LazyFormModule, this.injector);
        this.formComponent.clear();
        const {instance} = this.formComponent.createComponent(LazyFormComponent, {ngModuleRef: moduleRef});
        instance.buttonTitle = "Contact Us";
        this.formSubmittedSubscription = instance.formSubmitted.subscribe(() =>
            console.log("The Form Submit Event is captured!")
        );
    }

    ngOnDestroy(): void {
        this.formSubmittedSubscription.unsubscribe();
    }
}
