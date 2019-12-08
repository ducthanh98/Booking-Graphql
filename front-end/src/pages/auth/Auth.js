import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import Toastr from '../../common/Toast/Toast';
import './Auth.css';
export class AuthComponent extends Component {

    constructor() {
        super();
        this.email = React.createRef();
        this.password = React.createRef();
        this.state = {
            isLogin: true,
            showToastr: false,
            modalContent: 'Hi'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const email = this.email.current.value;
        const password = this.password.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        this.postRequest(email, password);

    }

    getBodyParam = (email, password) => {
        let body = {};
        if (this.state.isLogin) {
            body = {
                query: `
                    query {
                        login(email:"${email}",password:"${password}"){
                            userId,token,tokenExpiration
                        }
                    }
                `
            }


        } else {
            body = {
                query: `
                    mutation {
                        createUser (userInput : {email:"${email}",password:"${password}"}) {
                            _id,email
                        }
                    }
                `
            }
        }
        return body;
    }

    postRequest = (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'Application/json'
            }
        };
        const body = this.getBodyParam(email, password);
        axios.post('http://localhost:4200/graphql', JSON.stringify(body), config)
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Error. Please try again later !!!')
                }
                return res.data;
            })
            .then((data) => {
                if (!data.errors) {
                    console.log(data);
                } else {
                    this.handleNotifi(data.errors[0].message);
                }
            })
            .catch((error) => {
                this.handleNotifi(error.response.data.errors[0].message);
            })

    }

    handleNotifi(content) {
        this.updateState('modalContent', content);
        this.updateState('showToastr', !this.state.showToastr);
    }

    updateState = (key, value) => {
        let obj;
        if (typeof value === "string") {
            obj = `{"${key}": "${value}"}`;
        } else {
            obj = `{"${key}": ${value}}`;
        }

        obj = JSON.parse(obj);
        this.setState(obj);
    }
    render() {
        return (
            <>
                <Toastr style={{ position: 'absolute' }} show={this.state.showToastr} updateState={this.updateState} content={this.state.modalContent}></Toastr>
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email" >
                            <FormLabel >Email</FormLabel >
                            <FormControl
                                autoFocus
                                type="email"
                                ref={this.email}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" >
                            <FormLabel >Password</FormLabel >
                            <FormControl
                                type="password"
                                ref={this.password}
                            />
                        </FormGroup>
                        <Button block type="submit">
                            {!this.state.isLogin ? 'Register' : 'Login'}
                        </Button>
                        <Button block type="button" onClick={() => this.updateState('isLogin', !this.state.isLogin)}>
                            Switch to {this.state.isLogin ? 'Register' : 'Login'}
                        </Button>
                    </form>
                </div>
            </>
        );
    }
}