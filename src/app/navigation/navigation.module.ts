import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavigationComponent,
    TabComponent],
  exports: [NavigationComponent]
})
export class NavigationModule { }
