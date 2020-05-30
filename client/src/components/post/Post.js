import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import PostItem from '../posts/PostItem'
import { getPost } from '../../actions/post'
import CommentForm from '../post/CommentForm'   
import CommentItem from './CommentItem'

const Post = ({getPost, post:{post, loading}, match}) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id])
    return loading || post === null ? (<Spinner/>) : (
    <Fragment>
        <Link to="/posts" className="btn">
            Back to Post
        </Link>
        <PostItem  post={post} showActions={false}/>
        <CommentForm postId={post._id}/>
        {
            post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))
        }
    </Fragment>)
}


Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)
