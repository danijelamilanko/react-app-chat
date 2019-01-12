import React, { Component } from 'react';

import classes from './Tab.module.css';

class Tab extends Component {

    tabClick = (event, tabId) => {
        event.preventDefault();
        this.props.tabClicked(tabId);
    };

    tabClose = (tabId) => {
        this.props.tabClosed(tabId);
    };

    render() {
        return (
            <li className={classes.Tab}>
                <a onClick={(event) => {this.tabClick(event, this.props.tabId)}}
                   href={this.props.link}
                   className={this.props.active ? classes.active : null}>{this.props.children}</a>
                {!this.props.isLast ? <span className="fa fa-times"
                      onClick={() => {this.tabClose(this.props.tabId)}}></span> : null}
            </li>
        );
    }
}

export default Tab;
