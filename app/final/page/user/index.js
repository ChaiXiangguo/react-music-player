import React from 'react';
require('./style.less');
let User = React.createClass({
    getInitialState() {
        return {
        }
    },
    render() {
        return(
            <div>
                <div className="user-bac user-img"></div>
            </div>
        ) 
    }
});

export default User;