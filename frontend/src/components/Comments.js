import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { ID } from '../utils/helper'
import _ from 'lodash'

import { fetchComments, createComment, removeComment } from '../actions/comments'
import Comment from './Comment'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography/Typography'

const styles = {
  comments: {
    backgroundColor: '#f2f2f2',
    margin: '0 auto',
    padding: '10px',
    width: '100%',
    textAlign: 'center',
  },
  postForm: {
    width: '50%',
    margin: '0 auto',
  },
}

class Comments extends Component {
  static propTypes = {
    classes: PropTypes.object,
  }

  handleSubmit = e => {
    const { addComment, postId, } = this.props
    e.preventDefault()
    const comment = serializeForm(e.target, { hash: true })
    comment.timestamp = Date.now()
    comment.id = ID()
    comment.parentId = postId
    addComment(comment)
  }



  componentWillMount() {
    const { getComments, postId, } = this.props
    getComments(postId)
  }

  render() {
    const { classes, comments, } = this.props
    return(
      <div className={classes.comments}>
        <Typography type='title'>Comments</Typography>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <form onSubmit={this.handleSubmit} className={classes.postForm} noValidate autoComplete="off">
          <TextField
            id="body"
            name='body'
            label="Comment"
            margin="normal"
            color='#C62828'
            multiline
            rows='3'
            fullWidth
          />
          <TextField
            id="author"
            name='author'
            label="Author"
            margin="normal"
            color='#C62828'
            fullWidth
          />
          <Button type='submit' raised color='primary' fullWidth>Add comment</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ comments, }) {
  return {
    comments: _.values(_.orderBy(comments.allComments, 'timestamp', 'desc')),
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getComments: (postId) => dispatch(fetchComments(postId)),
    addComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (id) => dispatch(removeComment(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Comments))