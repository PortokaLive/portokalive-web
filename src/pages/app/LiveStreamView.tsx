import React, { useEffect, useState, useRef } from "react";
import { getAPI, getToken } from "../../utils/constants";
import flv from "flv.js";

export const LiveStreamView = ({ history, match }: any) => {
  const videoRef_A = useRef<any>(null);
  const videoRef_B = useRef<any>(null);
  const [load_A, setLoad_A] = useState(true);
  const [load_B, setLoad_B] = useState(false);
  const [show, setShow] = useState("A");
  const { streamerId } = match.params;

  useEffect(() => {
    if (load_A) {
      const player_A = flv.createPlayer({
        type: "flv",
        url: `${getAPI()}/stream/${streamerId}.flv?token=${getToken()}`,
      });
      player_A.attachMediaElement(videoRef_A.current);
      player_A.load();
      player_A.on("error", () => {
        history.push("/app");
      });

      const video_A: HTMLVideoElement = videoRef_A.current;
      video_A.onplaying = () => {
        setImmediate(() => {
          setShow("A");
        });
        let timeCounter = 0;
        const timer = setInterval(() => {
          if (timeCounter >= 60 && timeCounter >= video_A.currentTime) {
            setLoad_B(true);
            setLoad_A(false);
            clearInterval(timer);
          }
          timeCounter++;
        }, 1000);
      };

      return () => {
        player_A.unload();
      };
    }
  }, [streamerId, load_A, history]);

  useEffect(() => {
    if (load_B) {
      const player_B = flv.createPlayer({
        type: "flv",
        url: `${getAPI()}/stream/${streamerId}.flv?token=${getToken()}`,
      });
      player_B.attachMediaElement(videoRef_B.current);
      player_B.load();
      player_B.on("error", () => {
        history.push("/app");
      });

      const video_B: HTMLVideoElement = videoRef_B.current;
      video_B.onplaying = () => {
        setImmediate(() => {
          setShow("B");
        });
        let timeCounter = 0;
        const timer = setInterval(() => {
          if (timeCounter >= 60 && timeCounter >= video_B.currentTime) {
            setLoad_A(true);
            setLoad_B(false);
            clearInterval(timer);
          }
          timeCounter++;
        }, 1000);
      };

      return () => {
        player_B.unload();
      };
    }
  }, [streamerId, load_B, history]);

  return (
    <>
      {
        <video
          hidden={show !== "A"}
          ref={videoRef_A}
          style={{
            width: "100vw",
            height: "100vh",
            background: "black",
          }}
          controls={false}
          autoPlay={true}
        />
      }
      {
        <video
          hidden={show !== "B"}
          ref={videoRef_B}
          style={{
            width: "100vw",
            height: "100vh",
            background: "black",
          }}
          controls={false}
          autoPlay={true}
        />
      }
    </>
  );
};
