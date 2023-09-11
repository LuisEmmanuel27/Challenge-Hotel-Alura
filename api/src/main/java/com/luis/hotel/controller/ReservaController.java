package com.luis.hotel.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
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
                Reserva nuevaReserva = new ObjectMapper().readValue(request.body(), Reserva.class);
                Long reservaId = reservaDao.agregarReserva(nuevaReserva);

                if (reservaId != null) {
                    response.status(201);
                    response.header("Location", "/reserva/" + reservaId); // Opcional: Puedes agregar una cabecera
                                                                          // "Location" con la URL de la nueva reserva
                    return "Reserva creada con éxito. ID: " + reservaId;
                } else {
                    response.status(500);
                    return "Error al crear una reserva";
                }
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

        // *Actualizar datos de la reserva */
        Spark.put("/reservaAct/:id", (request, response) -> {
            try {
                Integer id = Integer.parseInt(request.params(":id"));
                Map<String, Object> camposActualizados = new ObjectMapper().readValue(request.body(),
                        new TypeReference<Map<String, Object>>() {
                        });

                if (camposActualizados.isEmpty()) {
                    response.status(400);
                    return "Datos de reserva no válidos";
                }

                // Llama al método del DAO para actualizar el huésped con los campos
                // proporcionados
                reservaDao.actualizarReserva(id, camposActualizados);

                response.status(200);
                return "Reserva actualizada con éxito";
            } catch (NumberFormatException e) {
                response.status(400);
                return "Número de ID no válido";
            } catch (IOException e) {
                response.status(400);
                return "Datos de reserva no válidos";
            } catch (SQLException e) {
                e.printStackTrace();
                response.status(500);
                return "Error al actualizar la reservación";
            }
        });

        // * Eliminar reserva por ID */
        Spark.delete("/reservaEl/:id", (request, response) -> {
            try {
                Integer idReserva = Integer.parseInt(request.params(":id"));

                // Llama a la función del DAO para eliminar la reserva
                reservaDao.eliminarReserva(idReserva);

                response.status(200);
                return "Reserva eliminada con éxito";
            } catch (NumberFormatException e) {
                response.status(400);
                return "Número de ID de reserva no válido";
            } catch (SQLException e) {
                e.printStackTrace();
                response.status(500);
                return "Error al eliminar la reserva";
            }
        });

    }

}