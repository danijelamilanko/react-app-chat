import React, { Component } from 'react';

import classes from './Tab.module.css';

class Tab extends Component {

    tabClick = (event, tabId) => {
        event.preventDefault();
        this.props.tabClicked(tabId);
    };

    render() {
        return (
            <li className={classes.Tab}>
                <a onClick={(event) => {this.tabClick(event, this.props.tabId)}}
                   href={this.props.link}
                   className={this.props.active ? classes.active : null}>{this.props.children}</a>
            </li>
        );
    }
};

export default Tab;
