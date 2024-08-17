import { useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
        case "ADD_EXPENSE": {
            return {
                expenses: [payload.expense, ...state.expenses],
            };
        }
        case "REMOVE_EXPENSE": {
            return {
                expenses: state.expenses.filter((expense) => expense.id !== payload.id),
            };
        }
        case "UPDATE_EXPENSE": {
            return {
                expenses: state.expenses.map((expense) => (expense.id === payload.id ? payload.updateExpense : expense)),
            };
        }
        default:
            return state;
    }
};

const isUpdateReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "TOGGLE":
            return {
                updateExpense: {
                    id: payload.id,
                    status: !state.updateExpense.status,
                },
            };
        case "RESET":
            return {
                updateExpense: {
                    id: null,
                    status: false,
                },
            };
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, { expenses: [] });
    const [isUpdate, isUpdateDispatch] = useReducer(isUpdateReducer, { updateExpense: { id: null, status: false } });

    const addExpense = (expense) => {
        dispatch({ type: "ADD_EXPENSE", payload: { expense } });
    };

    const deleteExpense = (id) => {
        dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
    };

    const initiateUpdateExpense = (id) => {
        if (!isUpdate.updateExpense.status) {
            isUpdateDispatch({ type: "TOGGLE", payload: { id } });
        }
    };

    const updateExpense = (id, updatedExpense) => {
        dispatch({ type: "UPDATE_EXPENSE", payload: { id, updateExpense: updatedExpense } });
        isUpdateDispatch({ type: "RESET" });
    };

    return (
        <>
            <h2 className="mainHeading">Expense Tracker</h2>
            <div className="App">
                <ExpenseForm
                    addExpense={addExpense}
                    updateExpense={updateExpense}
                    expenseToUpdate={
                        isUpdate.updateExpense.status ? state.expenses.find((exp) => exp.id === isUpdate.updateExpense.id) : null
                    }
                />
                <div className="expenseContainer">
                    <ExpenseInfo expenses={state.expenses} />
                    <ExpenseList
                        expenses={state.expenses}
                        deleteExpense={deleteExpense}
                        initiateUpdateExpense={initiateUpdateExpense}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
