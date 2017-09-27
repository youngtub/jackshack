import React from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      sort: ''
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
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

render() {
    return (
      <div className="searchContainer">
        <input type="text" onChange={this.handleSearchChange} value={this.state.search} placeholder='Search...' style={searchStyle}/>
        <select value={this.state.sort} onChange={this.handleSortChange}>
            <option> Recent </option>
            <option> Classics </option>
            <option> Popular </option>
            <option> Underground </option>
          </select>
      </div>
    )
  }

};

const searchStyle = {
  marginLeft: "5%",
  height: '1%',
  width: '7%',
  padding: "10px",
  border: "solid 1px #fff",
  boxShadow: "inset 1px 1px 2px 0 #707070",
  transition: "box-shadow 0.3s"
}

export default Search;
