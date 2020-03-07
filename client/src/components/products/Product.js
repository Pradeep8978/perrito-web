import React, { Component } from 'react';
// import { Chip } from 'reactstrap';
import ProductList from './ProductList';
import './Product.scss';

export default class Products extends Component {
    state = {
        deleting: false,
        filterText: "",
        filterType: "name",
        placeholder: 'Filter Here',
        filters: {}
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    resetFilters = () => {
        this.setState({ filters: {} });
        this.props.actions.fetchProducts();
    }

    onchangeFilterText = (e) => {
        this.setState({ filterText: e.target.value });
    }

    onChangeFilterType = e => {
        // const placeholder = filter_config.find(o => o.value === e.target.value).label;
        // this.setState({ filterType: e.target.value, placeholder });
    }

    onApplyFilter = () => {
        const { filterText, filterType, filters } = this.state;
        filters[filterType] = filterText;
        this.setState({ filters, filterText: '' });
        // this.props.actions.getProductList(this.props.tin, filters);
    }
    displayNotification = (title, type, message) => {
        this.props.notificationSystem.addNotification({
            title: title,
            message: message,
            level: type,
            position: 'tr',
            autoDismiss: 15
        });
    }

    deleteProduct = (id) => {
        this.setState({ deleting: true });
        this.props.deleteProduct(id)
        .then(res=> {
            this.props.notify(2, 'successfully deleted');
            this.props.fetchProducts();
            this.setState({ deleting: false });
        })
        .catch(err=> {
            this.props.notify(3, 'Unable to remove product... please try again')

        })
        // window.location.reload(false);
    }
  
    editProduct = details => { 
        debugger;
        console.log("details"+ "=>" +details)
        this.props.preserveProductDetails(details);
        this.props.history.push('/admin/product/update');
    }
    
    // updateProduct = details => {
    //     this.props.preserveProductDetails(details)
    // }
    
    viewProduct = details => {
        this.props.preserveProductDetails(details);
        this.props.history.push('/admin/product/view');
    }

    onRemoveChip = key => {
        const { filters } = this.state;
        delete filters[key];
        this.setState({ filters });
        this.props.actions.getProductList(this.props.tin, filters);
    }

    _renderChips = () => {
        const keys = Object.keys(this.state.filters);
        if (!keys.length) return null;
        return (
            <div className="chip_section p-2 mt-3">
                {
                    keys.map(key => {
                        const name = `${key.toUpperCase()} - ${this.state.filters[key]}`;
                        return (<div/>
                            // <Chip name={name} onRemove={() => this.onRemoveChip(key)} />
                        )
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <>
                <div className="filter_section">
                    <div className="row ml-2 pl-2">
                        <input className="col-md-4 mr-2 form-control" type="text" placeholder={this.state.placeholder} value={this.state.filterText} onChange={this.onchangeFilterText} />
                        <select className="col-md-3 mr-2 form-control" value={this.state.filterType} onChange={this.onChangeFilterType}>
                            {
                                // f ilter_config.map(item => <option key={item.key} value={item.value}>{item.label}</option>)
                            }
                        </select>
                        <button className="btn btn-primary ml-2" onClick={this.onApplyFilter}>Filter Products</button>
                        <button className="btn btn-outline-danger ml-2" onClick={this.resetFilters}>Reset All Filters</button>
                    </div>
                    {this._renderChips()}
                </div>

                <ProductList
                    onEditClick={this.editProduct}
                    onDeleteClick={this.deleteProduct}
                    onDetailsClick={this.viewProduct}
                    deleting={this.state.deleting}
                    {...this.props} />
            </>
        )
    }
}
