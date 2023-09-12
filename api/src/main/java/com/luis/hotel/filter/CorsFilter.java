package com.luis.hotel.filter;

import spark.Filter;
import spark.Request;
import spark.Response;

public class CorsFilter implements Filter {

    @Override
    public void handle(Request request, Response response) {
        String requestMethod = request.requestMethod();
        String requestPath = request.pathInfo();

        // Configura los encabezados CORS para permitir solicitudes desde tu aplicación
        // React
        // Solo para las solicitudes OPTIONS en la ruta de actualización de huéspedes
        if ("OPTIONS".equalsIgnoreCase(requestMethod) && requestPath.startsWith("/huesped/actualizar/")) {
            response.header("Access-Control-Allow-Origin", "http://localhost:5173");
            response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
            response.header("Access-Control-Allow-Credentials", "true");
        }
    }

}
