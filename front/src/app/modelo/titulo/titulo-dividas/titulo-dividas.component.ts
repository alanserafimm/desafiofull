import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GenericControllers } from 'src/tools/controllers/generic.controllers';
import { IFormInicialize } from 'src/tools/services/generic.interfaces';
import { GenericServices } from 'src/tools/services/generic.services';
import { IDataTable } from 'src/tools/widgets/data-table/data-table.interfaces';
import { IColor, ISpinnerButton, IType } from 'src/tools/widgets/spinner-button/spinner-button.interfaces';
import { WidgetsServices } from 'src/tools/widgets/widgets.services';
import { isNullOrUndefined } from 'util';
import { APIModeloDividas, ITitulosDividas } from './titulo-dividas.interfaces';

@Component({
  selector: 'app-titulo-dividas',
  templateUrl: './titulo-dividas.component.html',
  styleUrls: ['./titulo-dividas.component.css']
})
export class TituloDividasComponent extends GenericServices<ITitulosDividas> implements OnInit {
  public api: string = this.getUrl(APIModeloDividas);

  @Input() set id(value: string) {
    if (isNullOrUndefined(value)) return;

    this.tituloId = value;

    this.requestDataTable();
  };

  dividasDataTable: IDataTable;
  btnSalver: ISpinnerButton;
  dividasForm: FormGroup;
  viewChange: boolean = true;

  constructor(private route: ActivatedRoute, public apiServices: GenericControllers, public widgetsServices: WidgetsServices, private formBuilder: FormBuilder) { super(apiServices, widgetsServices); }

  ngOnInit() {
    var resolver = this.route.snapshot.data["titulodividasservice"] as IFormInicialize;

    this.dividasDataTable = resolver.datatable;

    this.initForm();

    this.btnSalver = this.widgetsServices.criaSpinnerButton(() => { this.onSave(); }, "btnSalverDivida", "Adicionar", "check_circle", IColor.Primary, IType.Submit);

    this.dividasDataTable.onClickDelete = (id) => { this.onDelete(id); };
    this.dividasDataTable.onClickEdit = (id) => { this.onEdit(id); };
  }

  private initForm() {
    this.dividasForm = this.formBuilder.group({
      _id: [null, Validators.required],
      tituloId: [null, Validators.required],
      number: [null, Validators.required],
      dataVencimento: [null, Validators.required],
      valor: [null, Validators.required],
    });
  }

  public async onDelete(id: string) {
    var response = await super.onDeletar(id, this.dividasForm);
    if (response) {
      await this.refreshDataTable();
    };
  };

  public async onEdit(id: string) {

    var response = await super.onEditar(id, this.dividasForm);

    if (response) {
      this.viewChange = false;
    };

  };

  public async onSave() {
    this.dividasForm.controls['tituloId'].setValue(this.tituloId);
    this.dividasForm.controls['valor'].setValue(Number(this.dividasForm.value.valor));
    this.dividasForm.controls['dataVencimento'].setValue(new Date(this.dividasForm.value.dataVencimento));

    this.btnSalver.start();

    setTimeout(async () => {
      var response: any = await super.onSalvar(this.dividasForm);

      if (response) {
        this.widgetsServices.criaDialog("Sucesso!", "item foi adicionado/alterado!");

        this.requestDataTable();
      };

      this.btnSalver.stop();

    }, 300);
  };

  private async requestDataTable() {
    var response: any = await this.filterDataTable([{ tituloId: String(this.tituloId) }]);

    if (response.success) this.filterData = response.data;
  };

  private async refreshDataTable() {
    var response: any = await this.filterDataTable([{}]);

    if (response.success) this.filterData = response.data;
  };

  public onClickNew() {
    this.dividasForm.reset();
    this.viewChange = false;
  }

  public onClickLast() { this.viewChange = true };

  tituloId: string;
  filterData: string[];

}
