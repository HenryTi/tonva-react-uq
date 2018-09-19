var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Page } from 'tonva-tools';
import { List, LMR, FA } from 'tonva-react-form';
import { VEntity } from '../VM';
export class VmArchives extends VEntity {
    constructor() {
        super(...arguments);
        this.archiveClick = (brief) => __awaiter(this, void 0, void 0, function* () {
            if (brief.processing === 1)
                return;
            this.event('archived', brief);
            //this.navVm(VmArchived, brief);
        });
        this.archiveRow = (row, index) => {
            let left = React.createElement(React.Fragment, null,
                row.processing === 1 ? '... ' : '',
                "id:",
                row.id,
                ", no:",
                row.no,
                ", discription:",
                row.discription,
                ", date:",
                row.date);
            let right = React.createElement(FA, { className: "align-self-center", name: "angle-right" });
            return React.createElement(LMR, { className: "px-3 py-2", left: left, right: right });
        };
        this.view = () => {
            return React.createElement(Page, { header: '已归档' + this.label },
                React.createElement(List, { items: this.list, item: { render: this.archiveRow, onClick: this.archiveClick } }));
        };
    }
    showEntry() {
        return __awaiter(this, void 0, void 0, function* () {
            this.list = yield this.entity.getArchives(undefined, 10);
            this.openPage(this.view);
        });
    }
}
//# sourceMappingURL=vmArchives.js.map