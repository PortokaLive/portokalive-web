import React, { useEffect, useState, useRef } from "react";
import { getAPI, getToken } from "../../utils/constants";
import flv from "flv.js";

export const LiveStreamView = ({ history, match }: any) => {
  const videoRef_A = useRef<any>(null);
  const videoRef_B = useRef<any>(null);
  const [show_A, setShow_A] = useState(true);
  const [show_B, setShow_B] = useState(false);
  const [loading, setLoading] = useState(true);
  const { streamerId } = match.params;

  useEffect(() => {
    if (show_A) {
      const player = flv.createPlayer({
        type: "flv",
        url: `${getAPI()}/stream/${streamerId}.flv?token=${getToken()}`,
      });

      player.attachMediaElement(videoRef_A.current);
      player.load();

      const video: HTMLVideoElement = videoRef_A.current;
      video.onplaying = () => {
        setLoading(false);
        let timeCounter = 0;
        const timer = setInterval(() => {
          if (timeCounter === video.currentTime) {
            setShow_B(true);
            setShow_A(false);
            clearInterval(timer);
          }
          timeCounter++;
        }, 1000);
      };
    } else if (show_B) {
      const player = flv.createPlayer({
        type: "flv",
        url: `${getAPI()}/stream/${streamerId}.flv?token=${getToken()}`,
      });

      player.attachMediaElement(videoRef_B.current);
      player.load();

      const video: HTMLVideoElement = videoRef_B.current;
      video.onplaying = () => {
        setLoading(false);
        let timeCounter = 0;
        const timer = setInterval(() => {
          if (timeCounter === video.currentTime) {
            setShow_A(true);
            setShow_B(false);
            clearInterval(timer);
          }
          timeCounter++;
        }, 1000);
      };
    }
  }, [streamerId, show_A, show_B]);

  return (
    <>
      {loading && (
        <div className="d-flex wrapper h-70 justify-content-center align-items-center">
          <h3>Loading...</h3>
        </div>
      )}
      {
        //!!ended && (
        //  <div className="d-flex wrapper h-70 justify-content-center align-items-center">
        //    <h3>
        //      Live stream has ended.
        //      <br />
        //      Going back to home page in {ended}...
        //    </h3>
        //  </div>)
      }
      {
        <video
          ref={videoRef_A}
          style={{
            display: loading || show_A === false ? "none" : "block",
            width: "100vw",
            height: "100vh",
            background: "black",
          }}
          controls={true}
          autoPlay={true}
        />
      }
      {
        <video
          ref={videoRef_B}
          style={{
            display: loading || show_B === false ? "none" : "block",
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
