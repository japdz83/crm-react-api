import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object({
        nombre: Yup.string()
            .required("El Nombre del Cliente es requerido")
            .min(3, "El Nombre del Cliente debe tener al menos 3 caracteres")
            .max(
                20,
                "El Nombre del Cliente debe tener como máximo 20 caracteres"
            ),
        empresa: Yup.string().required("La Nombre de la Empresa es requerida"),
        email: Yup.string()
            .required("El Email es requerido")
            .email("El Email no es válido"),
        telefono: Yup.number()
            .required("El Teléfono es requerido")
            .positive("No es un número valido")
            .integer("No es un número valido")
            .typeError("El número valido"),
    });
    const handleSubmit = async (valores) => {
        try {
            let respuesta;
            if (cliente.id) {
                // Editando un Registro
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else {
                // Nuevo Registro
                const url = "http://localhost:4000/clientes";
                respuesta = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
            await respuesta.json();
            navigate("/clientes");
        } catch (error) {
            console.log(error);
        }
    };
    return cargando ? (
        <Spinner />
    ) : (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 text-xl font-bold uppercase text-center">
                {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
            </h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? "",
                }}
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values);
                    resetForm();
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => (
                    <Form className="mt-10">
                        <div className="mb-4">
                            <label
                                htmlFor="nombre"
                                className="text-gray-800 text-sm font-bold"
                            >
                                Nombre Cliente:
                            </label>
                            <Field
                                id="nombre"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100 "
                                placeholder="Nombre del Cliente"
                                name="nombre"
                            />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="empresa"
                                className="text-gray-800 text-sm font-bold"
                            >
                                Empresa Cliente:
                            </label>
                            <Field
                                id="empresa"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100 "
                                placeholder="Empresa del Cliente"
                                name="empresa"
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="text-gray-800 text-sm font-bold"
                            >
                                Email Cliente:
                            </label>
                            <Field
                                id="email"
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-100 "
                                placeholder="Email del Cliente"
                                name="email"
                            />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="telefono"
                                className="text-gray-800 text-sm font-bold"
                            >
                                Teléfono del Cliente
                            </label>
                            <Field
                                id="telefono"
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-100 "
                                placeholder="Teléfono del Cliente"
                                name="telefono"
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="notas"
                                className="text-gray-800 text-sm font-bold"
                            >
                                Nombre Cliente
                            </label>
                            <Field
                                id="notas"
                                as="textarea"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100 h-40"
                                placeholder="Notas del Cliente"
                                name="notas"
                            />
                        </div>

                        <input
                            type="submit"
                            value={
                                cliente?.nombre
                                    ? "Editar Cliente"
                                    : "Agregar Cliente"
                            }
                            className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

Formulario.defaultProps = {
    cliente: {},
    cargando: false,
};

export default Formulario;
