import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { VForm } from '../form';
import { VEntity } from '../VM';
import { CAction, ActionUI } from './cAction';
import { Action } from '../../entities';

export class VActionMain extends VEntity<Action, ActionUI, CAction> {
    private vForm: VForm;
    private returns: any;

    private onSubmit = async () => {
        this.returns = await this.controller.submit(this.vForm.values);
        this.closePage();
        this.openPage(this.resultPage);
    }

    async showEntry(param?:any):Promise<void> {
        this.vForm = this.createForm(this.onSubmit, param);
        this.openPage(this.mainPage);
    }

    protected mainPage = () => {
        let {label} = this.controller;
        return <Page header={label}>
            {this.vForm.render('mx-3 my-2')}
        </Page>;
    }

    protected resultPage = () => {
        let {label} = this.controller;
        return <Page header={label} back="close">
            完成！
            <pre>
                {JSON.stringify(this.returns, undefined, ' ')}
            </pre>
        </Page>;
    }
}
