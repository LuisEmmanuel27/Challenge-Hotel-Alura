package com.luis.hotel.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.luis.hotel.factory.ConnectionFactory;
import com.luis.hotel.modelo.Usuario;

public class UsuarioDao {

    private ConnectionFactory connectionFactory;

    public UsuarioDao(ConnectionFactory connectionFactory) {
        this.connectionFactory = connectionFactory;
    }

    public Usuario buscarUsuario(String nombreUsuario, String contrasenaUsuario) throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();
        String sqlStatement = "SELECT id, name, password FROM usuario WHERE name = ? AND password = ? AND is_active = 1";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sqlStatement);
            preparedStatement.setString(1, nombreUsuario);
            preparedStatement.setString(2, contrasenaUsuario);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                String contrasenaAlmacenada = resultSet.getString("password");

                if (contrasenaUsuario.equals(contrasenaAlmacenada)) {
                    Usuario usuario = new Usuario();
                    usuario.setId(resultSet.getInt("id"));
                    usuario.setName(resultSet.getString("name"));
                    usuario.setPassword(resultSet.getString("password"));

                    return usuario;

                } else {
                    throw new SQLException("La contraseña no coincide");
                }
            } else {
                return null; // Usuario no encontrado en la base de datos
            }
        } catch (Exception e) {
            throw new SQLException("El usuario no fue encontrado" + e.getMessage());
        } finally {
            connection.close();
        }
    }

}
