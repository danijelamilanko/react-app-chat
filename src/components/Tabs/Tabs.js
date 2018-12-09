import React from 'react';

import classes from './Tabs.module.css';
import Tab from './Tab/Tab';

const tabs = (props) => {
    return (
        <ul className={classes.Tabs}>
            {props.tabs.map(tab => (
                <Tab link="/" key={tab.title} active>{tab.title}</Tab>
            ))}
        </ul>
    );
};

export default tabs;