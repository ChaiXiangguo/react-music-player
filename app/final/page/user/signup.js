import React from 'react';
require('./style.less');
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import Tooltip from 'antd/lib/tooltip';
import message from 'antd/lib/message';
import 'antd/lib/form/style';
import 'antd/lib/icon/style';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/select/style';
import 'antd/lib/tooltip/style';
import 'antd/lib/message/style';
import axios from 'axios'
import {hashHistory} from 'react-router'
const FormItem = Form.Item;

let NormalLoginForm = React.createClass( {
    getInitialState() {
        return {
         confirmDirty: false
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post(`/api/user/register`,values).then(function (res) {
                    hashHistory.push('/signin')
                    message.info('注册成功！');
                  }).catch(function (error) {
                    console.log(error);
                  });
            }
        });
    },
    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    },
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    },
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    },
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
            );

        return (
            <div>
                <div className="signin-box">
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    {...formItemLayout}
                                    label="E-mail"
                                >
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            type: 'email', message: '请输入合法的邮箱地址',
                                        }, {
                                            required: true, message: '请输入您的邮箱!',
                                        }],
                                    })(
                                        <Input placeholder="请输入邮箱地址"/>
                                        )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="密码"
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true, message: '请输入您的密码!',
                                        }, {
                                            validator: this.checkConfirm,
                                        }],
                                    })(
                                        <Input type="password" placeholder="请输入密码"/>
                                        )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="确认密码"
                                >
                                    {getFieldDecorator('confirm', {
                                        rules: [{
                                            required: true, message: '请确认密码!',
                                        }, {
                                            validator: this.checkPassword,
                                        }],
                                    })(
                                        <Input type="password" placeholder="请再次输入密码" onBlur={this.handleConfirmBlur} />
                                        )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label={(
                                        <span>
                                            昵称&nbsp;
                              <Tooltip title="What do you want others to call you?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    )}
                                >
                                    {getFieldDecorator('nickname', {
                                        rules: [{ required: true, message: '请输入您的昵称!', whitespace: true }],
                                    })(
                                        <Input placeholder="请输入您的昵称"/>
                                        )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="手机号码"
                                >
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: false, message: 'Please input your phone number!' }],
                                    })(
                                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="请输入您的手机号"/>
                                        )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">注册</Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </div>
                <div className="user-bac signup-img"></div>
            </div>
        );
    }
})

const signUp = Form.create()(NormalLoginForm);

export default signUp;