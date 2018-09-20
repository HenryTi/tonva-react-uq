import * as React from 'react';
import { VField } from './vField';
import { VArr } from './vArr';
import { VSubmit } from './vSubmit';
import { uid } from 'tonva-react-form';

export abstract class VBand {
    protected label: string;
    protected view = () => <div />;

    constructor(label:string) {
        this.label = label;
    }

    render():JSX.Element {
        return <div key={this.key} className='form-group row'>
            <label className='col-sm-2 col-form-label text-sm-right'>
                {this.label}
            </label>
            <div className="col-sm-10">
                {this.renderContent()}
            </div>
        </div>;
    }

    protected get key() {return this.label}
    public getVFields():VField[] {return;}
    public getVArr():VArr {return;}
    public getVSubmit():VSubmit {return;}

    protected renderContent():JSX.Element {
        return <div className="form-control form-control-plaintext bg-white border border-info rounded ">content</div>;
    }
}

export class VFieldBand extends VBand {
    protected vField:VField;
    constructor(label:string, vField:VField) {
        super(label);
        this.vField = vField;
    }

    protected get key() {return this.vField.name}
    public getVFields():VField[] {return [this.vField];}

    protected renderContent():JSX.Element {
        return this.vField.render();
        /*
        <div className="form-control form-control-plaintext bg-white border border-info rounded ">
            {this.vField.render()}
        </div>;*/
    }
}

export class VArrBand extends VBand {
    protected vArr:VArr;
    constructor(label:string, vArr:VArr) {
        super(label);
        this.vArr = vArr;
    }

    protected get key() {return this.vArr.name}
    public getVArr():VArr {return this.vArr;}

    render():JSX.Element {
        return <div key={this.key} className="form-group row flex-column">
            {this.vArr && this.vArr.render()}
        </div>;
    }
}

export class VFieldsBand extends VBand {
    protected vFields: VField[];
    constructor(label:string, vFields:VField[]) {
        super(label);
        this.vFields = vFields;
    }

    protected get key() {return this.label || uid()}
    public getVFields():VField[] {return this.vFields;}

    protected renderContent():JSX.Element {
        return <div className="form-control form-control-plaintext bg-white border border-info rounded ">
            fields
        </div>;
    }
}

export class VSubmitBand extends VBand {
    protected vSubmit: VSubmit;
    constructor(vSubmit:VSubmit) {
        super(undefined);
        this.vSubmit = vSubmit;
    }

    public getVSubmit():VSubmit {return this.vSubmit;}

    render():JSX.Element {
        return <div key="$submit" className="form-group row">
            <div className="offset-sm-2 col-sm-10">
                {this.vSubmit.render()}
            </div>
        </div>;
    }
}
