import React, { useEffect, useState, useRef } from "react";
import { getMediaServerUrl, getToken } from "../../utils/constants";
import flv from "flv.js";

export const LiveStreamView = ({ history, match }: any) => {
  const videoRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [ended, setEnded] = useState(0);

  useEffect(() => {
    const player = flv.createPlayer({
      type: "flv",
      url: `${getMediaServerUrl()}live/${match.params.streamerId}.flv`,
    });

    player.attachMediaElement(videoRef.current);
    player.load();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const video: HTMLVideoElement = videoRef.current;
      video.onplaying = () => {
        setLoading(false);
        let timeCounter = 0;
        const timer = setInterval(() => {
          if (timeCounter > video.currentTime) {
            setEnded(1);
            clearInterval(timer);
          }
          timeCounter++;
        }, 1000);
      };
    }
  }, [videoRef.current]);

  useEffect(() => {
    if (ended) {
      setInterval(() => {
        setEnded(ended + 1);
      }, 1000);
      setTimeout(() => {
        history.push("/app");
      }, 2000);
    }
  }, [ended]);

  return (
    <>
      {loading && !ended && (
        <div className="d-flex wrapper h-70 justify-content-center align-items-center">
          <h3>Loading...</h3>
        </div>
      )}
      {!!ended && (
        <div className="d-flex wrapper h-70 justify-content-center align-items-center">
          <h3>
            Live stream has ended.
            <br />
            Going back to home page in {ended}...
          </h3>
        </div>
      )}
      {
        <video
          ref={videoRef}
          style={{
            display: loading || ended ? "none" : "block",
            width: "100vw",
            height: "100vh",
            background: "black",
          }}
          controls={true}
          autoPlay={true}
        />
      }
    </>
  );
};
