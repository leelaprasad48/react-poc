import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { APP_BASE_PATH } from './configs/constants';
import routes from './configs/routes';

function App() {
    return (
        <div className="App">
            <Router basename={APP_BASE_PATH}>
                <Switch>
                    {routes.map(({ path, component: Component, isExact }, key) => (
                        <Route
                            exact={isExact}
                            key={key}
                            path={path}
                            render={() => <Component />}
                        />
                    ))}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
