import { FieldUI, Compute } from '../../formUI';
import { FieldInputs, FormValues } from '..';
import { VField, VIntField, VDecField, VStringField, VTextField, VDateTimeField } from './vField';
import { VTuidField } from './vTuidField';
import { Field } from '../../../entities';

export function buildVField(field: Field, fieldUI: FieldUI, formValues:FormValues, formCompute:Compute, readOnly:boolean): VField {
    let vField:new (field:Field, ui:FieldUI, formValues:FormValues, formCompute:Compute, readOnly:boolean) => VField;
    /*
    switch (fieldUI.type) {
        default: ctrl = new VUnknownField(field, fieldUI, formValues, readOnly); break;
        case 'string': ctrl = new VStringField(field, fieldUI, formValues, readOnly); break;
        case 'dec': ctrl = new VDecField(field, fieldUI, formValues, readOnly); break;
        case 'int': ctrl = new VIntField(field, fieldUI, formValues, readOnly); break;
    }*/
    switch (field.type) {
        default: return;
        case 'tinyint':
        case 'smallint':
        case 'int':
            vField = VIntField;
            break;
        case 'bigint':
            let tuid = field.tuid;
            if (tuid !== undefined) return;// new VTuidField(field, fieldUI, calls, formValues, readOnly);
            vField = VIntField;
            break;
        case 'dec':
            vField = VDecField;
            break;
        case 'char':
            vField = VStringField;
            break;
        case 'text':
            vField = VTextField;
            break;
        case 'datetime':
            vField = VDateTimeField;
            break;
    }
    return new vField(field, fieldUI, formValues, formCompute, readOnly);
    //return ctrl;
}

