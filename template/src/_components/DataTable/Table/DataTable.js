import React, { Component, Suspense } from 'react';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { DataTableHeader, DataTableRow } from '../../DataTable';
import PropTypes from 'prop-types';
import {EmptyPane} from '_components';

const propTypes = {
    tableConfig: PropTypes.array,
    items: PropTypes.any,
    metaData: PropTypes.any,
    tableClassName: PropTypes.string,
    paginate: PropTypes.bool,
    goToPage: PropTypes.func,
};
const defaultProps = {
    tableConfig:[],
    items:'',
    metaData: '',
    paginate: true,
};
/**
 * Simple DataTable
 */
class DataTable extends Component {

	constructor(props){
		super(props)

		var maxPage: 1,
		metaData = null, currentPage = 0,
		hasPrevious =false,
		hasNext = false, totalElements = 0;

		if(this.props.metaData){
			metaData = JSON.parse(this.props.metaData)
			if(metaData){
				maxPage = metaData.totalPages
				currentPage= metaData.pageNumber
				hasPrevious= metaData.hasPreviousPage
				hasNext= metaData.hasNextPage
				totalElements = metaData.totalElements
			}
		}

		this.state ={
			currentPage: currentPage,
			maxPage: maxPage,
			metaData: metaData,
			hasPrevious: hasPrevious,
			hasNext: hasNext,
			totalElements: totalElements,

			metaData: metaData,
			items: this.props.items !== null ? JSON.parse(this.props.items) : [],
		}

		this.handlePagination = this.handlePagination.bind(this)
	}
	handlePagination(e, i){
		e.preventDefault();
		if(this.props.goToPage){
			this._doGoToPage(e.target.name)
		}
	}
	goNextPage(e){
		e.preventDefault();
		if(this.state.hasNext === true && this.props.goToPage){
			var pc = ++this.state.currentPage
			if(pc > this.state.maxPage){
				this._doGoToPage(0)
			}
			else {
				this._doGoToPage(pc)
			}

		}
	}
	goPreviousPage(e){
		e.preventDefault();
		if(this.state.hasPrevious === true && this.props.goToPage){
			var pc = --this.state.currentPage
			if(pc < 0){
				this._doGoToPage(0)
			}
			else {
				this._doGoToPage(pc)
			}

		}
	}
	_doGoToPage(i){
		if(this.props.goToPage){
			this.props.goToPage(i)
		}
	}
	populatePagination() {
		var index = 0;
		const pitem = [];
        var pagination;

        var displayTotalElements = this.props.displayTotalElements !== null
        	&& this.props.displayTotalElements === true

        const {metaData} = this.state
        if(this.props.paginate === true && metaData !== null) {
            let hasPreviousPage = !this.state.hasPrevious
            let hasNextPage = !this.state.hasNext;

            pitem.push(<PaginationItem disabled={hasPreviousPage} >
                <PaginationLink previous tag="button" onClick={e => this.goPreviousPage(e)}>Prev</PaginationLink>
            </PaginationItem>);

            for(var i = index; i < metaData.totalPages; i++) {
            	var pageIndex = JSON.parse(JSON.stringify(i));
            	//console.log('currentPage : ' +  this.state.currentPage + ', index : ' + i + ', pageNumber : ' + metaData.pageNumber, ', pageIndex : ' + pageIndex)
            	var active = JSON.stringify(this.state.currentPage) === JSON.stringify(pageIndex)
            	//console.log('key__Page___' + i + ', active : ' + active)
            	var elem = <PaginationItem active={active} key={i}>
            		  <PaginationLink tag="button" name={pageIndex} href={pageIndex} onClick={e => this.handlePagination(e, pageIndex)}>{++index}</PaginationLink>
              </PaginationItem>

              pitem.push(elem);
            }

            pitem.push(<PaginationItem disabled={hasNextPage}>
                    <PaginationLink next tag="button" onClick={e => this.goNextPage(e)}>Next</PaginationLink>
                </PaginationItem>);

            var totalElements;
            if(displayTotalElements){
            	totalElements = <div className="items-number">
    						    <p>Page {metaData.pageNumber + 1} of {metaData.totalPages} - {metaData.totalElements} Element(s)</p>
    					</div>
            }

            pagination = <div className="table-footer">
              					{	metaData.totalPages > 1 &&
              						<Pagination aria-label="Page navigation" className="pagination" size={this.props.tableConfig.paginationSize}>{pitem}</Pagination>
              					}
              					<div className="table-total-elements">{totalElements}</div>
            </div>
        }
        else {
            pagination = <div></div>
        }

		return pagination;
    }

	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    populateRows() {
        const rows = [];
        const itms = JSON.parse(this.props.items);
		itms.forEach((item) => {
            rows.push(
             <DataTableRow  {...this.props} item={item}  columns={this.props.tableConfig.columnsConfig}/>
            );
		 });
		 return rows;
	}

    componentWillUpdate(nextProps, prevState){
    	//console.log('>>>>>>>>>> nextProps : ' + nextProps.metaData)
    	//console.log('>>>>>>>>>> this.state : ' + JSON.stringify(this.state.metaData))
    	if(this.state.metaData && nextProps.metaData !== JSON.stringify(this.state.metaData)){
    		var metaData = JSON.parse(nextProps.metaData);
    		this.setState({
    			metaData: metaData,
    			items: JSON.parse(nextProps.items),
    			currentPage: metaData.pageNumber,
    			maxPage : metaData.totalPages,
				hasPrevious: metaData.hasPreviousPage,
				hasNext: metaData.hasNextPage,
				totalElements: metaData.totalElements
    		})
    	}
    }

	render() {
		if(this.props.totalElements > 0 || this.props.items !== null){
			const rows = this.populateRows();
			const pagination = this.populatePagination();
            const title = this.props.tableTitle ? this.props.tableTitle :
            	this.props.tableConfig.title? this.props.tableConfig.title : '';

            const titleDisplay = title ? (
                  <div className="jsoagger-table-header">
                      <h3>{title}</h3>
                  </div>
            ): ''

			return (
				<React.Fragment>
                  {titleDisplay}
                  <Table hover={this.props.hover} responsive
                  	size={this.props.size} id={this.props.tableId}
                  	className={this.props.tableClassName} striped={this.props.striped}
                  	bordered={this.props.bordered}>

                  <DataTableHeader {...this.props}
                  		hideTableHeader={this.props.tableConfig.hideTableHeader}
                  		columns={this.props.tableConfig.columnsConfig}/>
                  <tbody>{rows}</tbody>
                  </Table>
                  {pagination}
          </React.Fragment>
		  );
		}
		else {
            return emptyTableContent(this.props.tableConfig.emptyMessageTitle,
                this.props.tableConfig.emptyMessageDescription,
                this.props.tableConfig.emptyMessageSubDescription,
                this.props.tableConfig.emptyActions);
		}
  }
}

const emptyTableContent = (title, description, subDescription, emptyActions) => {
	var emptyActionsDisplay
	if(emptyActions){
		emptyActionsDisplay = emptyActions()
	}

	return (
        <div className="empty-table-pane">
              <EmptyPane Pane mainMessage={title} secondaryMessage={description} actions={emptyActionsDisplay}/>
        </div>
  )
}


DataTable.propTypes = propTypes;
DataTable.defaultProps = defaultProps;

export default DataTable;
