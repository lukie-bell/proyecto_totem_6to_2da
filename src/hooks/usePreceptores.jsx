// src/hooks/useProductos.js
import { useState, useEffect } from "react";
import { db } from "../config/firebase"; 
import {collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot} from "firebase/firestore";

export const usePreceptores = () => {
  const [preceptores, setPreceptores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer preceptores en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "preceptores"), (snapshot) => {
      const preceptoresData = snapshot.docs.map((doc) => ({ //transforma cada documento en un objeto
        id: doc.id,
          ...doc.data(),
      }));
      setPreceptores(preceptoresData);
      setLoading(false);
    });

    return () => unsubscribe(); // limpiar el listener
    }, []);

  // Agregar producto
  const agregarPreceptor = async (nuevoPreceptor) => {
    try {
      await addDoc(collection(db, "preceptores"), nuevoPreceptor);
    } catch (error) {
      console.error("Error al agrergar el preceptor:", error);
    }
  };

  // Eliminar producto
  const eliminarPreceptor = async (id) => {
    try {
      await deleteDoc(doc(db, "preceptores", id));
    } catch (error) {
      console.error("Error al eliminar el preceptor:", error);
    }
  };

  // Editar producto
  const editarPreceptor = async (id, datosActualizados) => {
    try {
      const preceptorRef = doc(db, "preceptores", id);
      await updateDoc(preceptorRef, datosActualizados);
    } catch (error) {
      console.error("Error al editar el preceptor:", error);
    }
  };

  return { preceptores, loading, agregarPreceptor, eliminarPreceptor, editarPreceptor,};
};