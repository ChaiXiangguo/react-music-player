import React from 'react';
require('./navi.less');

var FontAwesome = require('react-fontawesome');
import { Link, browserHistory } from 'react-router';
var menuData = require('../data/menuData.json')
let Navi = React.createClass({
    startMenu(selected) {
        
    },
    // 点击菜单进入相应的模块
    contronCli(e) {
        // browserHistory.push(`/#${url}?`);
        this.props.callbackParent(false)
        e.stopepropagation
    },
    getInitialState() {
        return {
        }
    },
    render() {
        var menuArrs = []
        menuData.forEach(function (element, key) {
            menuArrs.push(<li key={key}><div><span>
                <Link onClick={this.contronCli} to={element.url} title={element.title}>
                <FontAwesome name={element.icon} size='2x' tag="i"></FontAwesome>
                &nbsp;{element.title}
                </Link>
            </span></div></li>)
        }.bind(this));
        return (
            <div className={`circle-box ${this.props.selected ? 'hidemenuStyle' : 'showmenuStyle'}`}>
                <div className="start-button">
                <Link onClick={this.contronCli} to="/"><FontAwesome name="home" size='2x' tag="i"></FontAwesome>首页</Link>
                </div>
                <ul className={`${this.props.selected ? 'selected' : ''}`}>
                    {menuArrs}
                </ul>
            </div>
        )
    }
});

export default Navi;