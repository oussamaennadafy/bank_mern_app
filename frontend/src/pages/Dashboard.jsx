import { useEffect } from "react";
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
    // <>
    //   <section classNameName='heading'>
    //     <h1>Welcome {user && user.name}</h1>
    //     <p>transactions Dashboard</p>
    //   </section>

    //   <RequestForm />

    //   <section classNameName='content'>
    //     {transactions.length > 0 ? (
    //       <div classNameName='transactions'>
    //         {transactions.map((goal) => (
    //           <Transaction key={goal._id} goal={goal} />
    //         ))}
    //       </div>
    //     ) : (
    //       <h3>You have not set any transactions</h3>
    //     )}
    //   </section>
    // </>
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
        {/* <div className="movements__row">
          <div className="movements__type movements__type--deposit">
            2 deposit
          </div>
          <div className="movements__date">3 days ago</div>
          <div className="movements__value">4 000€</div>
        </div> */}
        {transactions.length ? (
          transactions?.map((transaction, index, array) => (
            <div className="movements__row">
              <div
                className={`movements__type movements__type--${
                  transaction.type == "send" ? "withdrawal" : "deposit"
                }`}
              >
                {`${array.length - index} ${
                  transaction.type == "send" ? "withdrawal" : "deposit"
                }`}
              </div>
              <div className="movements__date">
                {new Date(transaction.createdAt).toLocaleString()}
              </div>
              <div className="movements__value">
                {formatter(transaction.amount)}
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">no transactions yet</p>
        )}
        {/* <div className="movements__row">
          <div className="movements__type movements__type--withdrawal">
            1 withdrawal
          </div>
          <div className="movements__date">24/01/2037</div>
          <div className="movements__value">-378€</div>
        </div> */}
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

      <TransactionForm type="send" />

      <TransactionForm type="receive" />

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
