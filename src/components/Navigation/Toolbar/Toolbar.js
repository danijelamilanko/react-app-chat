import React from 'react';

import classes from './Toolbar.module.css'
import Tabs from "../../Tabs/Tabs";

const tabs = [
    { title: 'Account' },
    { title: 'Login' }
];

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <div>LOGO</div>
        <nav>
            <Tabs tabs={tabs}/>
        </nav>
    </header>
);

export default toolbar;