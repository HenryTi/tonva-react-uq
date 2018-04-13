import * as _ from 'lodash';
import {Api, ApiBase} from 'tonva-tools';

export class UsqlApi extends Api {
    access:string[];

    constructor(apiOwner:string, apiName:string, url:string, access:string[]) {
        let hash = document.location.hash;
        let baseUrl = hash===undefined || hash===''? 'debug/':'tv/';
        super(baseUrl, url, apiOwner, apiName);
        this.access = access;
    }

    async update():Promise<string> {
        return await this.get('update', {});
    }

    async loadAccess():Promise<any> {
        return await this.get('access', {acc:this.access.join('|')});
    }

    async schema(name:string):Promise<any> {
        return await this.get('schema/' + name, undefined);
    }

    async tuidGet(name:string, id:number):Promise<any> {
        return this.get('tuid/' + name + '/' + id, {});
    }

    async tuidSave(name:string, params):Promise<any> {
        return this.post('tuid/' + name, params);
    }

    async tuidSearch(name:string, key:string, pageStart:string|number, pageSize:number):Promise<any> {
        let ret = await this.post('tuids/' + name, {
            key: key,
            pageStart: pageStart,
            pageSize: pageSize
        });
        return ret;
    }

    async tuidIds(name:string, ids:number[]):Promise<any[]> {
        return await this.post('tuidids/' + name, ids);
    }

    async sheetSave(name:string, data:object):Promise<any> {
        return await this.post('sheet/' + name, data);
    }

    async sheetAction(name:string, data:object) {
        return await this.put('sheet/' + name, data);
    }

    async stateSheets(name:string, data:object) {
        return await this.post('sheet/' + name + '/states', data);
    }

    async stateSheetCount(name:string):Promise<any> {
        return await this.get('sheet/' + name + '/statecount', undefined);
    }

    async getSheet(name:string, id:number):Promise<any> {
        return await this.get('sheet/' + name + '/get/' + id, undefined);
    }

    async sheetArchives(name:string, data:object):Promise<any> {
        return await this.post('sheet/' + name + '/archives', data);
    }

    async sheetArchive(name:string, id:number):Promise<any> {
        return await this.get('sheet/' + name + '/archive/' + id, undefined);
    }

    async action(name:string, data:object):Promise<any> {
        return await this.post('action/' + name, data);
    }

    async queryPage(queryApi:string, name:string, pageStart:any, pageSize:number, params:any):Promise<string> {
        let p = _.clone(params);
        p['$pageStart'] = pageStart;
        p['$pageSize'] = pageSize;
        return await this.post(queryApi + '/' + name, p);
    }
/*
    async history(name:string, pageStart:any, pageSize:number, params:any):Promise<string> {
        let p = _.clone(params);
        p['$pageStart'] = pageStart;
        p['$pageSize'] = pageSize;
        let ret = await this.post('history/' + name, p);
        return ret;
    }

    async book(name:string, pageStart:any, pageSize:number, params:any):Promise<string> {
        let p = _.clone(params);
        p['$pageStart'] = pageStart;
        p['$pageSize'] = pageSize;
        let ret = await this.post('history/' + name, p);
        return ret;
    }
*/
    async user():Promise<any> {
        return await this.get('user', undefined);
    }
}