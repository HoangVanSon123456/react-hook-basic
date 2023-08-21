import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination : PropTypes.object.isRequired,
    onPageChange : PropTypes.func
};

Pagination.defaultProps = {
    onPageChange : null
};


function Pagination(props) {

    const {onPageChange , pagination} = props;

    const {_page, _limit, _totalRows} = pagination;

    function handlePageChang(newPage) {
        if(onPageChange) {
            onPageChange(newPage);
        }
    }
    return (
        <div>
            <button disabled={_page <= 1} onClick={() =>handlePageChang(_page - 1)}>Prev</button>
            <button disabled={_page >= _totalRows} onClick={() =>handlePageChang(_page + 1)}>Next</button>
        </div>
    );
}

export default Pagination;