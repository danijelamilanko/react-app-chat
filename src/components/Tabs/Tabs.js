import React from 'react';

import classes from './Tabs.module.css';
import Tab from './Tab/Tab';


const Tabs = (props) => {
    return (
        <ul className={classes.Tabs}>
            {props.tabs.map(tab => (
                <Tab link="/" active>{tab.title}</Tab>
            ))}
        </ul>
    );
};

export default Tabs;