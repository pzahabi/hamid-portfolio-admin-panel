import React from "react";
import { Loading } from "../loading/Loading";

export const TrackInfo = ({
  products,
  isLoading,
  isEditing,
  editTrack,
  removeTrack,
  cancel
}) => {
  const baseApiUrl = process.env.REACT_APP_API_URL;

  return (
    <>
      <div className="container d-flex flex-column justify-content-between align-items-start mb-2">
        {isLoading ? (
          <Loading />
        ) : (
          products.map((item) => (
            <div
              className="card div-height p-2 mb-4"
              key={item._id}
            >
              <div className=" d-flex flex-row justify-content-between align-items-center">
                <img
                  src={`${baseApiUrl}/api/${item.image.replace(/\\/g, "/")}`}
                  alt={item.title}
                  className="w-25 h-50 ms-3 rounded"
                />
                <div className="d-flex flex-column w-75">
                  <div className="d-flex flex-row-reverse justify-content-between p-4">
                    <div>
                      <h4 className="text-start">{item.title}</h4>
                      <div className="text-start">{item.artist}</div>
                      <div className="text-start mb-2">{item.producer}</div>
                      { item._id === isEditing ? <button
                        onClick={() => cancel(item)}
                        className="btn btn-sm btn-outline-primary ms-1"
                      >
                        لغو
                      </button> : null}
                    </div>
                    <div>
                      <h4>{item.persianTitle}</h4>
                      <div>{item.persianArtist}</div>
                      <div className="mb-2">{item.persianProducer}</div>
                      <button
                        onClick={() => removeTrack(item)}
                        className="btn btn-sm btn-outline-primary ms-1"
                      >
                        حذف
                      </button>
                      <button
                        onClick={() => editTrack(item)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        تغییر
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                <audio
                  src={`${baseApiUrl}/api/${item.audio.replace(/\\/g, "/")}`}
                  controls={true}
                />
            </div>
          ))
        )}
      </div>
    </>
  );
};
