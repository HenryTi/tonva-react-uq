import * as React from 'react';
import { observer } from 'mobx-react';
import { TonvaForm, List, SubmitResult, FA } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { Tuid, Query, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../vmEntity';
import { VmApi } from '../vmApi';

export abstract class VmQuery extends VmEntity {
    entity: Query;

    constructor(vmApi:VmApi, query:Query) {
        super(vmApi, query);
    }

    get icon() {return vmLinkIcon('text-warning', 'search')}
}