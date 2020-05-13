import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
ReactDom.render(<App />,
    document.querySelector("#root")
);
if (module.hot) {
    module.hot.accept(App, function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}