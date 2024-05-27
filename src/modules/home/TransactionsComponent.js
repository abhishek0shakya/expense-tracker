import styled from "styled-components";
import React, { useEffect, useState, useCallback } from "react";

const Container = styled.div`
  color: #aa336a;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;
  & input {
    padding: 10px 15px;
    border-radius: 25px;
    background: #f0ffff;
    border: 2px solid #e6e6fa;
    outline: none;
  }
`;

const Cell = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 25px;
  font-size: 14px;
  border-radius: 15px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload?.desc}</span>
      <span>${props.payload?.amount}</span>
    </Cell>
  );
};

const TransactionsComponent = (props) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.transactions);

  const filterData = useCallback(
    (searchText) => {
      if (!searchText || !searchText.trim().length) {
        updateTxn(props.transactions);
        return;
      }
      let txn = [...props.transactions];
      txn = txn.filter((payload) =>
        payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
      );
      updateTxn(txn);
    },
    [props.transactions]
  );

  useEffect(() => {
    filterData(searchText);
  }, [searchText, props.transactions, filterData]);

  return (
    <Container>
      Transactions
      <input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransaction.map((payload) => (
        <TransactionCell key={payload.id} payload={payload} />
      ))}
    </Container>
  );
};

export default TransactionsComponent;
