import { CEntity, EntityUI } from "../VM";
import { History } from "../../entities";
import { VHistoryMain } from "./vHistoryMain";

export interface HistoryUI extends EntityUI {
    CHistory?: typeof CHistory;
    main: typeof VHistoryMain,
}

export class CHistory extends CEntity<History, HistoryUI> {
    protected async internalStart() {
        await this.showVPage(this.VHistoryMain);
    }

    protected get VHistoryMain():typeof VHistoryMain {return VHistoryMain}
}
