import React from 'react';
import './Spinner.scss';

const spinner = props => {
    return (
        <div className="spinner">
            <div className="lds-hourglass" />
        </div>
    );
};

export default spinner;
