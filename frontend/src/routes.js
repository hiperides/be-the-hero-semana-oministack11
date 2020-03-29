import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
    return(
        //BrowserRouter precisa estar por volta de tudo
        <BrowserRouter>
            {/* Ele vai garantir que apenas uma rota seja chamada por momento mesmo que o caminho dela seja semelhante ela nunca vai ser chamada mais de uma vez */}
            <Switch>
                {/* Ele cai sempre na primeira rota, a não ser que tenha o exact */}
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />

                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}