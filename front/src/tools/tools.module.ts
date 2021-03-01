import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericControllers } from './controllers/generic.controllers';
import { GenericServices } from './services/generic.services';
import { MaterialModule } from './material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from './widgets/widgets.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    WidgetsModule,
  ],
  exports: [
    MaterialModule,
    WidgetsModule
  ],
  providers: [
    GenericControllers,
    GenericServices
  ]
})
export class ToolsModule { }
