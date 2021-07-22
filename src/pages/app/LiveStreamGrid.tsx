import React, { useEffect, useState } from "react";
import { getLiveUsers } from "../../utils/actions/actionLive";
import { useSelector } from "../../utils/store";

export const LiveStreamGrid = ({ history }: any) => {
  const auth = useSelector<any>((state) => state?.auth?.user);
  const liveList = useSelector((state) => state?.streams.liveList);
  const [loading] = useState(false);

  const handleCardClick = (streamerId: string, liveDetails: any) => {
    history.push(`/app/${streamerId}`, { liveDetails });
  };

  useEffect(() => {
    getLiveUsers();
  }, []);

  const authName = auth.email.split("@")[0];
  const streamers = liveList.filter((v) => v.name !== authName);

  return (
    <>
      <div className="row no-gutters overflow-hidden">
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
            <a href="/app">Refresh</a>
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
                    handleCardClick(value.liveStreamId, value);
                  }}>
                  <div className="card-body justify-content-center d-flex">
                    <img
                      style={{ maxWidth: 150 }}
                      alt="thumbnail"
                      src={require("../../assets/img/live_thumbnail.svg")}
                    />
                  </div>
                  <div className="card-footer text-muted d-flex p-1">
                    <div className="col-8">{value.name}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
