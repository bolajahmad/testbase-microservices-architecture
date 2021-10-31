import React from 'react';
import { Row } from 'reactstrap';

interface Props {
    message: string;
    handleAction: () => void;
} 

export const AuthHeader: React.FC<Props> = ({ message, handleAction }) => {
    return (
        <Row className="d-flex align-items-center justify-content-between">
            <div className="col-lg-3">MoneyPal</div>

            <div className="col-lg-3">
                <button type="button" className="border-0 btn btn-outline-primary" onClick={handleAction}>
                    {message}
                </button>
            </div>
        </Row>
    )
}