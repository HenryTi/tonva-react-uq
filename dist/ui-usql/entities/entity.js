var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const tab = '\t';
const ln = '\n';
export class Entity {
    get sName() { return this.jName || this.name; }
    constructor(entities, name, typeId) {
        this.entities = entities;
        this.name = name;
        this.typeId = typeId;
        this.sys = this.name.indexOf('$') >= 0;
    }
    get tvApi() { return this.entities.usqApi; }
    loadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.schema !== undefined)
                return;
            let schema = yield this.entities.usqApi.schema(this.name);
            this.setSchema(schema);
        });
    }
    setSchema(schema) {
        if (schema === undefined)
            return;
        if (this.schema !== undefined)
            return;
        this.schema = schema;
        let { name, fields, arrs, returns } = schema;
        if (name !== this.name)
            this.jName = name;
        this.entities.buildFieldTuid(this.fields = fields);
        this.entities.buildArrFieldsTuid(this.arrFields = arrs, fields);
        this.entities.buildArrFieldsTuid(this.returns = returns, fields);
        //this.newMain = this.buildCreater(fields);
        //this.newArr = this.buildArrCreater(arrs);
        //this.newRet = this.buildArrCreater(returns);
    }
    schemaStringify() {
        return JSON.stringify(this.schema, (key, value) => {
            if (key === '_tuid')
                return undefined;
            return value;
        }, 4);
    }
    tuidFromField(field) {
        let { _tuid, tuid } = field;
        if (tuid === undefined)
            return;
        if (_tuid !== undefined)
            return _tuid;
        return field._tuid = this.entities.getTuid(tuid, undefined);
    }
    tuidFromName(fieldName, arrName) {
        if (this.schema === undefined)
            return;
        let { fields, arrs } = this.schema;
        let entities = this.entities;
        function getTuid(fn, fieldArr) {
            if (fieldArr === undefined)
                return;
            let f = fieldArr.find(v => v.name === fn);
            if (f === undefined)
                return;
            return entities.getTuid(f.tuid, undefined);
        }
        let fn = fieldName.toLowerCase();
        if (arrName === undefined)
            return getTuid(fn, fields);
        if (arrs === undefined)
            return;
        let an = arrName.toLowerCase();
        let arr = arrs.find(v => v.name === an);
        if (arr === undefined)
            return;
        return getTuid(fn, arr.fields);
    }
    pack(data) {
        let ret = [];
        //if (schema === undefined || data === undefined) return;
        let fields = this.fields;
        if (fields !== undefined)
            this.packRow(ret, fields, data);
        let arrs = this.arrFields; //schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                this.packArr(ret, arr.fields, data[arr.name]);
            }
        }
        return ret.join('');
    }
    escape(d) {
        switch (typeof d) {
            default: return d;
            case 'object': return d.id;
            case 'string':
                let len = d.length;
                let r = '', p = 0;
                for (let i = 0; i < len; i++) {
                    let c = d.charCodeAt(i);
                    switch (c) {
                        case 9:
                            r += d.substring(p, i) + '\\t';
                            p = i + 1;
                            break;
                        case 10:
                            r += d.substring(p, i) + '\\n';
                            p = i + 1;
                            break;
                    }
                }
                return r + d.substring(p);
            case 'undefined': return '';
        }
    }
    packRow(result, fields, data) {
        let len = fields.length;
        if (len === 0)
            return;
        let ret = '';
        ret += this.escape(data[fields[0].name]);
        for (let i = 1; i < len; i++) {
            let f = fields[i];
            ret += tab + this.escape(data[f.name]);
        }
        result.push(ret + ln);
    }
    packArr(result, fields, data) {
        if (data !== undefined) {
            for (let row of data) {
                this.packRow(result, fields, row);
            }
        }
        result.push(ln);
    }
    unpackSheet(data) {
        let ret = {}; //new this.newMain();
        //if (schema === undefined || data === undefined) return;
        let fields = this.fields;
        let p = 0;
        if (fields !== undefined)
            p = this.unpackRow(ret, fields, data, p);
        let arrs = this.arrFields; //schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    unpackReturns(data) {
        let ret = {};
        //if (schema === undefined || data === undefined) return;
        //let fields = schema.fields;
        let p = 0;
        //if (fields !== undefined) p = unpackRow(ret, schema.fields, data, p);
        let arrs = this.returns; //schema['returns'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                //let creater = this.newRet[arr.name];
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    unpackRow(ret, fields, data, p) {
        let ch0 = 0, ch = 0, c = p, i = 0, len = data.length, fLen = fields.length;
        for (; p < len; p++) {
            ch0 = ch;
            ch = data.charCodeAt(p);
            if (ch === 9) {
                let f = fields[i];
                if (ch0 !== 8) {
                    let v = data.substring(c, p);
                    ret[f.name] = this.to(ret, v, f);
                }
                else {
                    let s = null;
                }
                c = p + 1;
                ++i;
                if (i >= fLen)
                    break;
            }
            else if (ch === 10) {
                let f = fields[i];
                if (ch0 !== 8) {
                    let v = data.substring(c, p);
                    ret[f.name] = this.to(ret, v, f);
                }
                else {
                    let s = null;
                }
                ++p;
                ++i;
                break;
            }
        }
        return p;
    }
    to(ret, v, f) {
        switch (f.type) {
            default: return v;
            case 'datetime':
            case 'date':
            case 'time':
                let date = new Date(Number(v));
                return date;
            case 'tinyint':
            case 'smallint':
            case 'int':
            case 'dec': return Number(v);
            case 'bigint':
                let id = Number(v);
                let { _tuid } = f;
                if (_tuid === undefined)
                    return id;
                _tuid.useId(id, true);
                //let val = _tuid.valueFromId(id);
                //return val.obj || val;
                return _tuid.boxId(id);
            /*
            if (tuidKey !== undefined) {
                let tuid = f._tuid;
                if (tuid === undefined) {
                    // 在jsonStringify中间不会出现
                    Object.defineProperty(f, '_tuid', {value:'_tuid', writable: true});
                    f._tuid = tuid = this.getTuid(tuidKey, tuidUrl);
                }
                tuid.useId(Number(v), true);
            }*/
            //return Number(v);
        }
    }
    unpackArr(ret, arr, data, p) {
        let vals = [], len = data.length;
        let { name, fields } = arr;
        while (p < len) {
            let ch = data.charCodeAt(p);
            if (ch === 10) {
                ++p;
                break;
            }
            let val = {}; //new creater();
            vals.push(val);
            p = this.unpackRow(val, fields, data, p);
        }
        ret[name] = vals;
        return p;
    }
}
//# sourceMappingURL=entity.js.map