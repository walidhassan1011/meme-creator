import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Page2 from "../components/Page2/Page2";
const Forcast = createContext();

function ForcastProvider({ children }) {
  const history = useHistory();
  const [memes, setmemes] = useState([]);
  const [index, setindex] = useState(0);
  const [input, setinput] = useState([]);

  const FetchData = async () => {
    const { data } = await axios.get("https://api.imgflip.com/get_memes");

    const _memes = data.data.memes;

    shuffleMemes(_memes);
    setmemes(_memes);
  };
  useEffect(() => {
    if (memes.length) {
      setinput(Array(memes[index].box_count).fill(""));
    }
  }, [index, memes]);

  useEffect(() => {
    FetchData();
  }, []);

  const skip = () => {
    setindex((index) => index + 1);
  };
  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  const submmitRequest = () => {
    const currentMeme = memes[index];
    const formData = new FormData();
    formData.append("username", "walidhassan");
    formData.append("password", "walidhassan1011");
    formData.append("template_id", currentMeme.id);
    input.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));
    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((res) => {
        history.push(`/generated?url=${res.data.url}`);
      });
    });
  };
  return (
    <Forcast.Provider
      value={{ memes, submmitRequest, skip, index, input, setinput }}
    >
      {children}
    </Forcast.Provider>
  );
}
export function UseForcast() {
  return useContext(Forcast);
}

export default ForcastProvider;
