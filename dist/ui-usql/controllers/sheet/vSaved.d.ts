import { VSheet } from "./vSheet";
export declare class VSheetSaved extends VSheet {
    private brief;
    showEntry(brief?: any): Promise<void>;
    private restart;
    actionClick: (action: any) => Promise<void>;
    private buttons;
    private view;
    private acted;
}
