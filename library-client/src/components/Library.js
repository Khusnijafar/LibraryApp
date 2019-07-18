import React, { Component } from 'react'
import LibraryFormAdd from './LibraryFormAdd'
import LibraryDataList from './LibraryDataList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LibraryActions from '../actions'


class Library extends Component {
   
    componentDidMount() {
        this.props.actions.loadLibrary()
    }

    render() {
        const { data, actions } = this.props
        return (
            <div>
                <div className="container text-center">
                    <h1>
                        <font><b><i className="book icon"></i>Library</b></font>
                    </h1>
                </div>
                <div style={{ height: '5px'}}><br /></div>
                <LibraryFormAdd title="" image="" writer="" category="" location="" onSave={actions.addLibrary} />
                <div style={{ height: '10px'}}><br /></div>
                <LibraryDataList data={data} actions={actions} />
            </div>
        )
    }
}

function mapsStateToProps(state) {
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(LibraryActions, dispatch)
    }
}

export default connect (
    mapsStateToProps,
    mapDispatchToProps
)(Library)