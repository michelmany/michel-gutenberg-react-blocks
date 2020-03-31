const { Component } = wp.element;
import { Button } from "react-bootstrap";
import ViewTemplate from "./template/viewtemplate";
import "url-search-params-polyfill";

const ViewData = data => {
  const datas = data.data;

  const featured = datas.featuredPost;

  const renderPages = () => {
    return datas.pages.map((page, key) => {
      const addTemplateClass = "srPages";
      const nameType = "Website Pages";
      return (
        <ViewTemplate
          key={key}
          page={page}
          classTemplate={addTemplateClass}
          nameType={nameType}
          featured={featured}
        />
      );
    });
  };

  const renderStories = () => {
    return datas.stories.map((page, key) => {
      const addTemplateClass = "srStories";
      const nameType = "News & Insights";
      return (
        <ViewTemplate
          key={key}
          page={page}
          classTemplate={addTemplateClass}
          nameType={nameType}
          featured={featured}
        />
      );
    });
  };

  const renderPress = () => {
    return datas.press.map((page, key) => {
      const addTemplateClass = "srPress";
      const nameType = "Press Release";
      return (
        <ViewTemplate
          key={key}
          page={page}
          classTemplate={addTemplateClass}
          nameType={nameType}
          featured={featured}
        />
      );
    });
  };

  const renderProducts = () => {
    return datas.products.map((page, key) => {
      const addTemplateClass = "srProducts";
      const nameType = "Product";
      return (
        <ViewTemplate
          key={key}
          page={page}
          classTemplate={addTemplateClass}
          nameType={nameType}
          featured={featured}
        />
      );
    });
  };

  return (
    <>
      {renderPages()}
      {renderStories()}
      {renderPress()}
      {renderProducts()}
    </>
  );
};

class ViewSearchContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      pages: [],
      stories: [],
      press: [],
      products: [],
      countAllPosts: 0,
      showposts: 4,
      renderResultsNumber: false,
      activedTab: "all",
      loadingPosts: false,
      negativeFetch: 0,
      pZeroPosts: "",
      featuredPost: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMorePosts = this.showMorePosts.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const searchedKey = e.target.search.value;
    window.location.replace(`./search-results/?search=${searchedKey}`);

    // remove tabs when search
    const getPostsWithActive = document.getElementById("active-filter-masonry");
    getPostsWithActive.removeAttribute("id");

    const getAllClassTabs = [
      ...document.querySelectorAll(".allClassFilterMasonry")
    ];
    getAllClassTabs.map(item => {
      item.setAttribute("id", "active-filter-masonry");
    });

    // remove search display class when search
    const selectAllItems = [...document.querySelectorAll(".item")];
    selectAllItems.map(item => {
      item.classList.remove("not-display-items-search");
      item.classList.remove("display-items-search");
    });
  }

  showMorePosts(e) {
    this.setState({ loadingPosts: true });

    if (this.state.activedTab == "all") {
      const currentCount = this.state.showposts;

      if (currentCount <= 9) {
        this.setState({ showposts: currentCount + 1 });
        setTimeout(() => {
          this.apiCall(this.state);
        }, 500);
      } else {
        const buttonLoadMore = [
          ...document.querySelectorAll(
            ".wp-block-ldc-search-and-results__button-filter-read"
          )
        ];
        buttonLoadMore.disabled = true;
      }
    } else if (this.state.activedTab == "pages") {
      const currentCount = this.state.showposts;

      if (currentCount <= 9) {
        this.setState({ showposts: currentCount + 1 });
        setTimeout(() => {
          let postPages = "";

          if (this.state.keyword) {
            postPages = `${siteUrl}/wp-json/wp/v2/pages?per_page=${this.state.showposts}&search=${this.state.keyword}&orderby=title&order=asc`;
          } else {
            postPages = `${siteUrl}/wp-json/wp/v2/pages?per_page=${this.state.showposts}&orderby=title&order=asc`;
          }
          fetch(postPages)
            .then(data => data.json())
            .then(data => {
              this.setState({
                pages: data
              });
            });

          this.setState({ loadingPosts: false });
        }, 500);
      } else {
        const buttonLoadMore = [
          ...document.querySelectorAll(
            ".wp-block-ldc-search-and-results__button-filter-read"
          )
        ];
        buttonLoadMore.disabled = true;
      }
    } else if (this.state.activedTab == "stories") {
      const currentCount = this.state.showposts;
      if (currentCount <= 9) {
        this.setState({ showposts: currentCount + 1 });
        setTimeout(() => {
          let postStories = "";

          if (this.state.keyword) {
            postStories = `${siteUrl}/wp-json/wp/v2/stories-insight?per_page=${this.state.showposts}&search=${this.state.keyword}&orderby=title&order=asc`;
          } else {
            postStories = `${siteUrl}/wp-json/wp/v2/stories-insight?per_page=${this.state.showposts}&orderby=title&order=asc`;
          }
          fetch(postStories)
            .then(data => data.json())
            .then(data => {
              this.setState({
                stories: data
              });
            });
          this.setState({ loadingPosts: false });
        }, 500);
      } else {
        const buttonLoadMore = [
          ...document.querySelectorAll(
            ".wp-block-ldc-search-and-results__button-filter-read"
          )
        ];
        buttonLoadMore.disabled = true;
      }
    } else if (this.state.activedTab == "press") {
      const currentCount = this.state.showposts;
      if (currentCount <= 9) {
        this.setState({ showposts: currentCount + 1 });
        setTimeout(() => {
          let postPress = "";

          if (this.state.keyword) {
            postPress = `${siteUrl}/wp-json/wp/v2/press-release?per_page=${this.state.showposts}&search=${this.state.keyword}&orderby=title&order=asc`;
          } else {
            postPress = `${siteUrl}/wp-json/wp/v2/press-release?per_page=${this.state.showposts}&orderby=title&order=asc`;
          }
          fetch(postPress)
            .then(data => data.json())
            .then(data => {
              this.setState({
                press: data
              });
            });
          this.setState({ loadingPosts: false });
        }, 500);
      } else {
        const buttonLoadMore = [
          ...document.querySelectorAll(".read-more-button-filter")
        ];
        buttonLoadMore.disabled = true;
      }
    } else if (this.state.activedTab == "products") {
      const currentCount = this.state.showposts;
      if (currentCount <= 9) {
        this.setState({ showposts: currentCount + 1 });
        setTimeout(() => {
          let postProducts = "";

          if (this.state.keyword) {
            postProducts = `${siteUrl}/wp-json/wp/v2/product?per_page=${this.state.showposts}&search=${this.state.keyword}&orderby=title&order=asc`;
          } else {
            postProducts = `${siteUrl}/wp-json/wp/v2/product?per_page=${this.state.showposts}&orderby=title&order=asc`;
          }
          fetch(postProducts)
            .then(data => data.json())
            .then(data => {
              this.setState({
                products: data
              });
            });
          this.setState({ loadingPosts: false });
        }, 500);
      } else {
        const buttonLoadMore = [
          ...document.querySelectorAll(".read-more-button-filter")
        ];
        buttonLoadMore.disabled = true;
      }
    }
  }

  apiCall(dati) {
    let postPages = "";
    let postStories = "";
    let postPress = "";
    let postProducts = "";

    const data = dati;

    if (data.keyword) {
      postPages = `${siteUrl}/wp-json/wp/v2/pages?per_page=${data.showposts}&search=${data.keyword}&orderby=title&order=asc`;
      postStories = `${siteUrl}/wp-json/wp/v2/stories-insight?per_page=${data.showposts}&search=${data.keyword}&orderby=title&order=asc`;
      postPress = `${siteUrl}/wp-json/wp/v2/press-release?per_page=${data.showposts}&search=${data.keyword}&orderby=title&order=asc`;
      postProducts = `${siteUrl}/wp-json/wp/v2/product?per_page=${data.showposts}&search=${data.keyword}&orderby=title&order=asc`;
    } else {
      postPages = `${siteUrl}/wp-json/wp/v2/pages?per_page=${data.showposts}&orderby=title&order=asc`;
      postStories = `${siteUrl}/wp-json/wp/v2/stories-insight?per_page=${data.showposts}&orderby=title&order=asc`;
      postPress = `${siteUrl}/wp-json/wp/v2/press-release?per_page=${data.showposts}&orderby=title&order=asc`;
      postProducts = `${siteUrl}/wp-json/wp/v2/product?per_page=${data.showposts}&orderby=title&order=asc`;
    }

    fetch(postPages)
      .then(data => data.json())
      .then(data => {
        if (data.length == 0) {
          this.setState({ negativeFetch: this.state.negativeFetch + 1 });
        } else {
          this.setState({
            pages: data,
            countAllPosts: this.state.countAllPosts + data.length
          });
        }
      });

    fetch(postStories)
      .then(data => data.json())
      .then(data => {
        if (data.length == 0) {
          this.setState({ negativeFetch: this.state.negativeFetch + 1 });
        } else {
          this.setState({
            stories: data,
            countAllPosts: this.state.countAllPosts + data.length
          });
        }
      });

    fetch(postPress)
      .then(data => data.json())
      .then(data => {
        if (data.length == 0) {
          this.setState({ negativeFetch: this.state.negativeFetch + 1 });
        } else {
          this.setState({
            press: data,
            countAllPosts: this.state.countAllPosts + data.length
          });
        }
      });

    fetch(postProducts)
      .then(data => data.json())
      .then(data => {
        if (data.length == 0) {
          this.setState({ negativeFetch: this.state.negativeFetch + 1 });
        } else {
          this.setState({
            products: data,
            countAllPosts: this.state.countAllPosts + data.length
          });
        }
      });

    this.setState({ loadingPosts: false });
  }

  countPosts() {
    const numberPosts =
      this.state.pages.length +
      this.state.stories.length +
      this.state.press.length +
      this.state.products.length;
    return numberPosts;
  }

  fetchDataSettings() {
    fetch(`${siteUrl}/wp-json/ldc/v1/acf/theme-options`)
      .then(data => data.json())
      .then(data => {
        if (data.zero_results_message.length != 0) {
          this.setState({ pZeroPosts: data.zero_results_message });
        }
        if (data.default_image_picker.length != 0) {
          this.setState({ featuredPost: data.default_image_picker });
        }
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const SearchKey = urlParams.get("search");
    this.fetchDataSettings();

    if (SearchKey) {
      this.setState({ keyword: SearchKey });
      setTimeout(() => {
        this.apiCall(this.state);
        this.setState({ renderResultsNumber: true });
      }, 1000);
    } else {
      this.apiCall(this.state);
    }
  }

  renderThisBlock = () => {
    if (this.state.negativeFetch == 3) {
      return (
        <div className="wp-block-ldc-search-and-results__ns">
          {this.state.pZeroPosts}
        </div>
      );
    } else if (
      this.state.pages.length === 0 &&
      this.state.stories.length === 0 &&
      this.state.press.length === 0 &&
      this.state.products.length === 0
    ) {
      return (
        <div className="wp-block-ldc-search-and-results__sk-main">
          <div
            class={`wp-block-ldc-search-and-results__sk-chase wp-block-ldc-search-and-results__sk-main-load`}
          >
            <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
            <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
            <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
            <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
            <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
            <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
          </div>
        </div>
      );
    } else {
      return <ViewData data={this.state} />;
    }
  };

  render() {
    const removeActiveTab = () => {
      const getPostsWithActive = document.querySelector(
        "#active-filter-masonry"
      );
      getPostsWithActive.removeAttribute("id");
    };

    const removeItemsSearch = () => {
      const selectAllItems = [
        ...document.querySelectorAll(".wp-block-ldc-search-and-results__item")
      ];
      selectAllItems.map(item => {
        item.classList.add("not-display-items-search");
        item.classList.remove("display-items-search");
      });
    };

    const addItemsSearch = className => {
      const selectAllPages = [...document.querySelectorAll(`.${className}`)];
      selectAllPages.map(item => {
        item.classList.remove("not-display-items-search");
        item.classList.add("display-items-search");
      });
    };

    const resetItemsSearch = () => {
      const selectAllPages = [
        ...document.querySelectorAll(".wp-block-ldc-search-and-results__item")
      ];
      selectAllPages.map(item => {
        item.classList.remove("display-items-search");
        item.classList.remove("not-display-items-search");
      });
    };

    const handleAll = e => {
      removeActiveTab();
      e.target.setAttribute("id", "active-filter-masonry");
      resetItemsSearch();
      this.setState({ activedTab: "all" });
    };

    const handlePages = e => {
      removeItemsSearch();
      removeActiveTab();
      e.target.setAttribute("id", "active-filter-masonry");
      addItemsSearch("srPages");
      this.setState({ activedTab: "pages" });
    };

    const handleStories = e => {
      removeItemsSearch();
      removeActiveTab();
      e.target.setAttribute("id", "active-filter-masonry");
      addItemsSearch("srStories");
      this.setState({ activedTab: "stories" });
    };

    const handlePress = e => {
      removeItemsSearch();
      removeActiveTab();
      e.target.setAttribute("id", "active-filter-masonry");
      addItemsSearch("srPress");
      this.setState({ activedTab: "press" });
    };

    const handleProducts = e => {
      removeItemsSearch();
      removeActiveTab();
      e.target.setAttribute("id", "active-filter-masonry");
      addItemsSearch("srProducts");
      this.setState({ activedTab: "products" });
    };

    return (
      <>
        <div className="wp-block-ldc-search-and-results__search-bar container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <span className="wp-block-ldc-search-and-results__placeholder">
                  Keywords
                </span>
                <div className="wp-block-ldc-search-and-results__bar-search">
                  <form
                    onSubmit={this.handleSubmit}
                    className="wp-block-ldc-search-and-results__search-form"
                  >
                    <input
                      className="wp-block-ldc-search-and-results__search-input"
                      type="text"
                      name="search"
                      value={this.state.keyword}
                      onChange={e => this.setState({ keyword: e.target.value })}
                    />
                    <button
                      className="wp-block-ldc-search-and-results__search-submit"
                      type="submit"
                    >
                      <svg
                        width="9"
                        height="17"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 7.914c0 .181-.065.362-.195.51l-7.37 8.3a.837.837 0 01-1.15.088.765.765 0 01-.09-1.106l6.882-7.751-6.84-6.618A.763.763 0 01.241.228a.837.837 0 011.152.003l7.37 7.13A.767.767 0 019 7.914z"
                          fill="#FFF"
                          fill-rule="nonzero"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              {this.state.renderResultsNumber ? (
                <div className="col-lg-4 col-md-4 wp-block-ldc-search-and-results__view-search-bar-count">
                  <div className="wp-block-ldc-search-and-results__view-search-bar-count-block">
                    {this.state.countAllPosts > 0 ? (
                      <>
                        {" "}
                        <span className="wp-block-ldc-search-and-results__view-search-bar-count-number-posts">
                          {this.countPosts()}
                        </span>{" "}
                        <span className="wp-block-ldc-search-and-results__view-search-bar-count-text-posts">
                          Search results
                        </span>{" "}
                      </>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="wp-block-ldc-search-and-results__search-content container-fluid">
          <div className="container">
            <div className="filter-masonry wp-block-ldc-search-and-results__filter">
              <Button variant="link" onClick={handleAll}>
                <span
                  id="active-filter-masonry"
                  className={"filter-masonry__inner all-class-filter-masonry"}
                >
                  All
                </span>
              </Button>
              <Button
                variant="link"
                onClick={handlePages}
                className={
                  this.state.pages.length === 0
                    ? "notshow-button-filter"
                    : "show-button-filter"
                }
              >
                <span className={"filter-masonry__inner"}>Website Pages</span>
              </Button>
              <Button
                variant="link"
                onClick={handleStories}
                className={
                  this.state.stories.length === 0
                    ? "notshow-button-filter"
                    : "show-button-filter"
                }
              >
                <span className={"filter-masonry__inner"}>
                  News &amp; Insights
                </span>
              </Button>
              <Button
                variant="link"
                onClick={handlePress}
                className={
                  this.state.press.length === 0
                    ? "notshow-button-filter"
                    : "show-button-filter"
                }
              >
                <span className={"filter-masonry__inner"}>Press Releases</span>
              </Button>
              <Button
                variant="link"
                onClick={handleProducts}
                className={
                  this.state.products.length === 0
                    ? "notshow-button-filter"
                    : "show-button-filter"
                }
              >
                <span className={"filter-masonry__inner"}>Products</span>
              </Button>
            </div>

            <div className="wp-block-ldc-search-and-results__posts-masonry">
              {this.renderThisBlock()}
            </div>

            {this.state.negativeFetch != 3 ? (
              <div className="row wp-block-ldc-search-and-results__button-filter">
                <Button
                  variant="link"
                  onClick={this.showMorePosts}
                  className="btn btn-primary ldc-btn-green"
                >
                  <span>Load more</span>
                </Button>

                <div
                  class={`wp-block-ldc-search-and-results__sk-chase ${
                    this.state.loadingPosts ? "actived" : ""
                  } `}
                >
                  <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
                  <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
                  <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
                  <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
                  <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
                  <div class="wp-block-ldc-search-and-results__sk-chase-dot"></div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default ViewSearchContent;
