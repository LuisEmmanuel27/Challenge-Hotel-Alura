package com.luis.hotel.controller;

import java.sql.SQLException;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luis.hotel.DAO.ReservaDao;
import com.luis.hotel.factory.ConnectionFactory;
import com.luis.hotel.modelo.Reserva;

import spark.Spark;

public class ReservaController {

    public ReservaController(ConnectionFactory connectionFactory) {
        ReservaDao reservaDao = new ReservaDao(connectionFactory);

        // * Agregar reservaciones a la BDD */
        Spark.post("/reserva", (request, response) -> {
            try {
                Reserva nuevaReserva = new ObjectMapper().readValue(request.body(),
                        Reserva.class);
                reservaDao.agregarReserva(nuevaReserva);
                response.status(201);
                return "Reserva creada con exito";
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Error al crear una reserva";
            }
        });

        // * Listar las reservaciones de la BDD */
        Spark.get("/reserva", (request, response) -> {
            try {
                List<Reserva> listaReservas = reservaDao.listarReservas();

                // Convierte la lista de huéspedes a formato JSON utilizando ObjectMapper
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonReservas = objectMapper.writeValueAsString(listaReservas);

                response.status(200);
                response.type("application/json");
                return jsonReservas;

            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return "Error al obtener las reservas";
            }
        });

        // * Buscar reserva por id */
        Spark.get("/reserva/:id", (request, response) -> {
            try {
                Integer id = Integer.parseInt(request.params(":id"));
                Reserva reserva = reservaDao.buscarReservaPorId(id);

                if (reserva != null) {
                    response.status(200);
                    response.type("application/json"); // Establece el tipo de contenido como JSON
                    ObjectMapper objectMapper = new ObjectMapper();
                    String jsonReserva = objectMapper.writeValueAsString(reserva);
                    return jsonReserva;
                } else {
                    response.status(404);
                    return "Reserva no encontrada";
                }
            } catch (NumberFormatException e) {
                response.status(400);
                return "Número de reserva no válido";
            } catch (SQLException e) {
                e.printStackTrace();
                response.status(500);
                return "Error al buscar ID de reserva"; // Manejar otros errores
            }
        });
    }

}