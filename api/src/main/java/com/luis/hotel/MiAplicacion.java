package com.luis.hotel;

import com.luis.hotel.controller.HuespedController;
import com.luis.hotel.controller.ReservaController;
import com.luis.hotel.controller.UsuarioController;
import com.luis.hotel.factory.ConnectionFactory;
import com.luis.hotel.filter.CorsFilter;

import spark.Spark;

public class MiAplicacion {
    public static void main(String[] args) {
        // Puerto en el que se ejecutará la aplicación
        Spark.port(8080);

        // Agrega el filtro CorsFilter para configurar CORS
        Spark.before("/*", new CorsFilter());

        // Conexión a la base de datos (reemplaza esto con tu configuración real)
        ConnectionFactory connectionFactory = new ConnectionFactory();

        // Instancia el UsuarioController
        new UsuarioController(connectionFactory);
        new ReservaController(connectionFactory);
        new HuespedController(connectionFactory);
    }
}
