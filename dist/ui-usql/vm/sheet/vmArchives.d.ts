import { VmEntity } from '../VM';
import { Sheet } from '../../entities';
import { SheetUI } from './crSheet';
export declare class VmArchives extends VmEntity<Sheet, SheetUI> {
    list: any[];
    showEntry(): Promise<void>;
    archiveClick: (brief: any) => Promise<void>;
    archiveRow: (row: any, index: number) => JSX.Element;
    protected view: () => JSX.Element;
}
