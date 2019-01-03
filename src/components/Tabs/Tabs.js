import React from 'react';

import classes from './Tabs.module.css';
import Tab from './Tab/Tab';

const tabs = (props) => {
    return (
        <ul className={classes.Tabs}>
            {props.tabs.map((tab, index) => (
                <Tab link="/"
                     key={tab}
                     active={props.activeChat === index}
                     onClick={props.tabSwitched}>{tab}</Tab>
            ))}
        </ul>
    );
};

export default tabs;
