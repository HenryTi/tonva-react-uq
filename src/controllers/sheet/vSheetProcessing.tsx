import React from 'react';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { nav, Page } from 'tonva-tools';
import { VSheetView } from './vSheetView';
import { SheetData } from './cSheet';
import { FA } from 'tonva-react-form';

export class VSheetProcessing extends VSheetView { 
    async showEntry(sheetData:SheetData) {
        this.sheetData = sheetData;
        //let {brief, data, flows} = await this.controller.getSheetData(sheetId);
        //this.brief = brief;
        //this.flows = flows;
        //this.data = data;
        //this.state = this.brief.state;
        this.vForm = this.createForm(undefined, sheetData.data);
        this.openPage(this.page);
    }

    protected page = () => {
        let {brief} = this.sheetData;
        let {state, no} = brief;
        let stateLabel = this.controller.getStateLabel(state);
        return <Page header={this.label + ':' + stateLabel + '-' + no}>
            <div className="mb-2">
                <div className="d-flex px-3 py-2 border-bottom bg-light">
                    正在处理中...
                </div>
                <this.sheetView />
            </div>
        </Page>;
    }
}
