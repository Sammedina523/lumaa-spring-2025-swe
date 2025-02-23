import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";
import Auth from "./Auth";

interface Task {
  id: string;
  title: string;
  user_email: string;
  progress: number;
  date: string;
}

const App: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["AuthToken", "Email"]);
  const authToken: string | null = cookies.AuthToken || null;
  const userEmail: string | null = cookies.Email || null;
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    if (authToken && userEmail) {
      getData();
    }
  }, [authToken, userEmail]);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const json: Task[] = await response.json();
      setTasks(json);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="app">
      {!authToken ? (
        <Auth />
      ) : (
        <>
          <ListHeader listName={"My List"} getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
