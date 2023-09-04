package com.luis.hotel.filter;

import spark.Filter;
import spark.Request;
import spark.Response;

public class CorsFilter implements Filter {

    @Override
    public void handle(Request request, Response response) {
        // Configura los encabezados CORS para permitir solicitudes desde tu aplicación
        // React
        response.header("Access-Control-Allow-Origin", "http://localhost:5173");
        response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.header("Access-Control-Allow-Credentials", "true");
    }

}
