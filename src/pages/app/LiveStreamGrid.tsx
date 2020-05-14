import React, { useEffect, useState } from "react";

export const LiveStreamGrid = () => {
  const [streamers, setStreamers] = useState<any[]>([]);
  const [listening, setListening] = useState(false);
  const updateStreamers = (streams: any[]) => {
    setStreamers([...streams]);
  };

  useEffect(() => {
    if (!listening) {
      const events = new EventSource(
        "http://localhost:8000/sse/streams?sseKey=4Jp2Q3RyIu"
      );

      events.onmessage = (event) => {
        console.log(JSON.parse(event.data));
        updateStreamers(JSON.parse(event.data));
      };
    }
    setListening(true);
  }, [listening, streamers]);

  return (
    <>
      <div className="row no-gutters mt-5 pt-5 overflow-hidden">
        {streamers.map((value, index) => {
          return (
            <div className="col-sm-6 p-2" key={index}>
              <div className="card">
                <img
                  className="card-img-top"
                  src={value.thumbnail}
                  alt="Live stream thumbnail"
                />
                <div className="card-body"></div>
                <div className="card-footer text-muted">{value.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
