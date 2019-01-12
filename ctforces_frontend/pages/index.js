import sidebarLayout from '../layouts/sidebarLayout';
import React, { Component } from 'react';
import withLayout from '../wrappers/withLayout';
import withGuard from '../wrappers/withGuard';
import { Link } from '../server/routes';
import { Col, Container, Row } from 'reactstrap';
import { get } from '../lib/api_requests';

class PostComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className="border rounded">
                <Col className="m-3">
                    <p className="h2">
                        <Link route={`/post/${this.props.id}`}>
                            <a>{this.props.title}</a>
                        </Link>
                    </p>
                    <p className="lead">
                        By{' '}
                        <Link route={`/user/${this.props.author_username}`}>
                            <a>{this.props.author_username},</a>
                        </Link>{' '}
                        {this.props.created_at}
                    </p>
                    <hr />
                    <p>{this.props.body}</p>
                </Col>
            </Row>
        );
    }
}

class Index extends Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps(ctx) {
        let data = await get('posts', {
            data: {
                page: 1,
                page_size: 20
            },
            ctx: ctx
        });
        data = await data.json();
        return {
            posts: data.results
        };
    }

    render() {
        return (
            <div>
                {this.props.posts.map((obj, i) => {
                    return <PostComponent key={i} {...obj} />;
                })}
            </div>
        );
    }
}

export default withGuard(withLayout(Index, sidebarLayout));
