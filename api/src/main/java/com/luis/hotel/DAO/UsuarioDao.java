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

    /**
     * Busca un usuario en la base de datos por nombre de usuario y contraseña.
     *
     * @param nombreUsuario     El nombre de usuario a buscar.
     * @param contrasenaUsuario La contraseña del usuario.
     * @return El objeto Usuario si se encuentra y la contraseña coincide, o null si
     *         no se encuentra.
     * @throws SQLException Si ocurre un error durante la búsqueda o la
     *                      autenticación.
     */
    public Usuario buscarUsuario(String nombreUsuario, String contrasenaUsuario) throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();
        String sqlStatement = "SELECT id, name, password FROM usuario WHERE name = ?";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sqlStatement);
            preparedStatement.setString(1, nombreUsuario);

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
