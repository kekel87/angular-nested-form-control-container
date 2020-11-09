import { Component, OnInit, Input, forwardRef, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-notifications-cva',
  templateUrl: './notifications-cva.component.html',
  styleUrls: ['./notifications-cva.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NotificationsCvaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NotificationsCvaComponent),
      multi: true
    }
  ]
})
export class NotificationsCvaComponent implements ControlValueAccessor, OnInit, Validator {

  formArray: FormArray;

  @Input()
  notifications: string[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formArray = this.fb.array([]);
    this.formArray.valueChanges.subscribe(v => {
      if (this.onChange) {
        this.onChange(v);
      }
    });
  }

  addNotificationTarget(email = '', notifications: boolean[] = []) {
    this.formArray.push(
      this.fb.group({
        email: [email, Validators.required],
        notifications: this.fb.array(this.notifications.map((_, index) => notifications[index] !== undefined ? notifications[index] : true))
      })
    );
  }

  onChange: (val: string) => void;
  onTouched: () => void;

  writeValue(value: any[]) {
    if(Array.isArray(value)) {
      this.formArray.clear();
      value.forEach(v => this.addNotificationTarget(v.email, v.notifications));
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState() { }

  validate(c: FormControl) {
    return this.formArray.valid ? null : { invalidForm: true };
  }
}