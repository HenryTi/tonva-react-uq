import * as React from 'react';
import { Controller } from 'tonva-tools';
import { Entities, TuidMain, Action, Sheet, Query, Book, Map, Entity, Tuid, Usq, History, Pending } from '../../entities';
import { CLink } from '../link';
import { CBook, BookUI } from '../book';
import { CSheet, SheetUI } from '../sheet';
import { ActionUI, CAction } from '../action';
import { QueryUI, CQuery, CQuerySelect } from '../query';
import { CTuidMain, TuidUI, CTuidInfo, CTuidSelect } from '../tuid';
import { MapUI, CMap } from '../map';
import { CEntity, EntityUI } from '../CVEntity';
import { VUsq } from './vUsq';
import { CHistory, HistoryUI } from '../history';
import { CPending, PendingUI } from '../pending';
export declare type EntityType = 'sheet' | 'action' | 'tuid' | 'query' | 'book' | 'map' | 'history' | 'pending';
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
    tuid?: {
        [name: string]: TuidUI;
    };
    sheet?: {
        [name: string]: SheetUI;
    };
    action?: {
        [name: string]: ActionUI;
    };
    map?: {
        [name: string]: MapUI;
    };
    query?: {
        [name: string]: QueryUI;
    };
    book?: {
        [name: string]: BookUI;
    };
    history?: {
        [name: string]: HistoryUI;
    };
    pending?: {
        [name: string]: PendingUI;
    };
    res?: any;
}
export declare class CUsq extends Controller implements Usq {
    private ui;
    private CTuidMain;
    private CTuidSelect;
    private CTuidInfo;
    private CQuery;
    private CQuerySelect;
    private CMap;
    private CAction;
    private CSheet;
    private CBook;
    private CHistory;
    private CPending;
    constructor(usq: string, appId: number, usqId: number, access: string, ui: UsqUI);
    protected internalStart(): Promise<void>;
    usq: string;
    id: number;
    res: any;
    entities: Entities;
    error: string;
    protected loadEntites(): Promise<void>;
    loadSchema(): Promise<void>;
    getTuid(name: string): TuidMain;
    getQuerySearch(name: string): Promise<Query>;
    getTuidPlaceHolder(tuid: Tuid): any;
    getNone(): any;
    protected isSysVisible: boolean;
    protected isVisible(entity: Entity): boolean;
    navSheet(sheetTypeId: number, sheetId: number): Promise<void>;
    cFromName(entityType: EntityType, entityName: string): CEntity<Entity, EntityUI>;
    linkFromName(entityType: EntityType, entityName: string): CLink;
    private getUI;
    link(cEntity: CEntity<Entity, EntityUI>): CLink;
    readonly tuidLinks: CLink[];
    cTuidMain(tuid: TuidMain): CTuidMain;
    cTuidSelect(tuid: Tuid): CTuidSelect;
    cTuidInfo(tuid: TuidMain): CTuidInfo;
    cSheet(sheet: Sheet): CSheet;
    readonly sheetLinks: CLink[];
    cAction(action: Action): CAction;
    readonly actionLinks: CLink[];
    cQuery(query: Query): CQuery;
    cQuerySelect(queryName: string): CQuerySelect;
    readonly queryLinks: CLink[];
    cBook(book: Book): CBook;
    readonly bookLinks: CLink[];
    cHistory(history: History): CHistory;
    readonly historyLinks: CLink[];
    cPending(pending: Pending): CPending;
    readonly pendingLinks: CLink[];
    cMap(map: Map): CMap;
    readonly mapLinks: CLink[];
    getTuidContent(tuid: Tuid): React.StatelessComponent<any>;
    showTuid(tuid: Tuid, id: number): Promise<void>;
    protected readonly VUsq: typeof VUsq;
    render(): JSX.Element;
}