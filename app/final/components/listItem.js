import React from 'react';
require('./listitem.less');
let PubSub = require('pubsub-js');
import Icon from 'antd/lib/icon';  // 加载 JS
import 'antd/lib/icon/style/css';
let ListItem = React.createClass({
	deleteHandler(item, event) {
		event.stopPropagation();
		PubSub.publish('DEL_MUSIC', item);
	},
	playMusic(item, e) {
		PubSub.publish('PLAY_MUSIC', item);
	},
    render() {
    	let item = this.props.data;
        return (
            <li className={`row components-listitem${this.props.focus ? ' focus' : ''}`} onClick={this.playMusic.bind(this, item)}>
                <p><span className="bold">{item.OriSongName}</span>  -  {item.SingerName}</p>
                <p className="-col-auto delete" onClick={this.deleteHandler.bind(this, item)}></p>
                <Icon type="heart-o" style={{ fontSize: 20, width:50, color: '#333' }}/>
            </li>
        );
    }
});

export default ListItem;
