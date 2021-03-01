import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material/material.module';
import { SpinnerButtonComponent } from './spinner-button/spinner-button.component';
import { WidgetsServices } from './widgets.services';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableServices } from './data-table/data-table.services';
import { DialogComponent } from './dialog/dialog.component';



@NgModule({
  declarations: [
    SpinnerButtonComponent,
    DataTableComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    SpinnerButtonComponent,
    DataTableComponent,
    DialogComponent
  ],
  providers: [WidgetsServices, DataTableServices],
  entryComponents: [DialogComponent]
})
export class WidgetsModule { }
