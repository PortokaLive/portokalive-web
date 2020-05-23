import React, { useEffect, useState, useRef } from "react";
import { getAPI, getToken } from "../../utils/constants";
import flv from "flv.js";

export const LiveStreamView = ({ history, match }: any) => {
  const videoRef_A = useRef<any>(null);
  const videoRef_B = useRef<any>(null);
  const [load, setLoad] = useState("A");
  const [show, setShow] = useState("");
  const { streamerId } = match.params;

  useEffect(() => {
    switch (load) {
      case "A":
        const player_A = flv.createPlayer({
          type: "flv",
          url: `${getAPI()}/stream/${streamerId}.flv?token=${getToken()}`,
        });
        player_A.on("error", (err) => {
          history.push("/app");
        });
        player_A.attachMediaElement(videoRef_A.current);
        player_A.load();

        const video_A: HTMLVideoElement = videoRef_A.current;
        video_A.onplaying = () => {
          setImmediate(() => {
            setShow("A");
          });
          let timeCounter = 0;
          const timer = setInterval(() => {
            if (timeCounter >= 10 && timeCounter >= video_A.currentTime - 2) {
              setLoad("B");
              clearInterval(timer);
            }
            timeCounter++;
          }, 1000);
        };
        return () => {
          player_A.unload();
        };
      case "B":
        const player_B = flv.createPlayer({
          type: "flv",
          url: `${getAPI()}/stream/${streamerId}.flv?token=${getToken()}`,
        });
        player_B.on("error", (err) => {
          history.push("/app");
        });
        player_B.attachMediaElement(videoRef_A.current);
        player_B.load();
        player_B.attachMediaElement(videoRef_B.current);
        player_B.load();

        const video_B: HTMLVideoElement = videoRef_B.current;
        video_B.onplaying = () => {
          setImmediate(() => {
            setShow("B");
          });
          let timeCounter = 0;
          const timer = setInterval(() => {
            if (timeCounter >= 10 && timeCounter >= video_B.currentTime - 2) {
              setLoad("A");
              clearInterval(timer);
            }
            timeCounter++;
          }, 1000);
        };
        return () => {
          player_B.unload();
        };
      default:
        break;
    }
  }, [streamerId, load, history]);

  return (
    <>
      {
        <video
          hidden={show != "A"}
          ref={videoRef_A}
          style={{
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
          hidden={show != "B"}
          ref={videoRef_B}
          style={{
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
