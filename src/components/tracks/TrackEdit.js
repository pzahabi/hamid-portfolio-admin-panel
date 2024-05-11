import React, { useRef } from "react";

export const TrackEdit = ({ products, save, product, isUploading }) => {
  const idRef = useRef();
  const titleRef = useRef();
  const persianTitleRef = useRef();
  const artistRef = useRef();
  const persianArtistRef = useRef();
  const producerRef = useRef();
  const persianProducerRef = useRef();
  const imageRef = useRef();
  const audioRef = useRef();

  React.useEffect(() => {
    idRef.current.value = product._id;
    titleRef.current.value = product.title;
    persianTitleRef.current.value = product.persianTitle;
    artistRef.current.value = product.artist;
    persianArtistRef.current.value = product.persianArtist;
    producerRef.current.value = product.producer;
    persianProducerRef.current.value = product.persianProducer;
  }, [product]);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("persianTitle", persianTitleRef.current.value);
    formData.append("artist", artistRef.current.value);
    formData.append("persianArtist", persianArtistRef.current.value);
    formData.append("producer", producerRef.current.value);
    formData.append("persianProducer", persianProducerRef.current.value);

    // Append the image and audio files to FormData
    formData.append("image", imageRef.current.files[0]);
    formData.append("audio", audioRef.current.files[0]);

    const id = idRef.current.value;

    await save(formData, id);

    idRef.current.value = "";
    titleRef.current.value = "";
    persianTitleRef.current.value = "";
    artistRef.current.value = "";
    persianArtistRef.current.value = "";
    producerRef.current.value = "";
    persianProducerRef.current.value = "";
    imageRef.current.value = null;
    audioRef.current.value = null;
  };
  return (
    <>
      <form>
        <input type="hidden" name="id" ref={idRef} />
        <div className="m-2">
          <label htmlFor="title" className="form-label">
            title:
          </label>
          <input
            name="title"
            className="form-control"
            ref={titleRef}
            type="text"
          />
        </div>
        <div className="m-2">
          <label htmlFor="persianTitle" className="form-label">
            عنوان:
          </label>
          <input
            name="persianTitle"
            className="form-control"
            ref={persianTitleRef}
            type="text"
          />
        </div>
        <div className="m-2">
          <label htmlFor="artist" className="form-label">
            artist:
          </label>
          <input
            name="artist"
            className="form-control"
            ref={artistRef}
            type="text"
          />
        </div>
        <div className="m-2">
          <label htmlFor="persianArtist" className="form-label">
            آرتیست:
          </label>
          <input
            name="persianArtist"
            className="form-control"
            ref={persianArtistRef}
            type="text"
          />
        </div>
        <div className="m-2">
          <label htmlFor="producer" className="form-label">
            producer:
          </label>
          <input
            name="producer"
            className="form-control"
            ref={producerRef}
            type="text"
          />
        </div>
        <div className="m-2">
          <label htmlFor="persianProducer" className="form-label">
            آهنگ ساز:{" "}
          </label>
          <input
            name="persianProducer"
            className="form-control"
            ref={persianProducerRef}
            type="text"
          />
        </div>
        <div className="m-2">
          <label htmlFor="image" className="form-label">
            تصویر:{" "}
          </label>
          <input
            name="image"
            className="form-control"
            ref={imageRef}
            type="file"
          />
        </div>
        <div className="m-2">
          <label htmlFor="آهنگ" className="form-label">
            آهنگ:{" "}
          </label>
          <input
            name="آهنگ"
            className="form-control"
            ref={audioRef}
            type="file"
          />
        </div>
        <div className="m-4 me-2">
          <button disabled={isUploading ? true : false} className="btn btn-primary" onClick={(e) => submit(e)}>
            ذخیره
          </button>
        </div>
      </form>
    </>
  );
};
