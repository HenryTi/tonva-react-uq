import * as React from 'react';
import _ from 'lodash';
import { UsqApi, Controller, UnitxApi, meInFrame, resLang, nav } from 'tonva-tools';
import { Entities, TuidMain, Action, Sheet, Query, Book, Map, Entity, Tuid, Usq, History, Pending } from '../../entities';
import { CLink } from '../link';
import { CBook, BookUI } from '../book';
import { CSheet, SheetUI } from '../sheet';
import { ActionUI, CAction } from '../action';
import { QueryUI, CQuery, CQuerySelect } from '../query';
import { CTuidMain, TuidUI, CTuid, CTuidInfo, CTuidSelect } from '../tuid';
import { MapUI, CMap } from '../map';
import { CEntity, EntityUI } from '../CVEntity';
import { PureJSONContent } from '../form/viewModel';
import { VUsq } from './vUsq';
import { CHistory, HistoryUI } from '../history';
import { CPending, PendingUI } from '../pending';

export type EntityType = 'sheet' | 'action' | 'tuid' | 'query' | 'book' | 'map' | 'history' | 'pending';

export interface UsqUI {
    CTuidMain?: typeof CTuidMain;
    CTuidSelect?: typeof CTuidSelect;
    CTuidInfo?: typeof CTuidInfo;
    CQuery?: typeof CQuery;
    CQuerySelect?: typeof CQuerySelect;
    CMap?: typeof CMap;
    CAction?: typeof CAction;
    CSheet?: typeof CSheet;
    CBook?: typeof CBook;
    CHistory?: typeof CHistory;
    CPending?: typeof CPending;
    tuid?: {[name:string]: TuidUI};
    sheet?: {[name:string]: SheetUI};
    action?: {[name:string]: ActionUI};
    map?: {[name:string]: MapUI};
    query?: {[name:string]: QueryUI};
    book?: {[name:string]: BookUI};    
    history?: {[name:string]: HistoryUI};
    pending?: {[name:string]: PendingUI};
    res?: any;
}

function lowerPropertyName(entities: {[name:string]: EntityUI}) {
    if (entities === undefined) return;
    for (let i in entities) entities[i.toLowerCase()] = entities[i];
}

export class CUsq extends Controller implements Usq {
    private ui:any;
    private CTuidMain: typeof CTuidMain;
    private CTuidSelect: typeof CTuidSelect;
    private CTuidInfo: typeof CTuidInfo;
    private CQuery: typeof CQuery;
    private CQuerySelect: typeof CQuerySelect;
    private CMap: typeof CMap;
    private CAction: typeof CAction;
    private CSheet: typeof CSheet;
    private CBook: typeof CBook;
    private CHistory: typeof CHistory;
    private CPending: typeof CPending;

    constructor(usq:string, appId:number, usqId:number, access:string, ui:UsqUI) {
        super(resLang(ui.res, nav.language, nav.culture));
        this.usq = usq;
        this.id = usqId;
        // 每一个ui都转换成小写的key的版本
        lowerPropertyName(ui.tuid);
        lowerPropertyName(ui.sheet);
        lowerPropertyName(ui.map);
        lowerPropertyName(ui.query);
        lowerPropertyName(ui.action);
        lowerPropertyName(ui.book);
        lowerPropertyName(ui.history);
        lowerPropertyName(ui.pending);
        this.ui = ui;
        this.CTuidMain = ui.CTuidMain || CTuidMain;
        this.CTuidSelect = ui.CTuidSelect || CTuidSelect;
        this.CTuidInfo = ui.CTuidInfo || CTuidInfo;
        this.CQuery = ui.CQuery || CQuery;
        this.CQuerySelect = ui.CQuerySelect || CQuerySelect;
        this.CMap = ui.CMap || CMap;
        this.CAction = ui.CAction || CAction;
        this.CSheet = ui.CSheet || CSheet;
        this.CBook = ui.CBook || CBook;
        this.CHistory = ui.CHistory || CHistory;
        this.CPending = ui.CPending || CPending;

        let token = undefined;
        let usqOwner:string, usqName:string;
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
        let baseUrl = hash===undefined || hash===''? 
            'debug/':'tv/';

        let acc: string[];
        if (access === undefined || access === '*') {
            acc = [];
        }
        else {
            acc = access.split(';').map(v => v.trim()).filter(v => v.length > 0);
        }
        let usqApi:UsqApi;
        if (usq === '$$$/$unitx') {
            // 这里假定，点击home link之后，已经设置unit了
            // 调用 UnitxApi会自动搜索绑定 unitx service
            usqApi = new UnitxApi(meInFrame.unit);
        }
        else {
            usqApi = new UsqApi(baseUrl, usqOwner, usqName, acc, true);
        }
        this.entities = new Entities(this, usqApi, appId);
    }

    protected async internalStart() {
    }

    usq: string;
    id: number;
    res: any;
    entities:Entities;
    error: string;

    protected async loadEntites() {
        await this.entities.loadAccess();
    }

    async loadSchema() {
        try {
            await this.loadEntites();
            if (this.id === undefined) this.id = this.entities.usqId;

            for (let i in this.ui) {
                let g = this.ui[i];
                if (g === undefined) continue;
                let {caption, collection} = g;
                if (collection === undefined) continue;
                for (let j in collection) {
                    if (this.entities[i](j) === undefined) {
                        console.warn(i + ':' + '\'' + j + '\' is not usql entity');
                    }
                }
            }
        }
        catch(err) {
            console.error(err);
            this.error = err;
            //debugger;
        }
    }

    getTuid(name:string) {return this.entities.tuid(name)}
    async getQuerySearch(name:string):Promise<Query> {
        let query = this.entities.query(name);
        if (query === undefined) 
            alert(`QUERY ${name} 没有定义!`);
        else {
            await query.loadSchema();
            let {returns} = query;
            if (returns.length > 1) {
                alert(`QUERY ${name} 返回多张表, 无法做QuerySearch`);
            }
        }
        return query;
    }
    getTuidPlaceHolder(tuid:Tuid) {
        let {tuidPlaceHolder, entity} = this.res;
        let {name} = tuid;
        let type:string;
        if (entity !== undefined) {
            let en = entity[name];
            if (en !== undefined) {
                type = en.label;
            }
        }
        return (tuidPlaceHolder || 'Select');
    }
    getNone() {
        let {none} = this.res;
        return none || 'none';
    }
    protected isSysVisible = false;
    protected isVisible(entity: Entity):boolean {
        return entity.sys !== true || this.isSysVisible;
    }

    async navSheet(sheetTypeId:number, sheetId:number) {
        let sheet = this.entities.sheetFromTypeId(sheetTypeId);
        if (sheet === undefined) {
            alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
            return;
        }
        let cSheet = this.cSheet(sheet);
        await cSheet.startSheet(sheetId);
    }

    cFromName(entityType:EntityType, entityName:string): CEntity<Entity, EntityUI> {
        switch (entityType) {
            case 'sheet':
                let sheet = this.entities.sheet(entityName);
                if (sheet === undefined) return;
                return this.cSheet(sheet);
            case 'action':
                let action = this.entities.action(entityName);
                if (action === undefined) return;
                return this.cAction(action);
            case 'tuid':
                let tuid = this.entities.tuid(entityName);
                if (tuid === undefined) return;
                return this.cTuidMain(tuid);
            case 'query':
                let query = this.entities.query(entityName);
                if (query === undefined) return;
                return this.cQuery(query);
            case 'book':
                let book = this.entities.book(entityName);
                if (book === undefined) return;
                return this.cBook(book);
            case 'map':
                let map = this.entities.map(entityName);
                if (map === undefined) return;
                return this.cMap(map);
            case 'history':
                let history = this.entities.history(entityName);
                if (history === undefined) return;
                return this.cHistory(history);
            case 'pending':
                let pending = this.entities.pending(entityName);
                if (pending === undefined) return;
                return this.cPending(pending);
        }
    }

    linkFromName(entityType:EntityType, entityName:string) {
        return this.link(this.cFromName(entityType, entityName));
    }

    private getUI<T extends Entity, UI extends EntityUI>(t:T):{ui:UI, res:any} {
        let ui, res;
        let {name, typeName} = t;
        if (this.ui !== undefined) {
            let tUI = this.ui[typeName];
            if (tUI !== undefined) {
                ui = tUI[name];
            }
        }
        let {entity} = this.res;
        if (entity !== undefined) {
            res = entity[name];
        }
        return {ui: ui || {}, res: res || {} };
    }

    link(cEntity:CEntity<Entity, EntityUI>) {
        return new CLink(cEntity);
    }

    get tuidLinks() {
        return this.entities.tuidArr.filter(v => this.isVisible(v)).map(v => this.link(this.cTuidMain(v)));
    }
    cTuidMain(tuid:TuidMain):CTuidMain {
        let {ui, res} = this.getUI<TuidMain, TuidUI>(tuid);
        return new (ui && ui.CTuidMain || this.CTuidMain)(this, tuid, ui, res);
    }
    cTuidSelect(tuid:Tuid):CTuidSelect {
        let {ui, res} = this.getUI<Tuid, TuidUI>(tuid.owner || tuid);
        return new (ui && ui.CTuidSelect || this.CTuidSelect)(this, tuid, ui, res);
    }
    cTuidInfo(tuid:TuidMain):CTuidInfo {
        let {ui, res} = this.getUI<Tuid, TuidUI>(tuid);
        return new (ui && ui.CTuidInfo || this.CTuidInfo)(this, tuid, ui, res);
    }

    cSheet(sheet:Sheet/*, sheetUI?:SheetUI, sheetRes?:any*/):CSheet {
        let {ui, res} = this.getUI<Sheet, SheetUI>(sheet);
        //if (sheetUI !== undefined) ui = sheetUI;
        //if (sheetRes !== undefined) res = sheetRes;
        //return new (ui && ui.CSheet || this.CSheet)(this, sheet, sheetUI, sheetRes);
        return new (ui && ui.CSheet || this.CSheet)(this, sheet, ui, res);
    }
    get sheetLinks() { 
        return this.entities.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cSheet(v))
        });
    }

    cAction(action:Action):CAction {
        let {ui, res} = this.getUI<Action, ActionUI>(action);
        return new (ui && ui.CAction || this.CAction)(this, action, ui, res);
    }
    get actionLinks() { 
        return this.entities.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cAction(v))
        });
    }

    cQuery(query:Query):CQuery {
        let {ui, res} = this.getUI<Query, QueryUI>(query);
        return new (ui && ui.CQuery || this.CQuery)(this, query, ui, res);
    }
    cQuerySelect(queryName:string):CQuerySelect {
        let query = this.entities.query(queryName);
        if (query === undefined) return;
        let {ui, res} = this.getUI<Query, QueryUI>(query);
        return new (ui && ui.CQuerySelect || this.CQuerySelect)(this, query, ui, res);
    }
    get queryLinks() {
        return this.entities.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cQuery(v))
        });
    }
    
    cBook(book:Book):CBook {
        let {ui, res} = this.getUI<Book, BookUI>(book);
        return new (ui && ui.CBook || this.CBook)(this, book, ui, res);
    }
    get bookLinks() { 
        return this.entities.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cBook(v))
        });
    }
    
    cHistory(history:History):CHistory {
        let {ui, res} = this.getUI<History, HistoryUI>(history);
        return new (ui && ui.CHistory || this.CHistory)(this, history, ui, res);
    }
    get historyLinks() { 
        return this.entities.historyArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cHistory(v))
        });
    }
    
    cPending(pending:Pending):CPending {
        let {ui, res} = this.getUI<Pending, PendingUI>(pending);
        return new (ui && ui.CPending || this.CPending)(this, pending, ui, res);
    }
    get pendingLinks() { 
        return this.entities.pendingArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cPending(v))
        });
    }
    
    cMap(map:Map):CMap {
        let {ui, res} = this.getUI<Map, MapUI>(map);
        return new (ui && ui.CMap || this.CMap)(this, map, ui, res);
    }
    get mapLinks() { 
        return this.entities.mapArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cMap(v));
        });
    }

    getTuidContent(tuid:Tuid): React.StatelessComponent<any> {
        let {owner} = tuid;
        if (owner === undefined) {
            let {ui} = this.getUI<Tuid, TuidUI>(tuid);
            return (ui && ui.inputContent) || PureJSONContent;
        }
        else {
            let {ui} = this.getUI<Tuid, TuidUI>(owner);
            return (ui && ui.divs && ui.divs[tuid.name].inputContent) || PureJSONContent;
        }
    }

    async showTuid(tuid:Tuid, id:number):Promise<void> {
        let {owner} = tuid;
        let c = this.cTuidInfo(owner || (tuid as TuidMain));
        await c.start(id);
    }

    protected get VUsq():typeof VUsq {return VUsq}

    render() {
        let v = new (this.VUsq)(this);
        return v.render();
    }
}

