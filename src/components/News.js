import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    pageSize : 8,
    country : "in",
    category : "general"
  }

  static propTypes = {
    pageSize : PropTypes.number,
    country : PropTypes.string,
    category : PropTypes.string,
  }

  capitalizeFirstLetter = (string) => { return string.charAt(0).toUpperCase() + string.slice(1)}

  //this is the CONSTRUCTOR of the class
  constructor(props) {
    super(props);
    console.log("im a constructor from news");
    this.state = {
      article: [],
      loading: false,
      page : 1,
      totalResults : 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} | NewsMonkey`;
  }
  
  
//FUNCTION UPDATING news
  async updateNews(){
    this.setState({
      page : this.state.page+1
    })
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ed901d829e6046939ab75a49433a28a7&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({
      loading : true
    })
    let data =  await fetch(URL);
    let parsedData =await data.json();
    console.log(parsedData);
    
    this.setState({
      article : parsedData.articles,
      totalResults: parsedData.totalResults,
      loading : false
    })
  }

  
  //this is COMPONENTDIDMOUNT function for API fetch
  async componentDidMount(){
    this.updateNews()
    console.log("componentDidMount");
  }

  //fatchMore
    fetchMoreData= async() => {
      this.setState({
        page : this.state.page+1
      } )
      const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ed901d829e6046939ab75a49433a28a7&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({
        loading : true
      })
      let data =  await fetch(URL);
      let parsedData =await data.json();
      console.log(parsedData);
      
      this.setState({
        article : this.state.article.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading : false
      })
  }

  //this is RETURN functiion
  render() {
    return (

      <>
      {console.log("render")}
        <h1 className="text-center"> NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          { this.state.article.map((elements) => {
            return ( 
              <div className="col md-4" key={elements.url}>
                <NewsItem
                  title={elements.title ? elements.title.slice(0, 45): ""}
                  description={elements.description ?elements.description.slice(0, 88) : ""}
                  imgURL={!elements.urlToImage ? "https://th.bing.com/th/id/OIP.Ec7_gRH4MbBc9kvGUKJXygHaFY?rs=1&pid=ImgDetMain" : elements.urlToImage}
                  newsURL={elements.url}
                  author={elements.author}
                  date={elements.publishedAt}
                  source={elements.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
      
    );
  }
}

export default News;
