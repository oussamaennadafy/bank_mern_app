import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TransactionForm from "../components/TransactionForm";
import Transaction from "../components/Transaction";
import Spinner from "../components/Spinner";
import {
  gettransactions,
  reset,
} from "../features/transactions/transactionSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );
  const date = new Date();

  const formatter = (amount) =>
    new Intl.NumberFormat("us-en", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(gettransactions());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="app">
      <div className="balance">
        <div>
          <p className="balance__label">Current balance</p>
          <p className="balance__date">
            As of <span className="date">{date?.toLocaleString()}</span>
          </p>
        </div>
        <p className="balance__value">{formatter(user?.balance)}</p>
      </div>

      <div className="movements">
        {transactions.length ? (
          transactions?.map((transaction, index, array) => (
            <Transaction
              transaction={transaction}
              index={index}
              arrayLength={array.length}
              formatter={formatter}
              key={transaction._id}
            />
          ))
        ) : (
          <p className="no-data">no transactions yet</p>
        )}
      </div>

      <div className="summary">
        <p className="summary__label">In</p>
        <p className="summary__value summary__value--in">0000€</p>
        <p className="summary__label">Out</p>
        <p className="summary__value summary__value--out">0000€</p>
        <p className="summary__label">Interest</p>
        <p className="summary__value summary__value--interest">0000€</p>
        {/* <button className="btn--sort"> &downarrow; SORT</button> */}
      </div>

      <TransactionForm type="receive" />

      <TransactionForm type="send" />

      <div className="operation operation--close">
        <h2>Close account</h2>
        <form className="form form--close">
          <input type="text" className="form__input form__input--user" />
          <input
            type="password"
            maxLength="6"
            className="form__input form__input--pin"
          />
          <button className="form__btn form__btn--close">&rarr;</button>
          <label className="form__label">Confirm user</label>
          <label className="form__label">Confirm PIN</label>
        </form>
      </div>

      <p className="logout-timer">
        You will be logged out in <span className="timer">05:00</span>
      </p>
    </main>
  );
}

export default Dashboard;
