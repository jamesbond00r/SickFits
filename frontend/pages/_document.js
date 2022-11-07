import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends  Document {   
    static getIntitalProps( {renderPage} ){
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();
    }
     render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </ Html>
        );
    }
}