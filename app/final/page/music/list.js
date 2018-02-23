import React from 'react';
import { MUSIC_LIST } from '../../config/config';
import ListItem from '../../components/listitem';
import axios from 'axios'
import Pagination from 'antd/lib/pagination';  // 加载 JS
import 'antd/lib/pagination/style/css';
var FontAwesome = require('react-fontawesome');
require('./list.less')
let List = React.createClass({
  searchFun() {
    var _this = this
    axios.get(`/song_search_v2?keyword=${encodeURI(this.state.value)}&page=2&userid=-1&clientver=&platform=WebFilter&&pagesize=20`).then(function (res) {
      _this.setState({
        musicList: res.data.data.lists
      })
    }).catch(function (error) {
      console.log(error);
    });
  },
  getInitialState: function () {
    return {
      value: '',
      musicList: this.props.musicList,
      currentMusitItem: this.props.currentMusitItem
    };
  },
  handleChange: function (event) {
    this.setState({ value: event.target.value });
  },
  //分页改变时
  pageOnChange(page, pageSize) {
    var _this = this
    axios.get(`/song_search_v2?keyword=${encodeURI(this.state.value)}&page=${page}&userid=-1&clientver=&platform=WebFilter&&pagesize=20`).then(function (res) {
      _this.setState({
        musicList: res.data.data.lists
      })
    }).catch(function (error) {
      console.log(error);
    });
  },
  render() {
    let Items = this.state.musicList.map((item) => {
      return (
        <ListItem
          key={item.ID}
          data={item}
          focus={this.state.currentMusitItem === item}
        ></ListItem>
      );
    });
    let inputValue = this.state.value
    return (
      <div className="music-list">
        <div className="search_input">
          <input type="text" value={inputValue} onChange={this.handleChange} />
          <div className="searh_btn" onClick={this.searchFun}>
            <FontAwesome name="search" size="lg" tag="i"></FontAwesome>
          </div>
        </div>
        <ul>
          {Items}
        </ul>
        <Pagination defaultCurrent={1} pageSize={20} total={870} onChange={this.pageOnChange} hideOnSinglePage />
        <div className="music-list-bac"></div>
      </div>
    );
  }
});

export default List;