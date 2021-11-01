import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Table } from 'reactstrap';
import { AuthenticatedUser, WalletDetailsModel } from '../../models';
import { extract } from '../../utils';
import { CreditWalletModal, TransferFormModal } from './components';

export const DashboardPage = () => {
    const userDetails = extract<AuthenticatedUser>('AUTH_USER')!;
    const [modalOpen, setModalOpen] = useState<'transfer' | 'fund' | undefined>();
    const [walletDetails, setWalletDetails] = useState<WalletDetailsModel | undefined>(undefined);

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_WALLET_BASE_URL}get-wallet-balance`,
            headers: {
                authorization: `Bearer ${(userDetails as AuthenticatedUser)?.token}`
            }
        }).then((response) => response.data)
        .then(({ data }) => setWalletDetails(data)).catch((error) => console.log({ error }))
    }, [userDetails]);

    if (!userDetails) {
        return <Redirect to="/login" />
    }

    if (modalOpen) {
        return modalOpen === 'transfer' ? 
            <TransferFormModal onClose={() => setModalOpen(undefined)} /> : 
            <CreditWalletModal onClose={() => setModalOpen(undefined)} />;
    }

    return (
        <Container style={{ maxWidth: 450, margin: '4em auto' }}>
            <Row className="mb-4">
                <h2 className="col-lg-4 mx-auto text-primary">MoneyPal</h2>
            </Row>

            <Row>
                <div className="col-lg-12 mb-3 text-center">Hello, <strong className="capitalize">{userDetails.firstName}&nbsp;{userDetails.lastName}</strong></div>

                <div className="row mb-4">
                    <span className="col-6 bold">Wallet Balance:</span>
                    <span className="col-4">&#x20A6;{walletDetails?.amount.toLocaleString()}</span>
                </div>
            </Row>

            <Row>
                <div className="col-lg-6 mx-auto mb-4">
                    <button className="btn btn-success" onClick={() => setModalOpen('fund')}>Fund Wallet</button>
                </div>
            </Row>

            <Row>
                <div className="col-lg-6 mb-4">
                    <button className="btn btn-primary" onClick={() => setModalOpen('transfer')}>Transfer Money</button>
                </div>
            </Row>

            <Row>
                <div className="col-12 d-flex align-items-center justify-content-between bold-6 m-3">
                    Transaction History

                    <Link to="history">View All</Link>
                </div>

                {true ? <div className="form-error capitalize centered">No Transactions Yet</div> :
                <Table>
                    <thead>
                        <th>S/N</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                    </thead>
                </Table>}
            </Row>
        </Container>
    )
}