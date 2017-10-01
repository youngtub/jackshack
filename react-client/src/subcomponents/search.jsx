import React from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      sort: '',
      category: ''
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value
    }, () => this.props.searchcb(this.state.search));
  };

  handleSortChange(e) {
    this.setState({
      sort: e.target.value
    }, () => this.props.sortcb(this.state.sort))
  };

  handleCategoryChange(e) {
    this.setState({
      category: e.target.value
    }, () => this.props.categorycb(this.state.category))
  }

render() {
    return (
      <div className="searchContainer">
        <input type="text" onChange={this.handleSearchChange} value={this.state.search} placeholder='Search...' style={searchStyle}/>

          <a style={sortBy}> Category: </a>
          <select value={this.state.category} onChange={this.handleCategoryChange}>
              <option> All </option>
              <option> Cartoon </option>
              <option> Album Cover </option>
              <option> Animal </option>
              <option> Geometric </option>
              <option> Nature </option>
          </select>

        <a style={sortBy}> Sort by: </a>
        <select value={this.state.sort} onChange={this.handleSortChange}>
            <option> Recent </option>
            <option> Classics </option>
            <option> Popular </option>
            <option> Underground </option>
            <option> Top Rated </option>
        </select>

      </div>
    )
  }

};

const searchStyle = {
  marginLeft: "5%",
  height: '7px',
  width: '7%',
  padding: "10px",
  border: "solid 1px #fff",
  boxShadow: "inset 1px 1px 2px 0 #707070",
  transition: "box-shadow 0.3s"
}

const sortBy = {
  marginLeft: '1%'
}


export default Search;
