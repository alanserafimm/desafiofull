import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GenericControllers } from 'src/tools/controllers/generic.controllers';
import { IFormInicialize } from 'src/tools/services/generic.interfaces';
import { GenericServices } from 'src/tools/services/generic.services';
import { IDataTable } from 'src/tools/widgets/data-table/data-table.interfaces';
import { DataTableServices } from 'src/tools/widgets/data-table/data-table.services';
import { IColor, ISpinnerButton, IType } from 'src/tools/widgets/spinner-button/spinner-button.interfaces';
import { WidgetsServices } from 'src/tools/widgets/widgets.services';
import { isNullOrUndefined } from 'util';
import { APIModelo, ITitulos } from './titulo.interfaces';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent extends GenericServices<ITitulos> implements OnInit {
  public api: string = this.getUrl(APIModelo);

  tituloDataTable: IDataTable;
  tituloForm: FormGroup;
  btnSalver: ISpinnerButton;

  filterData: string[];
  viewChange: boolean = true;
  title: string = "";
  selectedIndex: number = 0;

  

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public apiServices: GenericControllers,
    public widgetsServices: WidgetsServices,
    public dataTableServices: DataTableServices,
  ) {
    super(apiServices, widgetsServices);
  }

  ngOnInit() {
    var resolver = this.route.snapshot.data["tituloservice"] as IFormInicialize;

    this.title = resolver.title

    this.tituloDataTable = resolver.datatable;

    this.initForm();

    this.btnSalver = this.widgetsServices.criaSpinnerButton(() => { this.onSave(); }, "btnSalver", "Adicionar", "check_circle", IColor.Primary, IType.Submit);

    this.tituloDataTable.onClickEdit = (id) => { this.onEdit(id); };
    this.tituloDataTable.onClickDelete = (id) => { this.onDelete(id); };
  };

  private initForm() {
    this.tituloForm = this.formBuilder.group({
      _id: [null, Validators.required],
      titulo: [null, Validators.required],
      devedor: [null, Validators.required],
      cpf: [null, Validators.required],
      valororiginal: [null, Validators.required],
      atraso: [null, Validators.required],
      valoratualizado: [null, Validators.required],
      juros: [null, Validators.required],
      multa: [null, Validators.required],
    });
  }

  public onClickNew() {
    this.tituloForm.reset();
    this.viewChange = false;
  }

  public async onEdit(id: string) {

    var response = await super.onEditar(id, this.tituloForm);

    if (response) {
      this.viewChange = false;
    }

  };

  public async onDelete(id: string) {
    var response = await super.onDeletar(id, this.tituloForm);

    if (response) {
      this.refreshDataTable();
    };

  };

  public async onSave() {
    this.btnSalver.start();

    setTimeout(async () => {
      var response: any = await super.onSalvar(this.tituloForm);

      if (!isNullOrUndefined(response)) {
        this.widgetsServices.criaDialog("Sucesso!", "item foi adicionado/alterado!");

        this.refreshDataTable();
      };

      this.btnSalver.stop();

    }, 300);
  };

  private async refreshDataTable() {
    var response: any = await this.filterDataTable([{}]);

    if (response.success) this.filterData = response.data;
  };

  public onClickLast() {
    this.refreshDataTable();
    this.viewChange = true
  };

}
