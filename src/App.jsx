import React from 'react';
import {Footer, Loading, ScrollToTop} from './components/UIkit'
import {Header} from './components/Header'
import Router from "./Router";

const App = () => {
    return (
        <Loading>
            <ScrollToTop />
            <Header />
            <main>

                <Router />

                <section>
                    <div className="module-spacer--medium" />
                    <div className="module-spacer--medium" />
                </section>
            </main>
            <Footer />
        </Loading>
    );
};

export default App;
