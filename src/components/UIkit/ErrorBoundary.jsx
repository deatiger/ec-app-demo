import React, {Component} from 'react';
import {functions} from "../../firebase/index";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, errorInfo) {
        const reportError = functions.httpsCallable('reportRenderError');
        this.setState({hasError: true})
        reportError({ error: error, errorInfo: errorInfo });
    }

    render() {
        if (this.state.hasError && process.env.NODE_ENV === 'production') {
            window.location.reload();
            return <></>
        } else {
            return this.props.children
        }
    }
}

export default ErrorBoundary;