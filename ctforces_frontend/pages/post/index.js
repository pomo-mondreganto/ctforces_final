import React, { Component } from 'react';
import sidebarLayout from '../../layouts/sidebarLayout';
import withLayout from '../../wrappers/withLayout';
import FormComponent from '../../components/Form';
import { required } from '../../lib/validators';
import { post, get } from '../../lib/api_requests';
import { api_url } from '../../config';
import redirect from '../../lib/redirect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faMarker } from '@fortawesome/free-solid-svg-icons';
import { Link } from '../../server/routes';
import TextInputComponent from '../../components/TextInput';

import { Card } from 'reactstrap';
import SimpleMDEComponent from '../../components/SimpleMDEInput';

class ViewPost extends Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps(ctx) {
        let data = await get(`posts/${ctx.query.id}`, {
            ctx: ctx
        });
        data = await data.json();
        return {
            id: data.id,
            title: data.title,
            body: data.body,
            author_username: data.author_username,
            can_edit_post: data.can_edit_post
        };
    }

    render() {
        return (
            <Card className="p-2">
                <div style={{ fontSize: '2rem' }} className="py-2">
                    {this.props.title + ' by ' + this.props.author_username}
                </div>
                {this.props.can_edit_post && (
                    <div className="py-2">
                        <FontAwesomeIcon icon={faMarker} size="lg" />{' '}
                        <Link route={`/post/${this.props.id}/edit`}>
                            <a>Edit post</a>
                        </Link>
                    </div>
                )}
                <hr />
                <div style={{ fontSize: '2rem' }} className="py-2">
                    {this.props.title}
                </div>
                <div style={{ fontSize: '2rem' }} className="py-2">
                    {this.props.body}
                </div>
            </Card>
        );
    }
}

export default withLayout(ViewPost, sidebarLayout);
