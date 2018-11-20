import * as React from 'react';
export const tv = (tuidValue, ui, x, nullUI) => {
    let ttv = typeof tuidValue;
    switch (ttv) {
        default:
            if (ui === undefined)
                return React.createElement(React.Fragment, null,
                    ttv,
                    "-",
                    tuidValue);
            else
                return ui(tuidValue, x);
        case 'undefined':
            if (nullUI === undefined)
                return React.createElement(React.Fragment, null, "null");
            return nullUI();
        case 'object':
            if (tuidValue === null) {
                if (nullUI === undefined)
                    return React.createElement(React.Fragment, null, "null");
                return nullUI();
            }
            return tuidValue.content(ui, x);
        case 'number':
            return React.createElement(React.Fragment, null,
                "id...",
                tuidValue);
    }
};
//# sourceMappingURL=tv.js.map