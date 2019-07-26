import React from 'react'

export default class LibraryFormSearch extends Component {

    render () { 
  
    }

    return () { 
    <div>
    <div style={{ height: '10px'}}><br /></div>
        <div className="card">
            <table className="table table-striped">
                 <thead className="thead-dark">
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Image</th>
            <th>Writer</th>
            <th>Category</th>
            <th>Location</th>
            <th style={{ textAlign: 'center'}}>Action</th>
        </tr>                            
    </thead>
    <tbody>
        {dataList}
    </tbody>
    </table>
    </div>
    </div>
    }
    
}