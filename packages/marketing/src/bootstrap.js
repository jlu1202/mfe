import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './app';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App history={history} />, el);

    return {
        onParentNavigate({ pathname: nextPathname }) {
            console.log('MarketingApp: Container just navigated');
            const { pathname } = history.location;
            console.log('MarketingApp: nextPathname ', nextPathname);

            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        },
    };
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_marketing-dev-root');

    if (el) {
        mount(el, { defaultHistory: createBrowserHistory() });
    }
};

// We are running through container and we should export the mount function
export { mount };