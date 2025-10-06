// src/hooks/useProductos.js
import { useState, useEffect } from "react";
import { db } from "../config/firebase"; 
import {collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot} from "firebase/firestore";

export const useAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer preceptores en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "admins"), (snapshot) => {
      const adminsData = snapshot.docs.map((doc) => ({ //transforma cada documento en un objeto
        id: doc.id,
          ...doc.data(),
      }));
      setAdmins(adminsData);
      setLoading(false);
    });

    return () => unsubscribe(); // limpiar el listener
    }, []);

  // Agregar producto
  const agregarAdmin = async (nuevoAdmin) => {
    try {
      await addDoc(collection(db, "admins"), nuevoAdmin);
    } catch (error) {
      console.error("Error al agregar el admin:", error);
    }
  };

  // Eliminar producto
  const eliminarAdmin = async (id) => {
    try {
      await deleteDoc(doc(db, "admins", id));
    } catch (error) {
      console.error("Error al eliminar el admin:", error);
    }
  };

  // Editar producto
  const editarAdmin = async (id, datosActualizados) => {
    try {
      const preceptorRef = doc(db, "admins", id);
      await updateDoc(preceptorRef, datosActualizados);
    } catch (error) {
      console.error("Error al editar el admin:", error);
    }
  };

  return { admins, loading, agregarAdmin, eliminarAdmin, editarAdmin,};
};