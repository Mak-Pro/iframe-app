"use client";
import { useEffect, useRef, useState } from "react";

export const IframeGET = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeMessage, setIframeMessage] = useState<string>("");
  const [iframeCounter, setIframeCounter] = useState<number>(0);

  function submitScore(score: number) {
    console.log("APP", score);
    setIframeCounter((prev) => prev + score);
    // console.log(`Score submitted: ${score}`);
    // Add backend integration logic here if needed
  }

  function getTelegramUserName() {
    // Getching Telegram username from an API or other source
    const username = "TelegramUser123"; // Example username
    return username;
  }

  useEffect(() => {
    // const handleDataFromIframe = (event: MessageEvent) => {
    //   if (event.origin !== "https://localhost:3001") {
    //     console.warn(
    //       "Получено сообщение от неизвестного источника:",
    //       event.origin
    //     );
    //     return;
    //   }

    //   const { type, payload } = event.data;

    //   if (type === "telegramUsername") {
    //     iframeRef.current?.contentWindow?.postMessage(
    //       "Mak Pro",
    //       "https://localhost:3001"
    //     );
    //   }
    // };

    // if (typeof window !== "undefined") {
    //   window.addEventListener("message", handleDataFromIframe);
    // }

    // const getDataFromIframe = (event: MessageEvent) => {
    //   const { type, payload } = event.data;
    //   console.log(event);
    // };

    // if (typeof window !== "undefined") {
    //   window.addEventListener("message", getDataFromIframe);
    // }

    // const handleMessage = (event: MessageEvent) => {
    //   if (event.origin !== "https://localhost:3001") {
    //     console.warn(
    //       "Получено сообщение от неизвестного источника:",
    //       event.origin
    //     );
    //     return;
    //   }

    //     if (event.data && event.data.message) {
    //       console.log("Данные от iframe:", event.data);
    //       setIframeCounter(event.data.counter);
    //       setIframeMessage(event.data.message);
    //     }
    // };

    // Посылаем функции в iframe
    if (typeof window !== "undefined") {
    }
    if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
      (
        iframeRef.current.contentWindow as Window & {
          submitScore: (score: number) => void;
        }
      ).submitScore = submitScore;

      (
        iframeRef.current.contentWindow as Window & {
          getTelegramUserName: () => string;
        }
      ).getTelegramUserName = getTelegramUserName;

      //   iframeRef.current.contentWindow?.postMessage(
      //     { type: "telegramUserName", payload: { functionName: "sendScore" } },
      //     "http://localhost:3001"
      //   );
    }

    // if (iframe && iframe.contentWindow) {
    //     // Expose the functions to the iframe
    //     iframe.contentWindow.submitScore = submitScore;
    //     iframe.contentWindow.getTelegramUserName = getTelegramUserName;
    // }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://localhost:3001") {
        console.warn(
          "Получено сообщение от неизвестного источника:",
          event.origin
        );
        return;
      }

      const { type } = event.data;

      if (type === "requestData") {
        console.log("Получен запрос на данные из iframe");
        // Отправляем ответ с данными в iframe
        iframeRef.current?.contentWindow?.postMessage(
          {
            type: "responseData",
            payload: { score: 100, message: "Привет из родителя!" },
          },
          "https://localhost:3001"
        );
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  //   const sendDataToIframe = ({
  //     type,
  //     payload,
  //   }: {
  //     type: string;
  //     payload: any;
  //   }) => {
  //     if (iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
  //       iframeRef.current.contentWindow.postMessage(
  //         { type, payload },
  //         "https://localhost:3001"
  //       );
  //     }
  //   };

  //   sendDataToIframe({ type: "telegramUserName", payload: "Mak Pro" });

  return (
    <div style={{ padding: 30, background: "#ccc" }}>
      {/* <h1>APP (https://localhost:3000)</h1> */}

      <h1>IFRAME COUNTER: {iframeCounter}</h1>
      <hr />
      {/* <p>Message received from IFRAME: {iframeMessage}</p> */}
      <br />
      <p>
        {/* Counter received from IFRAME: <strong>{iframeCounter}</strong> */}
      </p>
      <br />
      <br />
      <hr />
      <br />

      <h2>Display data from IFRAME (from sended functions):</h2>
      <br />
      <br />
      <hr />
      <br />
      <iframe
        ref={iframeRef}
        src="/games/shapes2048/index.html"
        width="600"
        height="400"
        title="Child App"
      />
    </div>
  );
};
