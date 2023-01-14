import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function UserList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const firstLoad = useRef(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let data = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, name: doc.data().full_name });
        });
        if (data.length > 0) {
          setData(data);
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
  }, []);

  if (loading)
    return (
      <div className="response">
        <div className="container">
          <article className="message is-info">
            <div className="message-header">Cargando...</div>
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
    <div>
      <div className="response">
        <div className="container">
          <article className="message is-info">
            <div className="message-header">Datos de usuarios</div>
            {data.map((item) => {
              return (
                <div key={item.id}>
                  <Link className="label" to={`/user/${item.id}`}>
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </article>
        </div>
      </div>
    </div>
  );
}

export default UserList;
