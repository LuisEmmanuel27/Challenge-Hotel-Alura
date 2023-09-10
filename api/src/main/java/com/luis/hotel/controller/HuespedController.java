package com.luis.hotel.controller;

import java.sql.SQLException;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luis.hotel.DAO.HuespedDao;
import com.luis.hotel.exception.ApellidoInvalidoException;
import com.luis.hotel.factory.ConnectionFactory;
import com.luis.hotel.modelo.Huesped;

import spark.Spark;

public class HuespedController {

    public HuespedController(ConnectionFactory connectionFactory) {
        HuespedDao huespedDao = new HuespedDao(connectionFactory);

        // * Agregar huespedes a la BDD */
        Spark.post("/huesped", (request, response) -> {
            try {
                Huesped nuevoHuesped = new ObjectMapper().readValue(request.body(), Huesped.class);
                huespedDao.agregarHuesped(nuevoHuesped);
                response.status(201);
                return "Huesped creado con exito";
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Error al crear huesped";
            }
        });

        // * Listar los huespedes de la BDD */
        Spark.get("huesped", (request, response) -> {
            try {
                List<Huesped> listaHuespedes = huespedDao.listarHuespedes();

                // Convierte la lista de huéspedes a formato JSON utilizando ObjectMapper
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonHuespedes = objectMapper.writeValueAsString(listaHuespedes);

                response.status(200);
                response.type("application/json");
                return jsonHuespedes;
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Error al obtener los huespedes";
            }
        });

        // * Buscar un huesped por idReserva */
        Spark.get("/huespedRe/:idReserva", (request, response) -> {
            try {
                Integer idReserva = Integer.parseInt(request.params(":idReserva"));
                Huesped huesped = huespedDao.buscarHuespedPorReserva(idReserva);

                if (huesped != null) {
                    response.status(200);
                    response.type("application/json"); // Establece el tipo de contenido como JSON
                    ObjectMapper objectMapper = new ObjectMapper();
                    String jsonHuesped = objectMapper.writeValueAsString(huesped);
                    return jsonHuesped; // Devuelve el huésped en formato JSON
                } else {
                    response.status(404);
                    return "Huesped no encontrado"; // Manejar el caso en el que no se encuentra el huésped
                }
            } catch (NumberFormatException e) {
                response.status(400);
                return "Número de reserva no válido";
            } catch (SQLException e) {
                e.printStackTrace();
                response.status(500);
                return "Error al buscar huesped por ID de Reserva"; // Manejar otros errores
            }
        });

        // * Buscar huesped por apellido */
        Spark.get("/huespedAp/:apellido", (request, response) -> {
            try {
                String apellido = request.params(":apellido");
                Huesped huesped = huespedDao.buscarPorApellido(apellido);

                if (huesped != null) {
                    response.status(200);
                    response.type("application/json"); // Establece el tipo de contenido como JSON
                    ObjectMapper objectMapper = new ObjectMapper();
                    String jsonHuesped = objectMapper.writeValueAsString(huesped);
                    return jsonHuesped; // Devuelve el huésped en formato JSON
                } else {
                    response.status(404);
                    return "Huesped no encontrado"; // Manejar el caso en el que no se encuentra el huésped
                }
            } catch (ApellidoInvalidoException e) {
                response.status(400);
                return e.getMessage();
            } catch (SQLException e) {
                e.printStackTrace();
                response.status(500);
                return "Error al buscar huesped por apellido"; // Manejar otros errores
            }
        });
    }

}
