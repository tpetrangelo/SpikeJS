import React, { Fragment, useEffect, useState } from "react";

import EditSubreddit from "./EditSubreddits";
import CurrentSubredditUsers from "./CurrentSubredditUsers";

const ListSubreddits = () => {
  const [subreddits, setSubreddits] = useState([]);
  const [state, setState] = useState([]);
  
  const deleteSubreddit = async (subredditDelete) => {
    try {
      await fetch(`http://localhost:5000/api/subreddits/${subredditDelete}`, {
        method: "DELETE",
      });

      setSubreddits(
        subreddits.filter(
          (subreddit) => subreddit.subreddit !== subredditDelete
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSubreddits = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subreddits");
      const jsonData = await response.json();

      setSubreddits(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getSubreddits();
  }, []);
 

  return (
    <Fragment>
      <h1 className="display-6 text-center">Tracked Subreddits</h1>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>Subreddit</th>
            <th>Threshold</th>
            <th>Current Users</th>
            <th>Receive Notification</th>
            <th>Edit Subreddit Threshold</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {subreddits.map((subreddit) => (
            <tr key={subreddit.subreddit} className="text-center">
              <td>
               <a href={`https://old.reddit.com/r/${subreddit.subreddit}`} target="_blank" rel="noreferrer noopener" className="subredditForArray">{subreddit.subreddit}</a>
              </td>
              <td id={`threshold_${subreddit.subreddit}`}>{subreddit.threshold.toLocaleString()}</td>
              <td id={`current_${subreddit.subreddit}`}>
                <CurrentSubredditUsers currentSubreddit={subreddit}/>
              </td>
              <td>
                <input className="form-check-input" type="checkbox" value="" id={`check_${subreddit.subreddit}`}/>
              </td>
              <td>
                <EditSubreddit subreddit={subreddit} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteSubreddit(subreddit.subreddit)}
                >
                  Delete
                </button>
              </td>
              
            </tr>
          ))}
          
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListSubreddits;
