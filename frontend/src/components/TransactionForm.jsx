import { useState } from "react";
import { useDispatch } from "react-redux";
import { createtransaction } from "../features/transactions/transactionSlice";

function RequestForm({ type }) {
  const [amount, setamount] = useState("");

  const dispatch = useDispatch();

  const handleAmount = (value) => {
    if (value > 0) setamount(value);
    else setamount("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createtransaction({ amount, type }));
    setamount("");
  };

  return (
    <div
      className={`operation operation--${type == "send" ? "transfer" : "loan"}`}
    >
      <h2>{type == "send" ? "Transfer money" : "Request loan"}</h2>
      <form onSubmit={onSubmit} className="form form--loan">
        <input
          step="any"
          value={amount}
          onChange={(e) => handleAmount(e.target.valueAsNumber)}
          type="number"
          id={type}
          className="form__input form__input--loan-amount"
        />
        <button className="form__btn form__btn--loan">&rarr;</button>
        <label htmlFor={type} className="form__label form__label--loan">
          Amount
        </label>
      </form>
    </div>
  );
}

export default RequestForm;
