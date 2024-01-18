import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize = 15;
  state = {
    progress : 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <div>
        <Router>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />

       <Routes>

        <Route exact path="/"  element={<News setProgress={this.setProgress}key="general" pageSize={this.pageSize} county="in" category="general"/>}></Route>
        <Route exact path="/business" element={<News setProgress={this.setProgress} key="business"  pageSize={this.pageSize} county="in" category="business"/>}></Route>
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={this.pageSize} county="in" category="entertainment"/>}></Route>
        <Route exact path="/health"  element={<News setProgress={this.setProgress}key="health"  pageSize={this.pageSize} county="in" category="health"/>}></Route>
        <Route exact path="/science"   element={<News setProgress={this.setProgress}key="science" pageSize={this.pageSize} county="in" category="science"/>}></Route>
        <Route exact path="/sports"  element={<News setProgress={this.setProgress}key="sports"  pageSize={this.pageSize} county="in" category="sports"/>}></Route>
        <Route exact path="/technology"  element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} county="in" category="technology"/>}></Route>
        
      </Routes>
      
       </Router>
      </div>


    )
  }
}
