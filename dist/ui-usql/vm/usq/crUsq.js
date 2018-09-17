var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UsqApi } from 'tonva-tools';
import { Entities } from '../../entities';
import { CrLink } from '../link';
import { CrBook } from '../book';
import { CrSheet } from '../sheet';
import { CrAction } from '../action';
import { CrQuery, CrQuerySelect } from '../query';
import { CrTuidMain, CrTuidMainSelect, CrTuidInfo } from '../tuid';
import { CrMap } from '../map';
import { Coordinator } from '../VM';
import { PureJSONContent } from '../viewModel';
import { VmUsq } from './vmUsq';
export class CrUsq extends Coordinator {
    constructor(usq, appId, usqId, access, ui) {
        super();
        this.isSysVisible = false;
        this.usq = usq;
        this.id = usqId;
        if (ui === undefined)
            this.ui = {};
        else {
            this.ui = ui;
            if (ui.res !== undefined) {
                this.res = ui.res.zh.CN;
            }
        }
        if (ui !== undefined) {
            this.CrTuidMain = ui.CrTuidMain;
            this.CrQuery = ui.CrQuery;
            this.CrQuerySelect = ui.CrQuerySelect;
            this.CrMap = ui.CrMap;
        }
        this.res = this.res || {};
        this.access = access;
        let token = undefined;
        let usqOwner, usqName;
        let p = usq.split('/');
        switch (p.length) {
            case 1:
                usqOwner = '$$$';
                usqName = p[0];
                break;
            case 2:
                usqOwner = p[0];
                usqName = p[1];
                break;
            default:
                console.log('usq must be usqOwner/usqName format');
                return;
        }
        let hash = document.location.hash;
        let baseUrl = hash === undefined || hash === '' ?
            'debug/' : 'tv/';
        let acc;
        if (access === undefined || access === '*') {
            acc = [];
        }
        else {
            acc = access.split(';').map(v => v.trim()).filter(v => v.length > 0);
        }
        let usqApi = new UsqApi(baseUrl, usqOwner, usqName, acc, true);
        this.entities = new Entities(this, usqApi, appId); //, crApp.id, usqId, usqApi);
    }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    loadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.entities.load();
                if (this.id === undefined)
                    this.id = this.entities.usqId;
                for (let i in this.ui) {
                    let g = this.ui[i];
                    if (g === undefined)
                        continue;
                    let { caption, collection } = g;
                    if (collection === undefined)
                        continue;
                    for (let j in collection) {
                        if (this.entities[i](j) === undefined) {
                            console.warn(i + ':' + '\'' + j + '\' is not usql entity');
                        }
                    }
                }
            }
            catch (err) {
                debugger;
            }
        });
    }
    getTuid(name) { return this.entities.tuid(name); }
    getQuerySearch(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.entities.query(name);
            if (query === undefined)
                alert(`QUERY ${name} 没有定义!`);
            else {
                yield query.loadSchema();
                let { returns } = query;
                if (returns.length > 1) {
                    alert(`QUERY ${name} 返回多张表, 无法做QuerySearch`);
                }
            }
            return query;
        });
    }
    getTuidNullCaption(tuid) {
        let { tuidNullCaption, entity } = this.res;
        let { name } = tuid;
        let type;
        if (entity !== undefined) {
            let en = entity[name];
            if (en !== undefined) {
                type = en.label;
            }
        }
        return (tuidNullCaption || 'Select ') + (type || name);
    }
    isVisible(entity) {
        return entity.sys !== true || this.isSysVisible;
    }
    navSheet(sheetTypeId, sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            let sheet = this.entities.sheetFromTypeId(sheetTypeId);
            if (sheet === undefined) {
                alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
                return;
            }
            let crSheet = this.crSheet(sheet);
            yield crSheet.startSheet(sheetId);
        });
    }
    crFromName(entityType, entityName) {
        switch (entityType) {
            case 'sheet':
                let sheet = this.entities.sheet(entityName);
                if (sheet === undefined)
                    return;
                return this.crSheet(sheet);
            case 'action':
                let action = this.entities.action(entityName);
                if (action === undefined)
                    return;
                return this.crAction(action);
            case 'tuid':
                let tuid = this.entities.tuid(entityName);
                if (tuid === undefined)
                    return;
                return this.crTuidMain(tuid);
            case 'query':
                let query = this.entities.query(entityName);
                if (query === undefined)
                    return;
                return this.crQuery(query);
            case 'book':
                let book = this.entities.book(entityName);
                if (book === undefined)
                    return;
                return this.crBook(book);
            case 'map':
                let map = this.entities.map(entityName);
                if (map === undefined)
                    return;
                return this.crMap(map);
        }
    }
    linkFromName(entityType, entityName) {
        return this.link(this.crFromName(entityType, entityName));
    }
    getUI(t) {
        let ui, res;
        let { name, typeName } = t;
        if (this.ui !== undefined) {
            let tUI = this.ui[typeName];
            if (tUI !== undefined) {
                ui = tUI[name];
            }
        }
        let { entity } = this.res;
        if (entity !== undefined) {
            res = entity[name];
        }
        return { ui: ui || {}, res: res };
    }
    /*
    private getUITypeCaption(type:EntityType):any {
        if (this.res === undefined) return;
        return this.res[type];
    }
    */
    link(crEntity) {
        return new CrLink(crEntity);
    }
    get tuidLinks() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => this.link(this.crTuidMain(v)));
    }
    crTuidMain(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new (ui && ui.CrTuidMain || this.CrTuidMain || CrTuidMain)(this, tuid, ui, res);
    }
    crTuidSelect(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new (ui && ui.CrTuidSelect || CrTuidMainSelect)(this, tuid, ui, res);
    }
    crTuidInfo(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new (ui && ui.CrTuidInfo || CrTuidInfo)(this, tuid, ui, res);
    }
    /*
    newVmTuidView(tuid:Tuid):VmTuidView {
        let ui = this.getUI<TuidUI>('tuid', tuid.name);
        let vm = ui && ui.view;
        if (vm === undefined) vm = VmTuidView;
        return new vm(this, tuid, ui);
    }*/
    //get sheetTypeCaption() { return this.getUITypeCaption('sheet') || '凭单'; }
    //protected newVmSheetLink(vmSheet:CrSheet) {
    //    return new VmEntityLink(vmSheet);
    //}
    crSheet(sheet) {
        let { ui, res } = this.getUI(sheet);
        return new CrSheet(this, sheet, ui, res);
    }
    get sheetLinks() {
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.crSheet(v));
        });
    }
    crAction(action) {
        let { ui, res } = this.getUI(action);
        return new CrAction(this, action, ui, res);
    }
    get actionLinks() {
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.crAction(v));
        });
    }
    crQuery(query) {
        let { ui, res } = this.getUI(query);
        return new (ui && ui.CrQuery || this.CrQuery || CrQuery)(this, query, ui, res);
    }
    crQuerySelect(queryName) {
        let query = this.entities.query(queryName);
        if (query === undefined)
            return;
        let { ui, res } = this.getUI(query);
        return new (ui && ui.CrQuerySelect || this.CrQuerySelect || CrQuerySelect)(this, query, ui, res);
    }
    get queryLinks() {
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.crQuery(v));
        });
    }
    //get bookTypeCaption() { return this.getUITypeCaption('book') || '帐 - 仅供调试程序使用，普通用户不可见' }
    //newVmBookLink(vmBook:CrBook) {
    //    return new VmEntityLink(vmBook);
    //}
    crBook(book) {
        let { ui, res } = this.getUI(book);
        return new CrBook(this, book, ui, res);
    }
    get bookLinks() {
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.crBook(v));
        });
    }
    /*
    get mapTypeCaption() { return this.getUITypeCaption('map') || '对照表' }
    newVmMapLink(vmMap:CrMap) {
        return new VmEntityLink(vmMap);
    }*/
    crMap(map) {
        let { ui, res } = this.getUI(map);
        return new (ui && ui.CrMap || this.CrMap || CrMap)(this, map, ui, res);
    }
    get mapLinks() {
        return this.entities.mapArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.crMap(v));
        });
    }
    getTuidContent(tuid) {
        let { owner } = tuid;
        if (owner === undefined) {
            let { ui } = this.getUI(tuid);
            return (ui && ui.content) || PureJSONContent;
        }
        else {
            let { ui } = this.getUI(owner);
            return (ui && ui.divs && ui.divs[tuid.name].content) || PureJSONContent;
        }
    }
    showTuid(tuid, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let cr = this.crTuidInfo(tuid);
            yield cr.start(id);
        });
    }
    get VmUsq() { return VmUsq; }
    render() {
        let vm = new (this.VmUsq)(this);
        return vm.render();
    }
}
//# sourceMappingURL=crUsq.js.map