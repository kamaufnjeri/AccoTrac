import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

axios.defaults.withCredentials = true;

const BalanceSheet = () => {
    const [balanceSheet, setBalanceSheet] = useState(null);
    const { company } = useContext(UserContext);
    const currentDate = new Date().toISOString().split('T')[0];
    const [totalAssets, setTotalAssets] = useState(0);
    const [totalLiabilities, setTotalLiabilities] = useState(0);
    const [totalEquity, setTotalEquity] = useState(0);
    const [totalLiabilitiesAndEquity, setTotalLiabilitiesAndEquity] = useState(0);

    useEffect(() => {
        const fetchBalanceSheet = async () => {
            try {
                const response = await axios.get('http://localhost:5000/balancesheet');
                const groupedBalanceSheet = groupByCategory(response.data);
                setBalanceSheet(groupedBalanceSheet);

            } catch (error) {
                console.log(error);
            }
        };
        fetchBalanceSheet();
    }, []);

    useEffect(() => {
        if (balanceSheet) {
            const totalFixedAssets = balanceSheet.assets.fixed_assets.reduce((acc, curr) => acc + curr.balance, 0);
            const currentAssetsTotal = balanceSheet.assets.current_assets.reduce((acc, curr) => acc + curr.balance, 0);
            setTotalAssets(totalFixedAssets + currentAssetsTotal);

            const totalLongTermLoans = balanceSheet.liabilities.long_term_loans.reduce((acc, curr) => acc + curr.balance, 0);
            const totalCurrentLiabilities = balanceSheet.liabilities.current_liabilities.reduce((acc, curr) => acc + curr.balance, 0);
            setTotalLiabilities(totalLongTermLoans + totalCurrentLiabilities);

            const totalEquityAmount = balanceSheet.equity.reduce((acc, curr) => acc + curr.balance, 0);
            setTotalEquity(totalEquityAmount);

            setTotalLiabilitiesAndEquity(totalLiabilities + totalEquity);
            console.log(totalLiabilitiesAndEquity)
        }
    }, [balanceSheet]);

    // Function to group the balance sheet data by category
    const groupByCategory = (data) => {
        const groupedData = {
            assets: { fixed_assets: [], current_assets: [] },
            liabilities: { long_term_loans: [], current_liabilities: [] },
            equity: []
        };

        data.forEach((entry) => {
            const { category, sub_category, name, balance } = entry;
            if (category === 'asset') {
                if (sub_category === 'fixed_asset') {
                    groupedData.assets.fixed_assets.push({ name, balance });
                } else if (sub_category === 'bank' || sub_category === 'cash' || sub_category === 'inventory' || sub_category === 'accounts_receivable') {
                    groupedData.assets.current_assets.push({ name, balance });
                }
            } else if (category === 'liability') {
                if (sub_category === 'accounts_payable') {
                    groupedData.liabilities.current_liabilities.push({ name, balance });
                } else if (sub_category === 'long_term_loan') {
                    groupedData.liabilities.long_term_loans.push({ name, balance });
                }
            } else if (category === 'capital') {
                groupedData.equity.push({ name, balance });
            }
        });

        return groupedData;
    };
    return (
        <div className="container">
            
            {company && balanceSheet && (<div>
                <h2 className='m-0'>{company.name}</h2>
                <h2 className='m-0'>Balance Sheet</h2>
                <h2 className='m-0'>As at {currentDate}</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th><strong>Account Name</strong></th>
                            <th><strong>Amount ({company.currency})</strong></th>
                            <th><strong>Total Amount ({company.currency})</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3" className="text-center"><strong>Assets</strong></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><strong>Fixed Assets</strong></td>
                            <td></td>
                        </tr>
                        {balanceSheet.assets.fixed_assets.map((asset, index) => (
                            <tr key={index}>
                                <td>{asset.name}</td>
                                <td>{asset.balance}</td>
                                <td></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2"><strong>Current Assets</strong></td>
                            <td></td>
                        </tr>
                        {balanceSheet.assets.current_assets.map((asset, index) => (
                            <tr key={index}>
                                <td>{asset.name}</td>
                                <td>{asset.balance}</td>
                                <td></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" style={{ borderBottom: "2px solid black" }}></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><strong>Total Assets</strong></td>
                            <td><strong>{totalAssets}</strong></td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="text-center"><strong>Liabilities and Equity</strong></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><strong>Liabilities</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan="1"><strong>Long Term Loans</strong></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {balanceSheet.liabilities.long_term_loans.map((liability, index) => (
                            <tr key={index}>
                                <td>{liability.name}</td>
                                <td>{liability.balance}</td>
                                <td></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="1"><strong>Current Liabilities</strong></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {balanceSheet.liabilities.current_liabilities.map((liability, index) => (
                            <tr key={index}>
                                <td>{liability.name}</td>
                                <td>{liability.balance}</td>
                                <td></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2"><strong>Total Liabilities</strong></td>
                            <td><strong>{totalLiabilities}</strong></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><strong>Equity</strong></td>
                            <td></td>
                        </tr>
                        {balanceSheet.equity.map((equity, index) => (
                            <tr key={index}>
                                <td>{equity.name}</td>
                                <td>{equity.balance}</td>
                                <td></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2"><strong>Total Equity</strong></td>
                            <td><strong>{totalEquity}</strong></td>
                        </tr>
                        <tr>
                        <td colSpan="3" style={{ borderBottom: "2px solid black" }}></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><strong>Total Liabilities and Equity</strong></td>
                            <td><strong>{totalLiabilitiesAndEquity}</strong></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            )}
        </div>
    );
};

export default BalanceSheet;
