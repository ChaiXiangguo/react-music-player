import React from 'react';
require('./navi.less');
import { Link } from 'react-router';
var menuData = require('../data/menuData.json')
let Navi = React.createClass({
    startMenu() {
        this.setState({
            selected: !this.state.selected
        })
    },
    // 点击菜单进入相应的模块
    contronCli(url, e){
        // browserHistory.push({pathname:url});
        e.stopepropagation
    },
    getInitialState() {
        return {
            selected: false,
            buttonText: 'START'
        }
    },
    render() {
    var menuArrs = []
    menuData.forEach(function (element, key) {
      menuArrs.push(<li key={key}><span><Link  to={element.url}>{element.title}</Link></span></li>)
    }.bind(this));
        return (
            <div className="radmenu"><span onClick={this.startMenu}  className={`show ${this.state.selected ? ' selected' : ''}`} >{this.state.buttonText}</span>
                <ul>
                 {menuArrs}
                </ul>
            </div>
        );
    }
});

export default Navi;