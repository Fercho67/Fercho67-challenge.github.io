import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function UserList(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const firstLoad = useRef(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
           let data = []
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    data.push({id:doc.id, name: doc.data().full_name})
                  });
            if (data.length > 0) {
                setData( data);
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
        firstLoad.current = false
      }, []);


      if (loading) return <h2>Cargando...</h2>;

      if (!loading && !data) return <h2>No hay datos</h2>;

return (
    <div>
{data.map(item => {
    return <div className="field" key={item.id}><Link to={`/user/${item.id}`}>{item.name}</Link></div>
})}
    </div>
)
}

export default UserList