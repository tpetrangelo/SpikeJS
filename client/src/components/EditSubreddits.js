import React, { Fragment, useState } from "react";

const EditSubreddit = ({ subreddit }) => {
  const [threshold, setThreshold] = useState(subreddit.threshold);

  const updateThreshold = async (e) => {
    e.preventDefault();
    try {
      const body = { threshold };
      await fetch(
        `http://localhost:5000/api/subreddits/${subreddit.subreddit}`,
        {
          mode: "cors",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#${subreddit.subreddit}`}
      >
        Edit Threshold
      </button>

      <div
        className="modal fade"
        id={`${subreddit.subreddit}`}
        tabindex="-1"
        aria-labelledby="editSubreddit"
        aria-hidden="true"
        onClick={() => setThreshold(subreddit.threshold)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editSubreddit">
                Edit Subreddit Threshold
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="number"
                className="form-control"
                name="threshold"
                min="0"
                max="100000000"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
              ></input>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setThreshold(subreddit.threshold)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => updateThreshold(e)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditSubreddit;
