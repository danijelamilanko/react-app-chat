import React from 'react';

import classes from './Tab.module.css';

const tab = (props) => {
    return (
        <li className={classes.Tab}>
            <a
                href={props.link}
                className={props.active ? classes.active : null}>{props.children}</a>
        </li>
    );
};

export default tab;
