import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  form: FormGroup;
  form2: FormGroup;

  notifications = [
    "notif 1",
    "notif 2",
    "notif 3",
    "notif 4",
    "notif 5",
    "notif 6"
  ];
  email = "toto@email.com";
  model = [{ email: "toto@email.com" }];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      notifications: this.fb.array([
        this.fb.group({
          email: ["toto@email.com", Validators.required],
          notifications: this.fb.array(this.notifications.map(() => true))
        })
      ])
    });

    this.form2 = this.fb.group({
      notifications: new FormControl([
        { email: "toto@email.com", notifications: [false, true, true, false] }
      ])
    });

    this.form.valueChanges.subscribe(data =>
      console.log("valueChanges CC", data)
    );
    this.form2.valueChanges.subscribe(data =>
      console.log("valueChanges CVA", data)
    );
  }

  simulateValueFromStore() {
    this.form2.patchValue({
      notifications: [
        { email: "test@email.com", notifications: [false] },
        { email: "test@email.com", notifications: [true, false] }
      ]
    });
  }

  onChange(v: any) {
    console.log("onChange", v);
  }
}
