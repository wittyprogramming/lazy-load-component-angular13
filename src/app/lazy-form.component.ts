import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {
    Component,
    EventEmitter, Input,
    NgModule,
    OnInit, Output,
} from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {BackendService} from "./backend.service";
import {CommonModule} from "@angular/common";

@Component({
    selector: "app-lazy-form",
    template: `
        <form
                [formGroup]="simpleForm"
                style="margin:50px;"
                fxLayout="column"
                fxLayoutGap="20px"
                fxLayoutAlign="space-between center"
                (submit)="submitForm()"
        >
            <mat-form-field appearance="fill">
                <mat-label>Enter your Name</mat-label>
                <input matInput placeholder="John" formControlName="name" required/>
                <mat-error *ngIf="name?.invalid">{{ getNameErrorMessage() }}</mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill">
                <mat-label>Enter your email</mat-label>
                <input
                        matInput
                        placeholder="john@example.com"
                        formControlName="email"
                        required
                />
                <mat-error *ngIf="email?.invalid">{{
                    getEmailErrorMessage()
                    }}</mat-error>
            </mat-form-field>
            <button type="submit" mat-raised-button color="accent">
                {{ buttonTitle }}
            </button>
        </form>
    `,
    styles: [],
})
export class LazyFormComponent implements OnInit {
    @Input()
    buttonTitle: string = "Submit";

    @Output() formSubmitted = new EventEmitter();

    simpleForm = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        name: new FormControl("", [Validators.required]),
    });

    get name() {
        return this.simpleForm.get("name");
    }

    get email() {
        return this.simpleForm.get("email");
    }

    constructor(private backendService: BackendService) {
    }

    submitForm() {
        if (this.email?.invalid || this.name?.invalid) return;
        this.backendService.submitForm();
        this.formSubmitted.emit();
        alert("Form submitted successfully");
    }

    ngOnInit(): void {
    }

    getNameErrorMessage() {
        if (this.name?.hasError("required")) {
            return "You must enter a value";
        }

        return this.email?.hasError("email") ? "Not a valid email" : "";
    }

    getEmailErrorMessage() {
        if (this.email?.hasError("required")) {
            return "You must enter a value";
        }

        return this.email?.hasError("email") ? "Not a valid email" : "";
    }
}

@NgModule({
    declarations: [LazyFormComponent],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
    ],
    providers: [BackendService],
    bootstrap: [LazyFormComponent],
})
export class LazyFormModule {
    constructor() {
    }
}
