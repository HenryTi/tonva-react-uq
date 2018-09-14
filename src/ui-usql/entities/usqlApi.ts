import * as _ from 'lodash';
import {UsqApi, ApiBase} from 'tonva-tools';
/*
export class UsqlApi {
    private api: UsqApi;
    private access:string[];

    constructor(api: UsqApi, access:string[]) {
        this.api = api;
        this.access = access;
    }

    async update():Promise<string> {
        return await this.api.get('update', {});
    }

    async loadAccess():Promise<any> {
        return await this.api.get('access', {acc:this.access.join('|')});
    }

    async schema(name:string):Promise<any> {
        return await this.api.get('schema/' + name, undefined);
    }

    async schemas(names:string[]):Promise<any[]> {
        return await this.api.post('schema', names);
    }

    async tuidGet(name:string, id:number):Promise<any> {
        return await this.api.get('tuid/' + name + '/' + id, {});
    }

    async tuidGetAll(name:string):Promise<any[]> {
        return await this.api.get('tuid-all/' + name + '/', {});
    }

    async tuidSave(name:string, params):Promise<any> {
        return await this.api.post('tuid/' + name, params);
    }

    async tuidSearch(name:string, arr:string, owner:number, key:string, pageStart:string|number, pageSize:number):Promise<any> {
        let ret = await this.api.post('tuids/' + name, {
            arr: arr,
            owner: owner,
            key: key,
            pageStart: pageStart,
            pageSize: pageSize
        });
        return ret;
    }
    async tuidArrGet(name:string, arr:string, owner:number, id:number):Promise<any> {
        return await this.api.get('tuid-arr/' + name + '/' + owner + '/' + arr + '/' + id, {});
    }
    async tuidArrGetAll(name:string, arr:string, owner:number):Promise<any[]> {
        return await this.api.get('tuid-arr-all/' + name + '/' + owner + '/' + arr + '/', {});
    }
    async tuidArrSave(name:string, arr:string, owner:number, params):Promise<any> {
        return await this.api.post('tuid-arr/' + name + '/' + owner + '/' + arr + '/', params);
    }
    async tuidArrPos(name:string, arr:string, owner:number, id:number, order:number):Promise<any> {
        return await this.api.post('tuid-arr-pos/' + name + '/' + owner + '/' + arr + '/', {
            id: id,
            $order: order
        });
    }

    async tuidBindSlaveSave(name:string, slave, params):Promise<any> {
        return await this.api.post('tuid-bindSlave/' + name + '/' + slave, params);
    }

    async tuidBindSlaves(name:string, slave:string, masterId:number, order:number, pageSize:number) {
        let ret = await this.api.get('tuid-bindSlaves/' + name, {
            slave: slave,
            masterId: masterId,
            pageStart: order,
            pageSize: pageSize
        });
        return ret;
    }

    async tuidIds(name:string, arr:string, ids:number[]):Promise<any[]> {
        try {
            let url = 'tuidids/' + name + '/';
            if (arr !== undefined) url += arr;
            else url += '$';
            let ret = await this.api.post(url, ids);
            return ret;
        }
        catch (e) {
            console.error(e);
        }
    }

    async proxied(name:string, proxy:string, id:number):Promise<any> {
        try {
            let url = 'tuid-proxy/' + name + '/' + proxy + '/' + id;
            let ret = await this.api.get(url, undefined);
            return ret;
        }
        catch (e) {
            console.error(e);
        }
    }

    async sheetSave(name:string, data:object):Promise<any> {
        return await this.api.post('sheet/' + name, data);
    }

    async sheetAction(name:string, data:object) {
        return await this.api.put('sheet/' + name, data);
    }

    async stateSheets(name:string, data:object) {
        return await this.api.post('sheet/' + name + '/states', data);
    }

    async stateSheetCount(name:string):Promise<any> {
        return await this.api.get('sheet/' + name + '/statecount', undefined);
    }

    async getSheet(name:string, id:number):Promise<any> {
        return await this.api.get('sheet/' + name + '/get/' + id, undefined);
    }

    async sheetArchives(name:string, data:object):Promise<any> {
        return await this.api.post('sheet/' + name + '/archives', data);
    }

    async sheetArchive(name:string, id:number):Promise<any> {
        return await this.api.get('sheet/' + name + '/archive/' + id, undefined);
    }

    async action(name:string, data:object):Promise<any> {
        return await this.api.post('action/' + name, data);
    }

    async queryPage(queryApi:string, name:string, pageStart:any, pageSize:number, params:any):Promise<string> {
        let p = _.clone(params||{});
        p['$pageStart'] = pageStart;
        p['$pageSize'] = pageSize;
        return await this.api.post(queryApi + '/' + name, p);
    }

    async query(name:string, params:any):Promise<any> {
        let ret = await this.api.post('query/' + name, params);
        return ret;
    }

    async user():Promise<any> {
        return await this.api.get('user', undefined);
    }
}
*/