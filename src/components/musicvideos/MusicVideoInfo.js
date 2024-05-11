import React from "react";
import { Loading } from "../loading/Loading";

export const MusicVideoInfo = ({
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
              className="card w-100 div-height p-2 mb-4 d-flex flex-row justify-content-between align-items-center"
              key={item._id}
            >
              <video
                src={`${baseApiUrl}/api/${item.video.replace(/\\/g, "/")}`}
                controls={true}
                className="h-50 rounded"
              />
              <div className="d-flex flex-column w-75">
                <div className="d-flex flex-row-reverse justify-content-between p-4">
                  <div>
                    <h4 className="text-start">{item.title}</h4>
                    <div className="text-start">{item.artist}</div>
                    <div className="text-start mb-2">{item.producer}</div>
                    { item._id === isEditing ? <button
                      onClick={() => cancel(item)}
                      className="btn btn-sm btn-outline-primary me-4 ms-1"
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
          ))
        )}
      </div>
    </>
  );
};
