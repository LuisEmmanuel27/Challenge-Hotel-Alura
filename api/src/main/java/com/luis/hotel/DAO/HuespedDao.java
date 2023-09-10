package com.luis.hotel.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.luis.hotel.factory.ConnectionFactory;
import com.luis.hotel.modelo.Huesped;

public class HuespedDao {

    private ConnectionFactory connectionFactory;

    public HuespedDao(ConnectionFactory connectionFactory) {
        this.connectionFactory = connectionFactory;
    }

    public void agregarHuesped(Huesped huesped) throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();

        String sql = "INSERT INTO huesped (nombre, apellido, fechaNacimiento, nacionalidad, telefono, idReserva) VALUES (?, ?, ?, ?, ?, ?)";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, huesped.getNombre());
            statement.setString(2, huesped.getApellido());
            statement.setDate(3, new java.sql.Date(huesped.getFechaNacimiento().getTime()));
            statement.setString(4, huesped.getNacionalidad());
            statement.setString(5, huesped.getTelefono());
            statement.setInt(6, huesped.getIdReserva());

            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("ups un error surgio: " + e);
        } finally {
            connection.close();
        }
    }

    public List<Huesped> listarHuespedes() throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();
        List<Huesped> huespedes = new ArrayList<>();

        String sql = "SELECT nombre, apellido, fechaNacimiento, nacionalidad, telefono, idReserva FROM huesped";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                String nombre = resultSet.getString("nombre");
                String apellido = resultSet.getString("apellido");
                java.sql.Date fechaNacimiento = resultSet.getDate("fechaNacimiento");
                String nacionalidad = resultSet.getString("nacionalidad");
                String telefono = resultSet.getString("telefono");
                Integer idReserva = resultSet.getInt("idReserva");

                Huesped huesped = new Huesped(nombre, apellido, fechaNacimiento, nacionalidad, telefono, idReserva);
                huespedes.add(huesped);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error al listar huespedes " + e);
        } finally {
            connection.close();
        }

        return huespedes;
    }

    public Huesped buscarHuespedPorReserva(Integer idReserva) throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();
        Huesped huesped = null; // Inicializamos a null, ya que puede que no se encuentre ningún huésped con esa
                                // reserva

        String sql = "SELECT nombre, apellido, fechaNacimiento, nacionalidad, telefono, idReserva FROM huesped WHERE idReserva = ?";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, idReserva); // Asignamos el valor del parámetro idReserva

            ResultSet resultSet = statement.executeQuery();

            // * No es necesario obtener idReserva ya que ya estamos filtrando por él
            if (resultSet.next()) {
                String nombre = resultSet.getString("nombre");
                String apellido = resultSet.getString("apellido");
                java.sql.Date fechaNacimiento = resultSet.getDate("fechaNacimiento");
                String nacionalidad = resultSet.getString("nacionalidad");
                String telefono = resultSet.getString("telefono");

                huesped = new Huesped(nombre, apellido, fechaNacimiento, nacionalidad, telefono, idReserva);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error al buscar huesped por ID de Reserva");
        } finally {
            connection.close();
        }

        return huesped;
    }

    public Huesped buscarPorApellido(String apellido) throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();
        Huesped huesped = null; // Inicializamos a null, ya que puede que no se encuentre ningún huésped con esa
                                // reserva

        String sql = "SELECT nombre, apellido, fechaNacimiento, nacionalidad, telefono, idReserva FROM huesped WHERE apellido = ?";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, apellido);

            ResultSet resultSet = statement.executeQuery();

            // * No es necesario obtener apellido ya que ya estamos filtrando por él
            if (resultSet.next()) {
                String nombre = resultSet.getString("nombre");
                java.sql.Date fechaNacimiento = resultSet.getDate("fechaNacimiento");
                String nacionalidad = resultSet.getString("nacionalidad");
                String telefono = resultSet.getString("telefono");
                Integer idReserva = resultSet.getInt("idReserva");

                huesped = new Huesped(nombre, apellido, fechaNacimiento, nacionalidad, telefono, idReserva);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error al buscar huesped por apellido");
        } finally {
            connection.close();
        }

        return huesped;
    }

    // @Override
    // public void actualizarHuesped(Huesped huesped) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method
    // 'actualizarHuesped'");
    // }

    // @Override
    // public void eliminarHuesped(Integer id) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method
    // 'eliminarHuesped'");
    // }
}
