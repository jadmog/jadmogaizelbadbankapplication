import React from "react";
import UserContext from "./user-context";
import Card from "./card";

function Balance() {
  const [showForm, setShowForm] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCheckBalance() {
    if (!validate(email, "email")) return;

    const userIndex = ctx.users.findIndex((user => user.email === email));

    if (userIndex < 0) {
      setStatus("Please enter an existing email");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    setBalance(ctx.users[userIndex].balance);
    setShowForm(false);
  }

  function clearForm() {
    setEmail("");
    setBalance(0);
    setShowForm(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Balance"
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
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleCheckBalance}
            >
              Show Balance
            </button>
          </>
        ) : (
          <>
            Balance: {balance}
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Check another account
            </button>
          </>
        )
      }
    />
  );
}

export default Balance;
