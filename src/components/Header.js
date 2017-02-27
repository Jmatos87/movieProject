import React from 'react';
 

class Header extends React.Component {
	constructor() {
    super();
    this.state = {
      title:''
    };
  }

	render(){
		return(
			<div id="navBar">
				<h1>Search Flix</h1>
			</div>
		)
	}
}
export default Header;