import React from 'react';

import axios from 'axios';
import Component from './Component';

class PostViewContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await axios.get(`/posts/${id}/`);
        this.setState({
            post: response.data,
        });
    }

    render() {
        return <Component post={this.state.post} />;
    }
}

export default PostViewContainer;
