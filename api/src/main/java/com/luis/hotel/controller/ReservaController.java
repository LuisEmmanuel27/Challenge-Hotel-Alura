package com.luis.hotel.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luis.hotel.DAO.ReservaDao;
import com.luis.hotel.factory.ConnectionFactory;
import com.luis.hotel.modelo.Reserva;

import spark.Spark;

public class ReservaController {

    public ReservaController(ConnectionFactory connectionFactory) {
        ReservaDao reservaDao = new ReservaDao(connectionFactory);

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
    }

}