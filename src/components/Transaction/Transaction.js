import React, { useState } from "react";
import styles from "./Transaction.module.css";
import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";

const Transaction = ({ expense, deleteExpense, initiateUpdateExpense, index }) => {
    const [currentHoverIndex, setCurrentHoverIndex] = useState(null);

    return (
        <li
            className={`${styles.transaction} ${expense.amount > 0 ? styles.profit : styles.loss}`}
            onMouseOver={() => setCurrentHoverIndex(index)}
            onMouseLeave={() => setCurrentHoverIndex(null)}
        >
            <div>{expense.text}</div>
            <div className={styles.transactionOptions}>
                <div className={`${styles.amount} ${currentHoverIndex === index && styles.movePrice}`}>
                    &#8377; {expense.amount.toFixed(2)}
                </div>
                <div className={`${styles.btnContainer} ${currentHoverIndex === index && styles.active}`}>
                    <div className={styles.edit} onClick={() => initiateUpdateExpense(expense.id)}>
                        <img src={EditImage} height="100%" alt="Edit" />
                    </div>
                    <div className={styles.delete} onClick={() => deleteExpense(expense.id)}>
                        <img src={DeleteImage} height="100%" alt="Delete" />
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Transaction;
