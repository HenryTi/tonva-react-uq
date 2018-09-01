var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { List, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { VmEntity } from '../VM';
import { DefaultRow } from './defaultRow';
export class VmQueryMain extends VmEntity {
    constructor() {
        super(...arguments);
        this.onSubmit = () => __awaiter(this, void 0, void 0, function* () {
            let params = this.vmForm.values;
            yield this.entity.loadSchema();
            if (this.entity.isPaged === true) {
                yield this.entity.resetPage(30, params);
                yield this.entity.loadPage();
                //this.replacePage(<QueryResultPage vm={this} />);
                nav.pop();
                this.open(this.pageResult);
            }
            else {
                let data = yield this.entity.query(params);
                //let data = await this.unpackReturns(res);
                //return data;
                nav.pop();
                this.open(this.queryResult, data);
            }
        });
        this.again = () => {
            this.vmForm.reset();
            //this.replacePage(<QueryPage vm={this} />);
            nav.pop();
            this.open(this.view);
        };
        this.renderRow = (item, index) => React.createElement(this.row, Object.assign({}, item));
        this.view = () => React.createElement(Page, { header: this.label },
            this.vmForm.render('mx-3 my-2'),
            this.renderExtra());
        this.pageResult = () => {
            let { name, list } = this.entity;
            let rightClose = React.createElement("button", { className: "btn btn-outline-success btn-sm", onClick: this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: this.label, right: rightClose },
                React.createElement(List, { items: list, item: { render: this.renderRow } }));
        };
        this.queryResult = observer((result) => {
            let rightClose = React.createElement("button", { className: "btn btn-outline-success btn-sm", onClick: this.again },
                React.createElement(FA, { name: "search" }),
                " \u518D\u67E5\u8BE2");
            return React.createElement(Page, { header: this.label, right: rightClose },
                React.createElement("pre", null, JSON.stringify(result, undefined, '\t')));
        });
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.vmForm = this.createForm(this.onSubmit, param);
            let { row, queryRow } = this.ui;
            this.row = queryRow || row || DefaultRow;
            this.open(this.view);
        });
    }
    renderExtra() {
        return;
    }
}
//# sourceMappingURL=vmQueryMain.js.map