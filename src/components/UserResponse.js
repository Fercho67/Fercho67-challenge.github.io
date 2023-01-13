import { doc, getDoc } from "firebase/firestore/lite";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

function UserResponse() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const firstLoad = useRef(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const docRef = doc(db, "users", id);
      try {
        let userSnapshot = await getDoc(docRef);
        if (!userSnapshot.empty) {
          setData(userSnapshot.data());
          setLoading(false);
        } else {
          setData(null);
          setLoading(false);
        }
      } catch (e) {
        setData(null);
        setLoading(false);
      }
    };

    firstLoad.current && fetchData();
    firstLoad.current = false;
  }, [id]);

  console.log("data", data);

  if (loading)
    return (
      <div className="response">
        <div className="container">
          <article className="message is-info">
            <div className="message-header">
              Cargando...
            </div>
          </article>
        </div>
      </div>
    );
  if (!loading && !data)
    return (
      <div className="response">
        <div className="container">
          <article className="message is-info">
            <div className="message-header">Respuesta</div>
            
            <div className="message-body">No hay datos</div>
            
          </article>
        </div>
      </div>
    );
  return (
    <div className="response">
      <div className="container">
        <article className="message is-info">
        
          <div className="message-header">
            <p>Info</p>
            <div className="message-body">
              {Object.keys(data).map((item) => (
                <p className="label" key={item}>
                  {item}: {data[item]}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
export default UserResponse;
