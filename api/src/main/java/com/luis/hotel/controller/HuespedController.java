package com.luis.hotel.controller;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luis.hotel.DAO.HuespedDao;
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
    }

}
