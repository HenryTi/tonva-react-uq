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
    loadSchema(): Promise<string>;
    getQuerySearch(name: string): Promise<Query>;
    getTuidPlaceHolder(tuid: Tuid): any;
    getNone(): any;
    protected isSysVisible: boolean;
    protected isVisible(entity: Entity): boolean;
    navSheet(sheetTypeId: number, sheetId: number): Promise<void>;
    sheet(entityName: string): Sheet;
    action(entityName: string): Action;
    query(entityName: string): Query;
    book(entityName: string): Book;
    map(entityName: string): Map;
    history(entityName: string): History;
    pending(entityName: string): Pending;
    tuid(entityName: string): TuidMain;
    tuidDiv(entityName: string, divName: string): import("src/ui-usql/entities/tuid").TuidDiv;
    cSheetFromName(entityName: string): CSheet;
    cActionFromName(entityName: string): CAction;
    cQueryFromName(entityName: string): CQuery;
    cBookFromName(entityName: string): CBook;
    cMapFromName(entityName: string): CMap;
    cHistoryFromName(entityName: string): CHistory;
    cPendingFromName(entityName: string): CPending;
    cTuidMainFromName(entityName: string): CTuidMain;
    cTuidInfoFromName(entityName: string): CTuidInfo;
    cTuidSelectFromName(entityName: string): CTuidSelect;
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
