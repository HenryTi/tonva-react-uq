import { Api } from 'tonva-tools';
export declare class UsqlApi {
    private api;
    private access;
    constructor(api: Api, access: string[]);
    update(): Promise<string>;
    loadAccess(): Promise<any>;
    schema(name: string): Promise<any>;
    schemas(names: string[]): Promise<any[]>;
    tuidGet(name: string, id: number): Promise<any>;
    tuidGetAll(name: string): Promise<any[]>;
    tuidSave(name: string, params: any): Promise<any>;
    tuidSearch(name: string, arr: string, key: string, pageStart: string | number, pageSize: number): Promise<any>;
    tuidArrGet(name: string, arr: string, owner: number, id: number): Promise<any>;
    tuidArrGetAll(name: string, arr: string, owner: number): Promise<any[]>;
    tuidArrSave(name: string, arr: string, owner: number, params: any): Promise<any>;
    tuidArrPos(name: string, arr: string, owner: number, id: number, order: number): Promise<any>;
    tuidBindSlaveSave(name: string, slave: any, params: any): Promise<any>;
    tuidBindSlaves(name: string, slave: string, masterId: number, order: number, pageSize: number): Promise<any>;
    tuidIds(name: string, arr: string, ids: number[]): Promise<any[]>;
    proxied(name: string, proxy: string, id: number): Promise<any>;
    sheetSave(name: string, data: object): Promise<any>;
    sheetAction(name: string, data: object): Promise<any>;
    stateSheets(name: string, data: object): Promise<any>;
    stateSheetCount(name: string): Promise<any>;
    getSheet(name: string, id: number): Promise<any>;
    sheetArchives(name: string, data: object): Promise<any>;
    sheetArchive(name: string, id: number): Promise<any>;
    action(name: string, data: object): Promise<any>;
    queryPage(queryApi: string, name: string, pageStart: any, pageSize: number, params: any): Promise<string>;
    query(name: string, params: any): Promise<any>;
    user(): Promise<any>;
}
