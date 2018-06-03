import { Tuid } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { ApiBase } from 'tonva-tools';
export interface Field {
    name: string;
    type: string;
    tuid?: string;
    url?: string;
    _tuid: Tuid;
}
export declare class Entities {
    private api;
    private tvApi;
    private tuids;
    private actions;
    private sheets;
    private queries;
    private books;
    private histories;
    private cacheTimer;
    constructor(api: ApiBase, access?: string);
    tuid(name: string): Tuid;
    action(name: string): Action;
    sheet(name: string): Sheet;
    query(name: string): Query;
    book(name: string): Book;
    history(name: string): History;
    tuidArr: Tuid[];
    actionArr: Action[];
    sheetArr: Sheet[];
    queryArr: Query[];
    bookArr: Book[];
    historyArr: History[];
    loadEntities(): Promise<void>;
    getTuid(name: string, tuidUrl: string): Tuid;
    cacheTuids(defer: number): void;
    private clearCacheTimer();
    private loadIds();
    private buildAccess(api, access);
    private fromType(api, name, type);
    private fromObj(api, name, obj);
    private buildSheet(api, name, obj);
    private createSheetState(name, obj);
    pack(schema: any, data: any): string;
    private escape(d);
    private packRow(result, fields, data);
    private packArr(result, fields, data);
    unpackSheet(schema: any, data: string): any;
    unpackReturns(schema: any, data: string): any;
    private unpackRow(ret, fields, data, p);
    private to(ret, v, f);
    private unpackArr(ret, arr, data, p);
}
