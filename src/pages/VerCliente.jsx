import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            setTimeout(() => {
                setCargando(!cargando);
            }, 2000);
        };
        obtenerClienteAPI();
    }, []);

    return cargando ? (
        <Spinner />
    ) : Object.keys(cliente).length === 0 ? (
        <p>No hay resultados...</p>
    ) : (
        <div className="shadow bg-white md:w-3/6 p-5">
            <h1 className="font-black text-4xl text-blue-900 ">
                Ver Cliente: {cliente.nombre}
            </h1>
            <p className="mt-3"> Información del cliente</p>
            <p className="text-4xl text-gray-600 mt-10">
                <span className="text-gray-800 uppercase font-bold">
                    CLiente:{" "}
                </span>
                {cliente.nombre}
            </p>
            <p className="text-2xl text-gray-600 mt-4">
                <span className="text-gray-800 uppercase font-bold">
                    Email:{" "}
                </span>
                {cliente.email}
            </p>
            <p className="text-2xl text-gray-600 mt-4">
                <span className="text-gray-800 uppercase font-bold">
                    Teléfono:{" "}
                </span>
                {cliente.telefono}
            </p>
            <p className="text-2xl text-gray-600 mt-4">
                <span className="text-gray-800 uppercase font-bold">
                    Empresa:{" "}
                </span>
                {cliente.empresa}
            </p>
            {cliente.notas && (
                <p className="text-2xl text-gray-600 mt-4">
                    <span className="text-gray-800 uppercase font-bold">
                        Nota:{" "}
                    </span>
                    {cliente.notas}
                </p>
            )}
        </div>
    );
};

export default VerCliente;
