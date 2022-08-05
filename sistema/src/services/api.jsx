import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch() {

  const [data, setData] = useState(null)

  useEffect(() =>{

    axios.get('http://localhost:5000/agendamentos/62eb18c8cacd8eb583555c1a')
    .then(response => {
      setData(response.data);
      console.log("sucess")
    })

}, [])

return {data}






}
