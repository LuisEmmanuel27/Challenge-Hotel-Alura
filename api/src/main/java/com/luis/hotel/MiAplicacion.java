package com.luis.hotel;

import com.luis.hotel.controller.HuespedController;
import com.luis.hotel.controller.ReservaController;
import com.luis.hotel.controller.UsuarioController;
import com.luis.hotel.factory.ConnectionFactory;
import static spark.Spark.*;
import spark.Filter;
import spark.Request;
import spark.Response;

public class MiAplicacion {
    public static void main(String[] args) {
        // Puerto en el que se ejecutará la aplicación
        port(8080);

        // Configura el manejo de CORS con spark-cors
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        // Habilita CORS en todas las rutas
        before(new Filter() {
            @Override
            public void handle(Request request, Response response) {
                response.header("Access-Control-Allow-Origin", "http://localhost:5173");
                response.header("Access-Control-Allow-Credentials", "true");
            }
        });

        // Conexión a la base de datos
        ConnectionFactory connectionFactory = new ConnectionFactory();

        // Instancia el UsuarioController
        new UsuarioController(connectionFactory);
        new ReservaController(connectionFactory);
        new HuespedController(connectionFactory);
    }
}
