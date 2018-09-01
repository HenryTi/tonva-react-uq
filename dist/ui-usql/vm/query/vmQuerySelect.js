var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { SearchBox, List } from 'tonva-react-form';
import { Page, PagedItems } from 'tonva-tools';
import { VmEntity } from '../VM';
import { DefaultRow } from './defaultRow';
export class VmQuerySelect extends VmEntity {
    constructor() {
        super(...arguments);
        this.onSearch = (key) => __awaiter(this, void 0, void 0, function* () {
            yield this.pagedItems.first(key);
        });
        this.renderRow = (item, index) => React.createElement(this.row, Object.assign({}, item));
        this.clickRow = (item) => {
            this.callOnSelected(item);
        };
        this.view = () => {
            //let {label, entity, onSelected, renderRow, clickRow, pagedItems, onSearch, ownerId} = vm;
            let header = React.createElement(SearchBox, { className: "mx-1 w-100", initKey: '', onSearch: this.onSearch, placeholder: '搜索' + this.label });
            return React.createElement(Page, { header: header },
                React.createElement(List, { items: this.pagedItems.items, item: { render: this.renderRow, onClick: this.clickRow }, before: '搜索' + this.label + '资料' }));
        };
    }
    showEntry(param) {
        return __awaiter(this, void 0, void 0, function* () {
            let { row, selectRow } = this.ui;
            this.row = selectRow || row || DefaultRow;
            this.entity = this.coordinator.entity;
            this.pagedItems = new QueryPagedItems(this.entity);
            yield this.onSearch(param);
            this.open(this.view);
        });
    }
    callOnSelected(item) {
        /*
        if (this.onSelected === undefined) {
            alert('onSelect is undefined');
            return;
        }
        this.onSelected(item);
        */
        this.close();
        this.return(item);
    }
}
/*
type TypeRow = typeof Row;
const Row = observer(({item, vm}:{item:any, vm:VmQuerySelect}) => {
    return <div className="px-3 py-2">post:{JSON.stringify(item.$post)} - {JSON.stringify(item)}</div>;
});
*/
class QueryPagedItems extends PagedItems {
    constructor(query) {
        super();
        this.query = query;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret;
            if (this.query.isPaged === true)
                ret = yield this.query.page(this.param, this.pageStart, this.pageSize);
            else {
                let data = yield this.query.query(this.param);
                //let data = await this.query.unpackReturns(res);
                ret = data[this.query.returns[0].name];
            }
            return ret;
        });
    }
    setPageStart(item) {
        if (item === undefined)
            this.pageStart = 0;
    }
}
//# sourceMappingURL=vmQuerySelect.js.map