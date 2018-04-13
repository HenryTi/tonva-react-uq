/// <reference types="react" />
import * as React from 'react';
import { SheetUIProps } from '../../ui';
export interface State {
    flows: any;
    data: any;
}
export declare class SheetActionPage extends React.Component<SheetUIProps, State> {
    constructor(props: any);
    componentDidMount(): Promise<void>;
    actionClick(action: any): Promise<void>;
    mapper(row: any, index: number): JSX.Element;
    render(): JSX.Element;
}