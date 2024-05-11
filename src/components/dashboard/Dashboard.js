import React, { useState, useEffect } from "react";
import { Loading } from "../loading/Loading";
import axios from "axios";

export const Dashboard = () => {
  const [tracks, setTracks] = useState([]);
  const [musicVideos, setMusicVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);

    const baseApiUrl = process.env.REACT_APP_API_URL;
    const apiUrlForTracks = `${baseApiUrl}/api/tracks`;
    const apiUrlForMusicVideos = `${baseApiUrl}/api/musicvideos`;

    try {
      await axios
        .get(apiUrlForMusicVideos)
        .then((result) => setMusicVideos(result.data));

      await axios.get(apiUrlForTracks).then((result) => setTracks(result.data));
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <div className="container-fluid row">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <main className="container border border-dark rounded mt-4 mb-4 pb-4">
            <div className="row bg-light rounded-top p-2">داشبورد</div>
            <div className="container p-4">
              {isLoading ? (
                <Loading />
              ) : (
                <div className="col-md-12">
                  <span>آمار: </span>
                  <div className="d-flex flex-row justify-content-evenly mb-4">
                    <div className="card col-md-4 p-4 bg-primary text-white">
                      <h5>ترک ها</h5>
                      <div>تعداد: {tracks.length}</div>
                    </div>
                    <div className="card col-md-4 p-4 bg-success text-white">
                      <h5>موزیک ویدیو ها:</h5>
                      <div>تعداد: {musicVideos.length}</div>
                    </div>
                  </div>
                  <span className="">پیش نمایش:</span>
                  <div className="d-flex flex-row justify-content-evenly mt-4 mb-4">
                    <div className="card col-md-5 p-4 bg-light border border-dark">
                      <h5>ترک ها</h5>
                      {tracks.map((item) => (
                        <div key={item._id}>{item.title}</div>
                      ))}
                    </div>
                    <div className="card col-md-5 p-4 bg-light border border-dark">
                      <h5>موزیک ویدیو ها:</h5>
                      {musicVideos.map((item) => (
                        <div key={item._id}>{item.title}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
