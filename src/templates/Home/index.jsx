import { Component } from "react";

import "./styles.css";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TexiInput";

export class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 6,
        searchValue: "",
        name: "Julio Schurt",
        counter: 0,
    };

    async componentDidMount() {
        await this.loadPosts();
    }

    handleChange = (e) => {
        const { value } = e.target;
        console.log(value);
        this.setState({ searchValue: value });
    };

    loadPosts = async () => {
        const { page, postsPerPage } = this.state;

        const postsAndPhotos = await loadPosts();
        this.setState({
            allPosts: postsAndPhotos,
            posts: postsAndPhotos.slice(page, postsPerPage),
        });
    };

    loadMorePosts = () => {
        const { page, postsPerPage, allPosts, posts } = this.state;
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);

        this.setState({ posts, page: nextPage });
    };

    render() {
        const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
        const noMorePosts = page + postsPerPage >= allPosts.length;
        const filteredPosts = searchValue
            ? allPosts.filter((post) =>
                  post.title.toLowerCase().includes(searchValue.toLowerCase())
              )
            : posts;

        return (
            <section className="container">
                <div className="search-container">
                    {searchValue && <h1>Search Value: {searchValue}</h1>}
                    <TextInput
                        searchValue={searchValue}
                        onChange={this.handleChange}
                    />
                </div>

                {filteredPosts.length > 0 ? (
                    <Posts posts={filteredPosts} />
                ) : (
                    <p>No posts found</p>
                )}

                <div className="button-container">
                    {!searchValue && (
                        <Button
                            text="Load more Posts"
                            onClick={this.loadMorePosts}
                            disabled={noMorePosts}
                        />
                    )}
                </div>
            </section>
        );
    } //render
} //class

/*
function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      Teste
    </>
  );
}
*/
