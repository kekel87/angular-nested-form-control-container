import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsCvaComponent } from './notifications-cva/notifications-cva.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, NotificationsComponent, NotificationsCvaComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
