import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormArray } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  @Input()
  notifications: string[];

  @Input()
  email: string;

  constructor(private controlContainer: ControlContainer, private fb: FormBuilder) { }

  ngOnInit() {
    this.addNotificationTarget(this.email);
  }

  get formArray(): FormArray {
    return this.controlContainer.control as FormArray;
  }

  addNotificationTarget(email = '') {
    this.formArray.push(
      this.fb.group({
        email: [email, Validators.required],
        notifications: this.fb.array(this.notifications.map(() => true))
      })
    );
  }
}

