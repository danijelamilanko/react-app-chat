import React, { Component } from 'react';

import classes from './Input.module.css';

class input extends Component {
    inputElement = null;
    inputClasses = [classes.InputElement];

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.invalid && nextProps.shouldValidate && nextProps.touched) {
            this.inputClasses = [...this.inputClasses, classes.Invalid];
        }
    }

    render () {
        switch (this.props.elementType) {
            case ('input'):
                this.inputElement = <input
                    className={this.inputClasses.join(' ')}
                    {...this.props.elementConfig}
                    value={this.props.value}
                    onChange={this.props.changed}/>;
                break;
            case ('textarea'):
                this.inputElement = <textarea
                    className={this.inputClasses.join(' ')}
                    {...this.props.elementConfig}
                    value={this.props.value}
                    onChange={this.props.changed}/>;
                break;
            case ('select'):
                this.inputElement = (
                    <select
                        className={this.inputClasses.join(' ')}
                        value={this.props.value}
                        onChange={this.props.changed}>
                        {this.props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                );
                break;
            default:
                this.inputElement = <input
                    className={this.inputClasses.join(' ')}
                    {...this.props.elementConfig}
                    value={this.props.value}
                    onChange={this.props.changed}
                    onKeyPress={this.props.keyPressed}/>;
        }
        return (
            <div className={classes.Input}>
                <label className={classes.Label}>{this.props.label}</label>
                {this.inputElement}
            </div>
        );
    }
}

export default input;
