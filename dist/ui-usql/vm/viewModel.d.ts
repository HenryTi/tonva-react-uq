import * as React from 'react';
export declare type TypeViewModel = typeof ViewModel;
export declare type TypeView = React.StatelessComponent<{
    vm: ViewModel;
    className?: string | string[];
}>;
export declare type TypeContent = React.StatelessComponent<any>;
export declare abstract class ViewModel {
    protected view: TypeView;
    render(className?: string | string[]): JSX.Element;
}
export declare const JSONContent: (values: any) => JSX.Element;
export declare const RowContent: (values: any) => JSX.Element;
