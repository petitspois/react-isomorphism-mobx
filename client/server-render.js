import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router';
import { Provider, useStaticRendering } from 'mobx-react';
import { matchPath } from 'react-router';
import App from './app'
import stores from './common/stores'
import routes from './common/routes'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
const sheet = new ServerStyleSheet()



async function clientRoute(req, res, next) {

    useStaticRendering(true);

    const context = {}

    const match = routes.find((route) => matchPath(req.url, route));

    let initialState = match.store ? await stores[match.store].getInitialProps() : null;

    const html = renderToString(
        <Provider {...stores}>
            <StaticRouter location={req.url} context={context}>
                <StyleSheetManager sheet={sheet.instance}>
                    <App />
                </StyleSheetManager>
            </StaticRouter>
        </Provider>
    );

    const css = sheet.getStyleTags();

    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        })
        res.end();
    } else {
        res.render('index', {
            root: html,
            state: initialState,
            css: css
        });
    }
}

module.exports = clientRoute;