import React from "react";
import { UseForcast } from "../../context/ForcastProvider";
import style from "./Page.module.css";

function Page() {
  const { memes, skip, index, input, setinput, submmitRequest } = UseForcast();
  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setinput(
      input.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };
  return (
    <>
      {memes.length ? (
        <section className={style.main}>
          <h1>meme creator</h1>
          <div className={style.container}>
            <div className={style.btnBox}>
              <button onClick={submmitRequest} className={style.btn}>
                generate
              </button>
              <button onClick={skip} className={style.btn}>
                skip
              </button>
            </div>
            <div className={style.inputBox}>
              {input.map((c, index) => (
                <input
                  required
                  onChange={(e) => updateCaption(e, index)}
                  key={index}
                  className={style.word}
                  placeholder="enter your caption"
                ></input>
              ))}
            </div>
            <div className={style.image}>
              <img src={memes[index].url} alt="" />
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}

export default Page;
