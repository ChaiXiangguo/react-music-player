import React, { render } from 'react';
import { Router, IndexRoute, Link, Route,  hashHistory, IndexRedirect } from 'react-router';
import { MUSIC_LIST } from './config/config';
import { randomRange } from './utils/util';
let PubSub = require('pubsub-js');
import Navi from './components/navi';
import Home from './page/home';
import PlayerPage from './page/music';
import listPage from './page/music/list';
import Logo from './components/logo'
import MoreInfor from './page/moreInfor'
import Blog from './page/blog'
import Developer from './page/developer'
import Download from './page/download'
import Literature from './page/literature'
import Music from './page/music'
import Recomend from './page/Recomend'
import User from './page/user'
import signIn from './page/user/signin'
import signUp from './page/user/signup'
import Uttearance from './page/Uttearance'
var FontAwesome = require('react-fontawesome');
let App = React.createClass({
	componentDidMount() {
		console.log(this.state)
		$("#player").jPlayer({
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});

		$("#player").bind($.jPlayer.event.ended, (e) => {
			this.playWhenEnd();
		});
		PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
			this.playMusic(item);
		});
		PubSub.subscribe('DEL_MUSIC', (msg, item) => {
			this.setState({
				musicList: this.state.musicList.filter((music) => {
					return music !== item;
				})
			});
		});
		PubSub.subscribe('PLAY_NEXT', () => {
			this.playNext();
		});
		PubSub.subscribe('PLAY_PREV', () => {
			this.playNext('prev');
		});
		let repeatList = [
			'cycle',
			'once',
			'random'
		];
		PubSub.subscribe('CHANAGE_REPEAT', () => {
			let index = repeatList.indexOf(this.state.repeatType);
			index = (index + 1) % repeatList.length;
			this.setState({
				repeatType: repeatList[index]
			});
		});
		PubSub.subscribe('LOGIN_SUCCESS', (msg, item) => {
			 this.setState({
				nickname: item.nickname,
				id: item._id
			 })
		});
	},
	componentWillUnmount() {
		PubSub.unsubscribe('PLAY_MUSIC');
		PubSub.unsubscribe('DEL_MUSIC');
		PubSub.unsubscribe('CHANAGE_REPEAT');
		PubSub.unsubscribe('PLAY_NEXT');
		PubSub.unsubscribe('PLAY_PREV');
		PubSub.unsubscribe('LOGIN_SUCCESS');
	},
	getInitialState() {
		return {
			musicList: MUSIC_LIST,
			currentMusitItem: {},
			repeatType: 'cycle',
			showMenu: false,
			nickname: '',
			id: ''
		}
	},
	playWhenEnd() {
		if (this.state.repeatType === 'random') {
			let index = this.findMusicIndex(this.state.currentMusitItem);
			let randomIndex = randomRange(0, this.state.musicList.length - 1);
			while (randomIndex === index) {
				randomIndex = randomRange(0, this.state.musicList.length - 1);
			}
			this.playMusic(this.state.musicList[randomIndex]);
		} else if (this.state.repeatType === 'once') {
			this.playMusic(this.state.currentMusitItem);
		} else {
			this.playNext();
		}
	},
	playNext(type = 'next') {
		let index = this.findMusicIndex(this.state.currentMusitItem);
		if (type === 'next') {
			index = (index + 1) % this.state.musicList.length;
		} else {
			index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
		}
		let musicItem = this.state.musicList[index];
		this.setState({
			currentMusitItem: musicItem
		});
		this.playMusic(musicItem);
	},
	findMusicIndex(music) {
		let index = this.state.musicList.indexOf(music);
		return Math.max(0, index);
	},
	playMusic(item) {
		$("#player").jPlayer("setMedia", {
			mp3: item.file
		}).jPlayer('play');
		this.setState({
			currentMusitItem: item
		});
	},
	startmenu() {
		this.setState({
			showMenu: !this.state.showMenu
		})
	},
	onChildChanged(newState) {
		this.setState({
			showMenu: newState
		});
	},
	pathFun(path, e) {
		hashHistory.push(path)
    e.stopepropagation
	},
	render() {
		return (
			<div>
				<nav className="title-box">
					<span className="welcome-title" hidden={!this.state.nickname}>欢迎 {this.state.nickname}访问guoger的博客</span>	
					<ul className="menu-style">
					  <li onClick={this.pathFun.bind(this, '/')}>首页</li>
					  <li hidden={this.state.nickname} onClick={this.pathFun.bind(this, '/signup')}>注册</li>
					  <li hidden={this.state.nickname} onClick={this.pathFun.bind(this, '/signin')}>登录</li>
						<li onClick={this.startmenu}>导航 <FontAwesome name='navicon' size="lg" tag="i"></FontAwesome></li>
					</ul>
					<Navi callbackParent = {this.onChildChanged} selected={this.state.showMenu}/>
				</nav>
				<div className="container">
					{React.cloneElement(this.props.children, this.state)}
				</div>
				<div className="out-menu" onClick={this.onChildChanged.bind(this, false)} hidden={!this.state.showMenu}></div> 
			</div>
		);
	}
});

let Root = React.createClass({
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Home} />
					<Route path="/about" component={MoreInfor} />
					<Route path="/music" component={PlayerPage} />
					<Route path="/blog" component={Blog} />
					<Route path="/developer" component={Developer} />
					<Route path="/download" component={Download} />
					<Route path="/literature" component={Literature} />
					<Route path="/recommend" component={Recomend} />
					<Route path="/user" component={User} />
					<Route path="/utterance" component={Uttearance} />
					<Route path="/list" component={listPage} />
					<Route path="/signin" component={signIn} />
					<Route path="/signup" component={signUp} />
				</Route>
			</Router>
		);
	}
});

export default Root;
