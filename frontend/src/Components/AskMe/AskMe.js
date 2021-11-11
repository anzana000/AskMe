import React from 'react';
import "./AskMe.css";

const AskMe = () => {
    // const like = document.getElementById("span#like");
    // const likeClicked = () => {
    //     like.classList.add("like");
    // }
    return (
        <div className = "askme">
            
          
                <input type="text" placeholder="Ask a question" />
              {/* <button type="button" class="btn btn-primary">Add</button> */}

         
            <div className="questions">
                <div className="top-section">
                    <img src="https://investuttarakhand.com/swcs/themes/utrakhand/assets/img/demo/7.jpg" alt="" />
                    <h4>Anzana Poudel</h4>
                </div>
                <h3>What is javascript?Which is the most trending javascript library today?</h3>
                <div className="socials">
                    <span id = "like">Like</span>
                    <span>Comment</span>
                    <span>Share</span>
                </div>
            </div>
            
        </div>
    )
}

export default AskMe
