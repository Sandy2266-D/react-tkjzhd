import React from 'react';
import axios from 'axios';
import './style.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount()
  {
    this.getPosts();
  }
  //Read
  getPosts = async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    this.setState({posts:data})
  };
  render() {
    return (
      <div>
        <h4>Dasboard</h4>
        <table>
          <thead>
            <th>
              <td>Id</td>
              <td>Title</td>
              <td>Body</td>
            </th>
          </thead>
          <tbody>
            {this.state.posts.map(post => {
              return (
                <tr>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
