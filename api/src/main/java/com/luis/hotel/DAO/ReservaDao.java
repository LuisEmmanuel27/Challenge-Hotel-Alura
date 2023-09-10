package com.luis.hotel.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.luis.hotel.factory.ConnectionFactory;
import com.luis.hotel.modelo.Reserva;

public class ReservaDao {

    private ConnectionFactory connectionFactory;

    public ReservaDao(ConnectionFactory connectionFactory) {
        this.connectionFactory = connectionFactory;
    }

    public Boolean agregarReserva(Reserva reserva) throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();

        String sqlStatement = "INSERT INTO reserva (fechaEntrada, fechaSalida, valor, formaPago) VALUES (?, ?, ?, ?)";

        try {
            PreparedStatement statement = connection.prepareStatement(sqlStatement);
            statement.setDate(1, new java.sql.Date(reserva.getFechaEntrada().getTime()));
            statement.setDate(2, new java.sql.Date(reserva.getFechaSalida().getTime()));
            statement.setDouble(3, reserva.getValor());
            statement.setString(4, reserva.getFormaPago());

            statement.execute();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("ups un error surgio: " + e);
            return false;
        } finally {
            connection.close();
        }
    }

    public List<Reserva> listarReservas() throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();
        List<Reserva> reservas = new ArrayList<>();

        String sql = "SELECT fechaEntrada, fechaSalida, valor, formaPago FROM reserva";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                java.sql.Date fechaEntrada = resultSet.getDate("fechaEntrada");
                java.sql.Date fechaSalida = resultSet.getDate("fechaSalida");
                double valor = resultSet.getDouble("valor");
                String formaPago = resultSet.getString("formaPago"); // Corrección aquí

                Reserva reserva = new Reserva(fechaSalida, fechaEntrada, valor, formaPago);
                reservas.add(reserva);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error al listar reservas");
        } finally {
            connection.close();
        }

        return reservas;
    }

    // @Override
    // public Reserva buscarReservaPorId(Integer id) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method
    // 'buscarReservaPorId'");
    // }

    // @Override
    // public void actualizarReserva(Reserva reserva) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method
    // 'actualizarReserva'");
    // }

    // @Override
    // public void eliminarReserva(String id) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method
    // 'eliminarReserva'");
    // }

}
