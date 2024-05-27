import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import OverViewComponent from "./OverViewComponent";
import TransactionsComponent from "./TransactionsComponent";

const Container = styled.div`
  background-color: #96ded1;
  color: #1434a4;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  border-radius: 15px;
`;

const Footer = styled.div`
  color: #faa0a0;
  text-align: center;
  margin-top: 80px;
`;

const HomeComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  const calculateBalance = useCallback(() => {
    let exp = 0;
    let inc = 0;
    transactions.forEach((payload) =>
      payload.type === "EXPENSE"
        ? (exp += payload.amount)
        : (inc += payload.amount)
    );
    setExpense(exp);
    setIncome(inc);
  }, [transactions]);

  useEffect(() => {
    calculateBalance();
  }, [transactions, calculateBalance]);

  const addTransaction = (payload) => {
    setTransactions((prevTransactions) => [...prevTransactions, payload]);
  };

  return (
    <>
      <Container>
        <OverViewComponent
          expense={expense}
          income={income}
          addTransaction={addTransaction}
        />
        {transactions.length > 0 && (
          <TransactionsComponent transactions={transactions} />
        )}
      </Container>
      <Footer>
        <p>
          Developed by{" "}
          <a
            href="https://github.com/abhishek0shakya"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abhishek Shakya
          </a>{" "}
          💙
        </p>
      </Footer>
    </>
  );
};

export default HomeComponent;
