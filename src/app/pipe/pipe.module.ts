import { ArrayToStringPipe } from './array-to-string.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ArrayToStringPipe
  ],
  exports: [
    ArrayToStringPipe
  ]
})
export class PipeModule { }
