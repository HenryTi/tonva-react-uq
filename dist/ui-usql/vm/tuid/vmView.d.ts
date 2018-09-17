/// <reference types="react" />
import { VmForm } from '../form';
import { VmEntity } from '../VM';
import { TuidMain } from '../../entities';
import { TuidUI } from './crTuid';
export declare type TypeVmTuidView = typeof VmTuidView;
export declare class VmTuidView extends VmEntity<TuidMain, TuidUI> {
    vmForm: VmForm;
    id: number;
    showEntry(param?: any): Promise<void>;
    loadId(id: number): Promise<void>;
    protected next: () => Promise<void>;
    protected finish: () => void;
    protected resetForm(): void;
    protected onSubmit: () => Promise<void>;
    protected view: () => JSX.Element;
}