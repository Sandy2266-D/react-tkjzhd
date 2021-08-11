import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      userId: '',
      title: '',
      body: '',
      posts: []
    };
  }
  componentDidMount() {
    this.getPosts();
  }

  //Create
  createPosts = async () => {
    const { data } = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        userId: this.state.userId,
        title: this.state.title,
        body: this.state.body
      }
    );
    const posts = [...this.state.posts];
    posts.push(data);
    this.setState({ posts, userId: '', title: '', body: '' });
  };

  //Update
  updatePost = async () => {
    const { data } = await axios.put(
      `${'https://jsonplaceholder.typicode.com/posts'}/${this.state.id}`, //apiurl/id template
      {
        userId: this.state.userId,
        title: this.state.title,
        body: this.state.body
      }
    );
    const posts = [...this.state.posts];
    const postIndex = posts.findIndex(post => post.id === this.state.id); //id findout
    posts[postIndex] = data;
    this.setState({ posts, userId: '', title: '', body: '', id: '' });
  };

  //Delete
  deletePost = async postId => {
    await axios.delete(
      `${'https://jsonplaceholder.typicode.com/posts'}/${postId}`
    );
    let posts = [...this.state.posts];
    posts = posts.filter(post => post.id !== postId);
    this.setState({ posts });
  };

  getPosts = async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    this.setState({ posts: data });
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.id) {
      this.updatePost();
    } else {
      this.createPosts();
    }

    // this.setState({ userId: '', title: '', body: '', id: ' ' });
  };

  selectPost = post => {
    this.setState(post);
  };

  render() {
    return (
      <div>
        <h4>Blog Spot</h4>
        <form onSubmit={this.handleSubmit}>
          {this.state.id && (
            <>
              <div>
                <label>Post ID : </label>
                <input
                  name="userId"
                  type="text"
                  value={this.state.userId}
                  onChange={this.handleChange}
                  disabled
                />
              </div>
              <br />
              <br />
            </>
          )}
          <div>
            <label>User ID : </label>
            <input
              name="userId"
              type="text"
              value={this.state.userId}
              onChange={this.handleChange}
            />
            <br />
            <br />

            <label>Title : </label>
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <br />
            <br />
            <label>Body : </label>
            <input
              name="body"
              type="text"
              value={this.state.body}
              onChange={this.handleChange}
            />
            <br />
            <br />
          </div>
          <div>
            <button type="submit">
              {this.state.id ? 'Update' : 'Add'} Post
            </button>
            <br />
            <br />
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>title</th>
              <th>body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => {
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <button onClick={() => this.selectPost(post)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => this.deletePost(post.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
