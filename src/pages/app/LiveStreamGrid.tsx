import React, { useEffect, useState } from "react";
import { getToken, getAPI } from "../../utils/constants";

export const LiveStreamGrid = ({ history }: any) => {
  const [streamers, setStreamers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const updateStreamers = (streams: any[]) => {
    setStreamers([...streams]);
  };
  const mediaServerUrl = getAPI();
  const token = getToken();

  const handleCardClick = (streamerId: string) => {
    history.push(`/app/${streamerId}`);
  };

  useEffect(() => {
    setLoading(true);
    const events = new EventSource(
      `${mediaServerUrl}/stream?token=${token}`
    );

    events.onopen = () => {
      console.log("Live stream list is loading");
      setLoading(false);
    };

    events.onerror = (event) => {
      console.log(event);
    };

    events.onmessage = (event) => {
      updateStreamers(JSON.parse(event.data));
    };

    return () => {
      console.log("Live stream list is closed");
      events.close();
    };
  }, [mediaServerUrl, token]);

  return (
    <>
      <div className="row no-gutters mt-5 pt-5 overflow-hidden">
        {!!!streamers.length && loading && (
          <div className="d-flex flex-column h-70 justify-content-center align-items-center w-100">
            <img
              alt="loading"
              style={{ maxWidth: 330 }}
              src={require("../../assets/img/live_loading.svg")}
            />
            <h2>Hmm..Who is broadcasting now?</h2>
          </div>
        )}
        {!!!streamers.length && !loading && (
          <div className="d-flex flex-column h-70 justify-content-center align-items-center w-100">
            <img
              style={{ maxWidth: 330 }}
              alt="empty"
              src={require("../../assets/img/live_empty.svg")}
            />
            <h2>No one is broadcasting.</h2>
          </div>
        )}
        {streamers &&
          !!streamers.length &&
          streamers.map((value, index) => {
            return (
              <div className="col-sm-6 col-md-4 col-lg-4 p-2" key={index}>
                <div
                  className="card pointer border-primary"
                  onClick={() => {
                    handleCardClick(value.publisher);
                  }}
                >
                  <div className="card-body justify-content-center d-flex">
                    <img
                      style={{ maxWidth: 150 }}
                      alt="thumbnail"
                      src={require("../../assets/img/live_thumbnail.svg")}
                    />
                  </div>
                  <div className="card-footer text-muted d-flex p-1">
                    <div className="col-8">{value.publisher}</div>
                    <div className="col-4">
                      {value.subscribers.length} Viewing
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
