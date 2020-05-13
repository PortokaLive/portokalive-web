import React from "react";

export const LiveStreamGrid = () => {
  const streamers = [
    { name: "", thumbnail: "" },
    { name: "", thumbnail: "" },
    { name: "", thumbnail: "" },
    { name: "", thumbnail: "" },
  ];
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
