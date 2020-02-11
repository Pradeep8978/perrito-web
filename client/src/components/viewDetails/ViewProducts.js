import React, {Component} from 'react'

import { connect } from 'react-redux';


class ViewProducts extends Component {



  render(){
      console.log('view products',this.props )
      const {productDetails} = this.props;
      return(

        <div>
            <h2> this is products view page</h2>
        </div>
      )
  }

}
const mapStateToProps = (state) => {
    return {
        productDetails : state.productDetails
    }
};


export default connect(mapStateToProps)(ViewProducts);