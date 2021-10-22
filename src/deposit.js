import React from "react";
import UserContext from "./user-context";
import Card from "./card";

function Deposit() {
  const [showForm, setShowForm] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function validateAmount(field, label) {
    if (!validate(field, label)) {
      return false;
    }
    const amount = parseFloat(field, 10);
    if (!Number.isFinite(amount) || amount <= 0) {
      setStatus("Please enter a valid amount" );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleDeposit() {
    if (!validate(email, "email")) return;
    if (!validateAmount(amount, "amount")) return;

    const usersLocal = ctx.users;

    const userIndex = usersLocal.findIndex((user => user.email === email));

    if (userIndex < 0) {
      setStatus("Please enter an existing email");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    usersLocal[userIndex].balance = usersLocal[userIndex].balance + parseFloat(amount, 10);
    ctx.users = usersLocal;
    setShowForm(false);
  }

  function clearForm() {
    setEmail("");
    setAmount(0);
    setShowForm(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={
        showForm ? (
          <>
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Amount
            <br />
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleDeposit}
            >
              Deposit
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Deposit again
            </button>
          </>
        )
      }
    />
  );
}

export default Deposit;
