import { useEffect, useState } from "react";

const CurrentSubredditUsers = ({ currentSubreddit }) => {
  const [users, setActiveUsers] = useState([]);

  const getActiveUsers = async () => {

    try {
      const response = await fetch(
        `https://www.reddit.com/r/${currentSubreddit.subreddit}/about.json`,
        {
          method: "GET",
          headers: {
            "user-agent": "Web App:Spike:v0.0.1: By /u/AsleepTouch7025",
          },
        }
      );

      const jsonData = await response.json();
      setActiveUsers(jsonData.data.accounts_active);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getActiveUsers();
    const interval = setInterval(() => {
      getActiveUsers();
    }, 60000);

    return () => clearInterval(interval);
  }, [users]);


  return users.toLocaleString();
};

export default CurrentSubredditUsers;
