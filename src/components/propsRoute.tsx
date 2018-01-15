import * as React from 'react';
import { Route } from 'react-router-dom';

const renderMergedProps: any = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute: any = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={(routeProps) => {
            return renderMergedProps(component, routeProps, rest);
        }} />
    );
};

export default PropsRoute;
