import React, { useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, updateExpense, expenseToUpdate }) => {
    const expenseTextInput = useRef();
    const expenseAmountInput = useRef();

    useEffect(() => {
        if (expenseToUpdate) {
            expenseTextInput.current.value = expenseToUpdate.text;
            expenseAmountInput.current.value = expenseToUpdate.amount;
        }
    }, [expenseToUpdate]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        const expenseText = expenseTextInput.current.value;
        const expenseAmount = parseFloat(expenseAmountInput.current.value);

        if (!expenseText || isNaN(expenseAmount) || expenseAmount === 0) {
            return;
        }

        const expense = {
            text: expenseText,
            amount: expenseAmount,
            id: expenseToUpdate ? expenseToUpdate.id : new Date().getTime(),
        };

        expenseToUpdate ? updateExpense(expenseToUpdate.id, expense) : addExpense(expense);
        clearInput();
    };

    const clearInput = () => {
        expenseTextInput.current.value = "";
        expenseAmountInput.current.value = "";
    };

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <h3>{expenseToUpdate ? "Edit Transaction" : "Add New Transaction"}</h3>
            <label htmlFor="expenseText">Text</label>
            <input
                id="expenseText"
                className={styles.input}
                type="text"
                placeholder="Enter text..."
                ref={expenseTextInput}
                required
            />
            <div>
                <label htmlFor="expenseAmount">Amount</label>
                <div>(negative - expense, positive - income)</div>
            </div>
            <input
                className={styles.input}
                id="expenseAmount"
                type="number"
                placeholder="Enter amount..."
                ref={expenseAmountInput}
                required
            />
            <button className={styles.submitBtn}>{expenseToUpdate ? "Edit Transaction" : "Add Transaction"}</button>
        </form>
    );
};

export default ExpenseForm;
