import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";
import { UseForcast } from "../../context/ForcastProvider";
import style from "./Page2.module.css";

function Page2() {
  const [copied, setcopied] = useState(false);
  const clipboard = useClipboard();
  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get("url");
  const copylink = () => {
    clipboard.copy(url);
    setcopied(true);
  };
  return (
    <>
      {url && (
        <div className={style.main}>
          <h1>meme creator</h1>
          <button onClick={() => history.push("/")} className={style.btn}>
            Make More Memes
          </button>
          <button onClick={copylink} className={style.btn}>
            {copied ? "link copied!" : "copy link!"}
          </button>
          <div className={style.image}>
            <img src={url} alt="" />
          </div>
        </div>
      )}
      {!url && (
        <div className={style.main}>
          <button onClick={() => history.push("/")} className={style.btn}>
            Make More Memes
          </button>
        </div>
      )}
    </>
  );
}

export default Page2;
