import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  const pageSize = 15;
  const [progress, setProgress] = useState(0)
    return (
      <div>
        <Router>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        progress={progress}
      />

       <Routes>

        <Route exact path="/"  element={<News setProgress={setProgress}key="general" pageSize={pageSize} county="in" category="general"/>}></Route>
        <Route exact path="/business" element={<News setProgress={setProgress} key="business"  pageSize={pageSize} county="in" category="business"/>}></Route>
        <Route exact path="/entertainment" element={<News setProgress={setProgress}  key="entertainment" pageSize={pageSize} county="in" category="entertainment"/>}></Route>
        <Route exact path="/health"  element={<News setProgress={setProgress}key="health"  pageSize={pageSize} county="in" category="health"/>}></Route>
        <Route exact path="/science"   element={<News setProgress={setProgress}key="science" pageSize={pageSize} county="in" category="science"/>}></Route>
        <Route exact path="/sports"  element={<News setProgress={setProgress}key="sports"  pageSize={pageSize} county="in" category="sports"/>}></Route>
        <Route exact path="/technology"  element={<News setProgress={setProgress} key="technology" pageSize={pageSize} county="in" category="technology"/>}></Route>
        
      </Routes>
      
       </Router>
      </div>


    )
}

export default App;
