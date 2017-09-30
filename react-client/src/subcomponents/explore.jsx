import React from 'react';
import $ from 'jquery';

const getIdfromUrl = (url) => {
  //if logic for google drive link or not
  var id = url.slice(33);
  return `https://drive.google.com/uc?id=${id}`;
}

const Explore = (props) => {

  const setPreviewImage = (e) => {
    var attr = $(e.target).attr('src')
    props.preview(attr);
  }

  const setSortFunction = (props) => {
    let output;
    if (props.sort === 'Recent') {
      output = (a,b) => new Date(b.created_at) - new Date(a.created_at);
    } else if (props.sort === 'Classics') {
      output = (a,b) => new Date(a.created_at) - new Date(b.created_at);
    } else if (props.sort === 'Popular') {
      output = (a,b) => (b.view_count) - (a.view_count);
    } else if (props.sort === 'Underground') {
      output = (a,b) => (a.view_count) - (b.view_count);
    } else if (props.sort === 'Top Rated') {
      output = (a,b) => (b.avg_rating) - (a.avg_rating);
    }
    return output;
  }

  const setSearchFilter = (props) => {
    if (props.search === '') {
      return (item) => {return true}
    } else {
      return (item) => {return item.title.toLowerCase().includes(props.search.toLowerCase()) || item.tags.join().toLowerCase().includes(props.search.toLowerCase())}
    }
  }

  return (
    <div>
      <div className="exploreContainer" style={exploreContainer}>
        <h3 style={align} className="exploreHeader"> Explore Designs</h3>
        {props.items.length ? props.items.filter(setSearchFilter(props)).sort(setSortFunction(props)).map((entry) => (
          <img src={getIdfromUrl(entry.link)} onClick={setPreviewImage} height={140} width={140} style={exploreStyle} key={entry.link.slice(33)}/>
        )) : ''}
      </div>
    </div>
  )
}

const exploreStyle = {
  padding: "20px"
}

const align = {
  textAlign: "center"
}

const exploreContainer = {
  border: "solid black 1px",
  borderRadius: "70px",
  margin: "auto",
  marginLeft: "2%",
  width: "36%",
  padding: "10px",
  display: "inline block",
  float: "left",
  height: "550px",
  overflow: "scroll"
}


export default Explore;
