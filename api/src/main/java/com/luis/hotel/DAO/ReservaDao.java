package com.luis.hotel.DAO;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.luis.hotel.factory.ConnectionFactory;
import com.luis.hotel.modelo.Reserva;

public class ReservaDao {

    private ConnectionFactory connectionFactory;

    public ReservaDao(ConnectionFactory connectionFactory) {
        this.connectionFactory = connectionFactory;
    }

    public Long agregarReserva(Reserva reserva) throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();

        String sql = "INSERT INTO reserva (fechaEntrada, fechaSalida, valor, formaPago) VALUES (?, ?, ?, ?)";

        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setDate(1, new java.sql.Date(reserva.getFechaEntrada().getTime()));
            statement.setDate(2, new java.sql.Date(reserva.getFechaSalida().getTime()));
            statement.setDouble(3, reserva.getValor());
            statement.setString(4, reserva.getFormaPago());

            statement.execute();

            // Obtén el ID generado por la base de datos
            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next()) {
                return generatedKeys.getLong(1);
            } else {
                throw new SQLException("No se pudo obtener el ID de la reserva creada.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("ups un error surgio: " + e);
            return null; // Puedes manejar el error de otra manera si lo deseas
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

    public Reserva buscarReservaPorId(Integer id) throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();
        Reserva reserva = null; // en caso de no encontrar nada

        String sql = "SELECT fechaEntrada, fechaSalida, valor, formaPago FROM reserva WHERE id = ?";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);

            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                java.sql.Date fechaEntrada = resultSet.getDate("fechaEntrada");
                java.sql.Date fechaSalida = resultSet.getDate("fechaSalida");
                double valor = resultSet.getDouble("valor");
                String formaPago = resultSet.getString("formaPago");

                reserva = new Reserva(id, fechaSalida, fechaEntrada, valor, formaPago);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error al buscar reserva por ID");
        } finally {
            connection.close();
        }

        return reserva;
    }

    public void actualizarReserva(Integer id, Map<String, Object> camposActualizados) throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();

        StringBuilder sql = new StringBuilder("UPDATE reserva SET ");
        List<Object> valores = new ArrayList<>();

        // Construir la consulta SQL dinámicamente
        for (String campo : camposActualizados.keySet()) {
            sql.append(campo).append(" = ?, ");
            valores.add(camposActualizados.get(campo));
        }

        // Eliminar la última coma y espacio en blanco
        sql.setLength(sql.length() - 2);

        sql.append(" WHERE id = ?");

        try (PreparedStatement statement = connection.prepareStatement(sql.toString())) {
            // Establecer valores de los campos actualizados
            for (int i = 0; i < valores.size(); i++) {
                statement.setObject(i + 1, valores.get(i));
            }
            // Establecer el ID de la reserva
            statement.setInt(valores.size() + 1, id);

            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error al actualizar reserva");
        } finally {
            connection.close();
        }
    }

    public void eliminarReserva(Integer idReserva) throws SQLException {
        Connection connection = connectionFactory.recuperaConexion();

        String sql = "DELETE FROM reserva WHERE id = ?";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, idReserva);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error al eliminar reserva");
        } finally {
            connection.close();
        }
    }
}
