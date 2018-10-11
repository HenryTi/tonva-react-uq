var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { Page } from 'tonva-tools';
import { VSheetView } from './vSheetView';
export class VSheetAction extends VSheetView {
    constructor() {
        super(...arguments);
        this.actionClick = (action) => __awaiter(this, void 0, void 0, function* () {
            let { id, flow, state } = this.sheetData.brief;
            let res = yield this.controller.action(id, flow, state, action.name);
            alert(JSON.stringify(res));
            yield this.backPage();
        });
        this.deleteClick = () => __awaiter(this, void 0, void 0, function* () {
            alert('单据作废：程序正在设计中');
        });
        this.editClick = () => __awaiter(this, void 0, void 0, function* () {
            //alert('修改单据：程序正在设计中');
            let values = yield this.controller.editSheet(this.sheetData);
            this.vForm.setValues(values);
        });
        this.page = () => {
            let { brief } = this.sheetData;
            let { state, no } = brief;
            let stateLabel = this.controller.getStateLabel(state);
            let { states } = this.entity;
            let s = states.find(v => v.name === state);
            let actionButtons, startButtons;
            if (s === undefined) {
                let text, cn;
                switch (state) {
                    default:
                        text = '不认识的单据状态\'' + state + '\'';
                        cn = 'text-info';
                        break;
                    case '-':
                        text = '已作废';
                        cn = 'text-danger';
                        break;
                    case '#':
                        text = '已归档';
                        cn = 'text-success';
                        break;
                }
                actionButtons = React.createElement("div", { className: classNames(cn) },
                    "[",
                    text,
                    "]");
            }
            else {
                actionButtons = React.createElement("div", { className: "flex-grow-1" }, s.actions.map((v, index) => React.createElement(Button, { key: index, className: "mr-2", color: "primary", onClick: () => this.actionClick(v) }, this.controller.getActionLabel(state, v.name))));
                if (state === '$') {
                    startButtons = React.createElement("div", null,
                        React.createElement(Button, { outline: true, className: "ml-2", color: "info", onClick: this.editClick }, "\u4FEE\u6539"),
                        React.createElement(Button, { outline: true, className: "ml-2", color: "danger", onClick: this.deleteClick }, "\u4F5C\u5E9F"));
                }
            }
            ;
            return React.createElement(Page, { header: this.label + ':' + stateLabel + '-' + no },
                React.createElement("div", { className: "mb-2" },
                    React.createElement("div", { className: "d-flex px-3 py-2 border-bottom bg-light" },
                        actionButtons,
                        startButtons),
                    React.createElement(this.sheetView, null)));
        };
    }
    showEntry(sheetData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sheetData = sheetData;
            //let {brief, data, flows} = await this.controller.getSheetData(sheetId);
            //this.brief = brief;
            //this.flows = flows;
            //this.data = data;
            //this.state = this.brief.state;
            this.vForm = this.createForm(undefined, sheetData.data);
            this.openPage(this.page);
        });
    }
}
//# sourceMappingURL=vSheetAction.js.map