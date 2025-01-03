import React, { useReducer } from 'react';

// Action types
const CHANGE_INPUT = 'CHANGE_INPUT';
const RESET_FORM = 'RESET_FORM';

// Initial state
const initialState = {
  authorName: '',
  quoteText: '',
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case RESET_FORM: {
      return { authorName: '', quoteText: '' }; // Fixed typo here
    }
    default: {
      return state;
    }
  }
};

export default function QuoteForm({ createQuote }) {
  // Use the reducer hook to manage form state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handle input changes
  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } }); // Fixed typo here
  };

  // Reset the form fields
  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };

  // Handle form submission
  const onNewQuote = (evt) => {
    evt.preventDefault();
    const { authorName, quoteText } = state;
    createQuote({ authorName, quoteText });
    resetForm(); // Reset form after submitting
  };

  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      
      <label>
        <span>Author:</span>
        <input
          type="text"
          name="authorName"
          placeholder="Type author name"
          value={state.authorName}
          onChange={onChange}
        />
      </label>
      
      <label>
        <span>Quote text:</span>
        <textarea
          name="quoteText"
          placeholder="Type quote"
          value={state.quoteText}
          onChange={onChange}
        />
      </label>
      
      <label>
        <span>Create quote:</span>
        <button type="submit" disabled={!state.authorName || !state.quoteText}>
          DO IT!
        </button>
      </label>
    </form>
  );
}
