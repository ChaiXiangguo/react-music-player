import React from 'react';
require('./style.less');
let PubSub = require('pubsub-js');
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import message from 'antd/lib/message';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'antd/lib/form/style';
import 'antd/lib/icon/style';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/message/style';
import axios from 'axios'
import { hashHistory } from 'react-router'
const FormItem = Form.Item;

let NormalLoginForm = React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(`/api/user/login`, values).then(function (res) {
                    if (res.data.token) {
                        PubSub.publish('LOGIN_SUCCESS', res.data);
                        document.cookie = `token=Bearer ${res.data.token}`
                        hashHistory.push('/')
                        message.info('登录成功！');
                    } else {
                        if (res.data.errCode === '10000') {
                            message.error('用户名不存在！');
                        } else {
                            message.error('密码错误！');
                        }   
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        });
    },
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="signin-box">
                    <Row type="flex" justify="space-around" align="middle">
                        <Col>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('nickname', {
                                        rules: [{ required: true, message: '请输入您的用户名!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                        )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入您的密码!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                        )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>记住密码</Checkbox>
                                        )}
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                </Button>
                                    <br />
                                    <a className="login-form-forgot" href="">忘记密码</a>
                                    或者 <a href="">马上注册!</a>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </div>
                <div className="user-bac signin-img"></div>
            </div>
        );
    }
})

const signIn = Form.create()(NormalLoginForm);

export default signIn;