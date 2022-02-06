import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'genral'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0f4d5508e214e009c7edd1434fcdd9c&page=1&pageSize=12`;
        let data = await fetch(url);
        let parseddata = await data.json();
        console.log(parseddata);
        this.setState({articles: parseddata.articles,totalResults: parseddata.totalResults})
    }
     prevpage = async ()=>{
        console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0f4d5508e214e009c7edd1434fcdd9c&page=${this.state.page-1}&pageSize=12`;
        let data = await fetch(url);
        let parseddata = await data.json();
        console.log(parseddata);
        this.setState({
            page: this.state.page - 1,
            articles: parseddata.articles
        })
    }
     nxtpage = async ()=>{
        console.log("Next");
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/12)){
        }
        else{

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0f4d5508e214e009c7edd1434fcdd9c&page=${this.state.page+1}&pageSize=12`;
            let data = await fetch(url);
            let parseddata = await data.json();
            console.log(parseddata);
            this.setState({
                page: this.state.page + 1,
                articles: parseddata.articles
            })
        }
    }
    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">NewsMonkey - Top Headlines</h2>
            {/* /<Spinner/> */}
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem  title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date = {element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-center">
                    <button disabled = {this.state.page<=1} type="button" className="btn btn-secondary mx-2" onClick={this.prevpage}>Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/12)}  type="button" className="btn btn-secondary mx-2" onClick={this.nxtpage}>Next</button>
                </div>
            </div>
        );
    }
}
export default News;
