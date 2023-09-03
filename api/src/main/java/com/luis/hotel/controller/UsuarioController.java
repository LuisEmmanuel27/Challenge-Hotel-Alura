package com.luis.hotel.controller;

import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luis.hotel.DAO.UsuarioDao;
import com.luis.hotel.factory.ConnectionFactory;
import com.luis.hotel.modelo.Usuario;

import spark.Spark;

public class UsuarioController {

    public UsuarioController(ConnectionFactory connectionFactory) {
        UsuarioDao usuarioDao = new UsuarioDao(connectionFactory);

        // Ruta para el inicio de sesión
        Spark.post("/login", (request, response) -> {
            // Obtén los datos del formulario enviado por el frontend como una cadena JSON
            String requestBody = request.body();

            // Convierte la cadena JSON a un objeto Map
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, String> body = objectMapper.readValue(requestBody, new TypeReference<Map<String, String>>() {
            });

            String nombreUsuario = body.get("nombreUsuario");
            String contrasenaUsuario = body.get("contrasenaUsuario");

            System.out.println(nombreUsuario + ", " + contrasenaUsuario);

            // Intenta autenticar al usuario utilizando el UsuarioDao
            Usuario usuario = usuarioDao.buscarUsuario(nombreUsuario, contrasenaUsuario);

            System.out.println(usuario);

            if (usuario != null) {
                // El usuario se ha autenticado correctamente
                response.status(200);
                return usuario;
            } else {
                // El usuario no se ha autenticado
                response.status(401);
                return "Credenciales incorrectas";
            }
        });
    }

}
