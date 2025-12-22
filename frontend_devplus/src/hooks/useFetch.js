// src/hooks/useFetch.js
import { useState, useEffect } from "react";
import apiClient from "../services/apiClient"; 

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get(url) 
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi fetch:", err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}