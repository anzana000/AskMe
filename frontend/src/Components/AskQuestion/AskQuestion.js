import React from 'react';
import "./AskQuestion.css";

const AskQuestion = () => {
    return (
        <div class="container mt-5  pt-5 ask-container">
        <h3>Ask a question</h3>
        <form>
           
            <div class="mb-3">
         
                <textarea type="text" class="form-control" id="" placeholder="Type question here..."></textarea>
            </div>
           
            <button type="submit" class="btn btn-success btn-sm ask-button">Submit</button>
        </form>
    </div>

    )
}

export default AskQuestion
