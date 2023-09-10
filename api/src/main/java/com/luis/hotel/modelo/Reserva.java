package com.luis.hotel.modelo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Reserva {

    @JsonIgnore
    private Integer id;
    private Date fechaEntrada;
    private Date fechaSalida;
    private double valor;
    private String formaPago;

    public Reserva(Integer id, Date fechaEntrada, Date fechaSalida, double valor, String formaPago) {
        this.id = id;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.valor = valor;
        this.formaPago = formaPago;
    }

    @JsonCreator
    public Reserva(@JsonProperty("fechaEntrada") String fechaEntrada,
            @JsonProperty("fechaSalida") String fechaSalida,
            @JsonProperty("valor") double valor,
            @JsonProperty("formaPago") String formaPago) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            this.fechaEntrada = dateFormat.parse(fechaEntrada);
            this.fechaSalida = dateFormat.parse(fechaSalida);
        } catch (ParseException e) {
            e.printStackTrace();
            // Manejar el error de análisis de fecha aquí si es necesario
        }
        this.valor = valor;
        this.formaPago = formaPago;
    }

    public Reserva(java.sql.Date fechaSalida, java.sql.Date fechaEntrada, double valor, String formaPago) {
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.valor = valor;
        this.formaPago = formaPago;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(Date fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public Date getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(Date fehcaSalida) {
        this.fechaSalida = fehcaSalida;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public String getFormaPago() {
        return formaPago;
    }

    public void setFormaPago(String formaPago) {
        this.formaPago = formaPago;
    }

}
