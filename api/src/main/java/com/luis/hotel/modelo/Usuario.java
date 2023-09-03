package com.luis.hotel.modelo;

public class Usuario {

    private Integer id;
    private String name;
    private String password;

    /**
     * Constructor por defecto de la clase Usuario.
     */
    public Usuario() {
    }

    /**
     * Constructor de la clase Usuario con todos los atributos.
     *
     * @param id       El identificador único del usuario.
     * @param name     El nombre de usuario.
     * @param password La contraseña del usuario.
     */
    public Usuario(Integer id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    /**
     * Obtiene el identificador único del usuario.
     *
     * @return El identificador único del usuario.
     */
    public Integer getId() {
        return id;
    }

    /**
     * Establece el identificador único del usuario.
     *
     * @param id El identificador único del usuario.
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Obtiene el nombre de usuario.
     *
     * @return El nombre de usuario.
     */
    public String getName() {
        return name;
    }

    /**
     * Establece el nombre de usuario.
     *
     * @param name El nombre de usuario.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Obtiene la contraseña del usuario.
     *
     * @return La contraseña del usuario.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Establece la contraseña del usuario.
     *
     * @param password La contraseña del usuario.
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
