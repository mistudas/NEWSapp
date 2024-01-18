import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {

  const capitalizeFirstLetter = (string) => { return string.charAt(0).toUpperCase() + string.slice(1)}
  
  const [article, setArticle] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
/*   document.title = `${capitalizeFirstLetter(props.category)} | NewsMonkey`; */
  
//FUNCTION UPDATING news

  const updateNews = async() =>{
    setPage(page+1)
    props.setProgress(10)
    const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ed901d829e6046939ab75a49433a28a7&page=${page}&pageSize=${props.pageSize}`
    props.setProgress(30)
    setLoading(true)
    let data =  await fetch(URL);
    props.setProgress(50)
    let parsedData =await data.json();
    props.setProgress(70)
    console.log(parsedData);
    props.setProgress(100)
    setArticle(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }

  
  //this is COMPONENTDIDMOUNT function for API fetch

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} | NewsMonkey`;
    updateNews()
    console.log("componentDidMount");
  }, [])

  //fatchMore
    const fetchMoreData= async() => {
      setPage(page+1)

      const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ed901d829e6046939ab75a49433a28a7&page=${page}&pageSize=${props.pageSize}`

      setLoading(true)
      let data =  await fetch(URL);
      let parsedData =await data.json();
      console.log(parsedData);
  
    setArticle(article.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }

  //this is RETURN functiion
    return (

      <>
      {console.log("render")}
        <h1 className="text-center" style={{marginTop: '65px'}}> NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          { article.map((elements) => {
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

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;
