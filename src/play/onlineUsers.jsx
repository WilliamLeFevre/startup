import React from "react";

export function OnlineUsers({ userName, score }) {
  const [users, setUsers] = React.useState([]);
  const wsRef = React.useRef(null);

  React.useEffect(() => {
    
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
 
      ws.send(JSON.stringify({ type: "join", userName, score }));
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "userList") {
          setUsers(msg.users);
        }
      } catch (e) {
        
      }
    };

    ws.onclose = () => {};

    return () => {
      ws.close();
    };

  }, [userName]);


  React.useEffect(() => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "scoreUpdate", score }));
    }
  }, [score]);

  return (
    <div className="col-2 d-none d-xl-block p-3">
      <h5>Online Users</h5>
      <ul className="list-unstyled text-nowrap border border-dark p-1">
        {users.map((u, i) => (
          <li key={i} className="fs-5">
            {u.userName} – {u.score}
          </li>
        ))}
      </ul>
    </div>
  );
}