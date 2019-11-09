import React from 'react';
import { useStateValue } from './State';
import Loader from './Components/Loader/Loader';
import AppRouter from './AppRouter';

function AppWithLoader() {
    const [{ loading }] = useStateValue();
    return (
        <Loader visible={loading}>
            <AppRouter />
        </Loader>
    );
}

export default AppWithLoader;
