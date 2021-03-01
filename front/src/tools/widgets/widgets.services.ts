import { IColor, ISpinnerButton, IType } from './spinner-button/spinner-button.interfaces';
import { Injectable } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from "@angular/material";

@Injectable()
export class WidgetsServices {

    constructor(private dialog: MatDialog) { };

    public criaSpinnerButton(execute: any, widget: string, text: string, icon: string, color: IColor, type: IType) {
        return <ISpinnerButton>{
            widgetId: widget,
            text: text,
            icon: icon,
            color: color,
            type: type,
            execute: execute,
            start: () => { },
            stop: () => { }
        };
    }


    public criaDialog(title: string, text: string) {
        return this.dialog.open(DialogComponent, { data: { title: title, text: text } })
    }


}

