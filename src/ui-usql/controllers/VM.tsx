import * as React from 'react';
import { Controller, VPage, View } from 'tonva-tools';
import { Entity, Field, TuidMain } from '../entities';
import { CUsq } from './usq/cUsq';
import { VForm, FieldInputs, FieldCall, FormOptions, FormMode } from './form';
import { CQuerySelect } from './query';
import { FormUI, FieldTuidUI } from './formUI';
import { entityIcons } from './icons';

export abstract class ControllerUsq extends Controller{
    constructor(cUsq: CUsq, res:any) {
        super(res);
        this.cUsq = cUsq;
    }
    cUsq: CUsq;
}

export interface EntityUI {
    form?: FormUI;
    //label: string;
    //res?: any;
}

export abstract class CEntity<T extends Entity, UI extends EntityUI> extends ControllerUsq {
    constructor(cUsq: CUsq, entity: T, ui: UI, res: any) {
        super(cUsq, res);
        Object.setPrototypeOf(this.x, cUsq.x);
        let {name, typeName} = entity;
        this.entity = entity;
        //let entityUI = cUsq.getUI<T, UI>(entity);
        //let {ui, res} = entityUI;
        this.ui = ui; // || entityUI.ui;
        this.label = this.res.label || name;
        this.icon = entityIcons[typeName];
    }
    readonly entity: T;
    readonly ui: UI;

    protected async beforeStart() {
        await super.beforeStart();
        await this.entity.loadSchema();
    }

    createForm(onSubmit:()=>Promise<void>, values?:any, mode?:FormMode) {
        let options = this.buildFormOptions(mode);
        let ret = new VForm(options, onSubmit);
        ret.setValues(values);
        return ret;
    }

    private buildFormOptions(mode?:FormMode):FormOptions {
        let {fields, arrFields} = this.entity;
        let none, submitCaption, arrNewCaption, arrEditCaption, arrTitleNewButton;
        if (this.res !== undefined) {
            none = this.res['none'];
            submitCaption = this.res['submit'];
            arrNewCaption = this.res['arrNew'];
            arrEditCaption = this.res['arrEdit'];
            arrTitleNewButton = this.res['arrTitleNewButton'];
        }
        if (none === undefined) {
            none = this.cUsq.res['none'] || 'none';
        }
        if (submitCaption === undefined)
            submitCaption = this.cUsq.res['submit'] || 'Submit';
        if (arrNewCaption === undefined)
            arrNewCaption = this.cUsq.res['arrNew'] || 'New';
        if (arrEditCaption === undefined)
            arrEditCaption = this.cUsq.res['arrEdit'] || 'Edit';
        if (arrTitleNewButton === undefined)
        arrTitleNewButton = this.cUsq.res['arrTitleNewButton'];
        if (mode === undefined) mode = FormMode.new;
        let formUI = this.ui.form;
        let ret:FormOptions = {
            fields: fields,
            arrs: arrFields,
            ui: formUI,
            res: this.res || {},
            inputs: this.buildInputs(formUI),
            none: none,
            submitCaption: submitCaption,
            arrNewCaption: arrNewCaption,
            arrEditCaption: arrEditCaption,
            arrTitleNewButton: arrTitleNewButton,
            mode: mode,
        }
        return ret;
    }

    private buildInputs(formUI: FormUI):FieldInputs {
        let {fields, arrFields} = this.entity;
        let ret:FieldInputs = {};
        this.buildFieldsInputs(ret, fields, undefined, formUI);
        if (arrFields !== undefined) {
            for (let arr of arrFields) {
                let {name, fields} = arr;
                let items = formUI && formUI.items;
                this.buildFieldsInputs(ret, fields, name, items && items[name] as FormUI);
            }
        }
        return ret;
    }

    private buildFieldsInputs(ret:FieldInputs, fields:Field[], arr:string, formUI: FormUI) {
        if (arr !== undefined) {
            let arrFieldInputs = ret[arr];
            if (arrFieldInputs === undefined) {
                ret[arr] = arrFieldInputs = {};
                ret = arrFieldInputs;
            }
        }
        for (let field of fields) {
            let {name, _tuid} = field;
            if (_tuid === undefined) continue;
            let fieldUI = formUI && formUI.items && formUI.items[name] as FieldTuidUI;
            ret[name] = {
                select: this.buildSelect(field, arr, fieldUI),
                content: this.buildContent(field, arr),
                placeHolder: this.cUsq.getTuidPlaceHolder(_tuid),
            };
        }
    }

    protected buildSelect(field:Field, arr:string, fieldUI: FieldTuidUI):FieldCall {
        return async (form:VForm, field:Field, values:any):Promise<any> => {
            let {_tuid, _ownerField} = field;
            let cTuidSelect = this.cUsq.cTuidSelect(_tuid);
            let param:any = undefined;
            if (_ownerField !== undefined) param = form.getValue(_ownerField.name);
            if (fieldUI && fieldUI.autoList === true) {
                console.log('select search set param=empty string');
                param = '';
            }
            let ret = await cTuidSelect.call(param);
            cTuidSelect.removeCeased(); // 清除已经废弃的顶部页面
            if (ret === undefined) return undefined;
            let id = cTuidSelect.idFromItem(ret);
            _tuid.useId(id);
            return id;
        };
    }

    protected buildContent(field:Field, arr:string): React.StatelessComponent<any> {
        return;
    }

    cQuerySelect(queryName:string):CQuerySelect {
        return this.cUsq.cQuerySelect(queryName);
    }
}

export abstract class VEntity<T extends Entity, UI extends EntityUI, C extends CEntity<T, UI>> extends VPage<C> {
    protected readonly entity: T;
    protected readonly ui: UI;
    constructor(controller: C) {
        super(controller);
        this.entity = controller.entity;
        this.ui = controller.ui;
    }

    get label():string {return this.controller.label}

    //private _form_$: VForm;
    protected createForm(onSubmit:()=>Promise<void>, values?:any, mode?:FormMode): VForm {
        //if (this._form_$ !== undefined) return this._form_$;
        return this.controller.createForm(onSubmit, values, mode);
    }
}
