export declare type FieldUIType = 'tuid' | 'query' | 'string' | 'int' | 'dec' | 'text' | 'check' | 'select' | 'radio';
export interface FormUI {
    bandUIs: BandUI[];
    className?: string;
}
export interface BandUI {
    band: 'arr' | 'fields' | 'submit' | undefined;
    label: string;
}
export interface FieldBandUI extends BandUI, FieldUI {
    band: undefined;
}
export interface FieldsBandUI extends BandUI {
    band: 'fields';
    fieldUIs: FieldUI[];
}
export interface ArrBandUI extends BandUI {
    name: string;
    band: 'arr';
    row: React.StatelessComponent<any>;
    bandUIs: BandUI[];
}
export interface SubmitBandUI extends BandUI {
    band: 'submit';
}
export interface FieldUI {
    name: string;
    type: FieldUIType;
    required?: boolean;
}
export interface TuidUI extends FieldUI {
    type: 'tuid';
}
export interface TuidBandUI extends BandUI, TuidUI {
}
export interface QueryUI extends FieldUI {
    type: 'query';
    query: (param?: any) => Promise<any>;
}
export interface QueryBandUI extends BandUI, QueryUI {
}
export interface InputUI extends FieldUI {
    placeHolder: string;
}
export interface StringUI extends InputUI {
    type: 'string';
    length?: number;
}
export interface StringBandUI extends BandUI, StringUI {
}
export interface NumberUI extends InputUI {
    min?: number;
    max?: number;
}
export interface IntUI extends NumberUI {
    type: 'int';
}
export interface IntBandUI extends BandUI, IntUI {
}
export interface DecUI extends NumberUI {
    type: 'dec';
}
export interface DecBandUI extends BandUI, DecUI {
}
export interface TextUI extends InputUI {
    type: 'text';
}
export interface TextBandUI extends BandUI, TextUI {
}
export interface CheckUI extends FieldUI {
    type: 'check';
}
export interface CheckBandUI extends BandUI, CheckUI {
}
export interface OptionItem {
    label: string;
    value: any;
}
export interface OptionsUI extends FieldUI {
    options: OptionItem[];
}
export interface SelectUI extends OptionsUI {
    type: 'select';
}
export interface SelectBandUI extends BandUI, SelectUI {
}
export interface RadioUI extends OptionsUI {
    type: 'radio';
}
export interface RadioBandUI extends BandUI, RadioUI {
}
