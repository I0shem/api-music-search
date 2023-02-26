import React, { useEffect, useState } from "react";
import axios from "axios";
import clr from "./img/clear.png";
import s from "./Search.module.css";

const Search = () => {
  const [musicDB, setMusicDB] = useState([]);
  const [value, setValue] = useState("");
  const API_KEY = "OTMxMmMxMGEtNzllYi00Yjg4LWE5NmItNWI2MTdkOWMyNmMz";

  //https://api.napster.com/v2.2/search/verbose?apikey={API_KEY}&query=${value}

  const options = {
    method: "GET",
    url: `https://api.napster.com/v2.2/search/verbose?apikey=${API_KEY}&query=${value}`,
  };

  const getMusicDB = () => {
    if (value === "") {
    } else {
      axios(options).then((response) => {
        setMusicDB(response.data.search.data.tracks);
        console.log(musicDB);
      });
    }
  };

  const Clear = () => {
    setValue("");
    setMusicDB([]);
  };

  useEffect(
    () => {
      const timer = setTimeout(() => {
        getMusicDB();
      }, 1000);
      return () => clearTimeout(timer);
    },
    [options.url],
    []
  );

  return (
    <>
      <div>
        <form action="">
          <input
            className={s.SearchInput}
            type="text"
            placeholder="Search..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <img src={clr} alt="" className={s.ClearBtn} onClick={Clear} />
        </form>
        <div className={s.MusicData}>
          {musicDB.map((m) => {
            return (
              <div key={m.id} className={s.TrackBox}>
                <h3>"{m.name}"</h3>
                <h4> by {m.artistName}</h4>
                <img
                  className={s.AlbumImage}
                  src={
                    "https://api.napster.com/imageserver/v2/albums/" +
                    m.albumId +
                    "/images/500x500.jpg"
                  }
                  alt=""
                />
                <div className={s.AlbumName}>
                  <span>Album: {m.albumName}</span>
                </div>
                <div className={s.audioPlayer}>
                  <audio id="myAudio" src={m.previewURL} controls />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
