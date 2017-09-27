import React from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      search: e.target.value
    }, () => this.props.cb(this.state.search));
  }

render() {
    return (
      <div className="searchContainer">
        <input type="text" onChange={this.handleChange} value={this.state.search} placeholder='Search designs...'/>
      </div>
    )
  }

};

export default Search;
