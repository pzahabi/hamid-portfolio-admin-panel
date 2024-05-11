import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CoWorkerInfo } from "./CoWorkerInfo";
import { CoWorkerEdit } from "./CoWorkerEdit";

export const CoWorkers = () => {
  const baseApiUrl = process.env.REACT_APP_API_URL;
  const APIurl = `${baseApiUrl}/api/coworkers`;
  
  const emptyProduct = {
    _id: "",
    title: "",
    persianTitle: "",
    artist: "",
    persianArtist: "",
    description: "",
    persianDescription: "",
    image: null,
  };
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState(emptyProduct);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState("");

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    const baseApiUrl = process.env.REACT_APP_API_URL;
    const APIurl = `${baseApiUrl}/api/coworkers`;
    await axios
      .get(APIurl)
      .then((result) => setProducts(result.data))

      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const editCoWorker = (item) => {
    const temp = products.find((q) => q._id === item._id);
    setProduct(temp);
    setIsEditing(temp._id);
  };

  const save = async (item, id) => {
    setIsEditing("");
    setIsUploading(true);
    if (products.find((q) => q._id === id)) {
      await axios
        .put(`${APIurl}/${id}`, item, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem('token'),
          },
        })
        .catch((err) => {
          // return alert(err);
          console.log(err);
        }).finally(() => {
          setIsUploading(false);
        });
        fetchProducts();
    } else {
      await axios
        .post(APIurl, item, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem('token'),
          },
        })
        .catch((err) => {
          console.log(err);
        }).finally(() => {
          setIsUploading(false);
        });
        fetchProducts();
    }
  };

  const removeCoWorker = async (item) => {
    const product = products.find((q) => q._id === item._id);
    if (product) {
      Swal.fire({
        title: "مطمئنی می خوای اینو از دیتابیس حذف کنی؟",
        showCancelButton: true,
        confirmButtonText: "حذف",
        cancelButtonText: "لغو",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const apiUrl = `${baseApiUrl}/api/coworkers/${item._id}`;
          await axios
            .delete(apiUrl, {
              headers: {
                token: localStorage.getItem('token'),
              },
            }).then(() => {
              Swal.fire("حذف شد!", "", "success");
              fetchProducts();
            })
            .catch((err) => {
              return Swal.fire(`Changes are not saved. ${err}`, "", "info");
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  const cancel = (item) => {
    setIsEditing("");
    setProduct(emptyProduct);
  }

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts, APIurl]);

  return (
    <>
      <div className="container-fluid row">
        <div className="col-md-2"></div>
        <div className="col-md-10">
          <main className="container border border-dark rounded mt-4 mb-4">
            <div className="row bg-light rounded-top p-2">لیست همکاران</div>
            <div className="container row p-4">
              <section className="col-md-8">
                <CoWorkerInfo
                  products={products}
                  isLoading={isLoading}
                  editCoWorker={editCoWorker}
                  removeCoWorker={removeCoWorker}
                  isEditing={isEditing}
                  cancel={cancel}
                />
              </section>
              <section className="col-md-4">
                <CoWorkerEdit
                  products={products}
                  product={product}
                  save={save}
                  isUploading={isUploading}
                />
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
