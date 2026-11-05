
import { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Interfaz para los registros
interface Registro {
  id: string;
  numero: number;
  hora: string;
}

export default function App() {

  const [contador, setContador] = useState(0);

  const [registros, setRegistros] = useState<Registro[]>([]);

  // Funcion para incrementar el contador
  const incrementarContador = () => {

    const nuevoContador = contador + 1;

    const ahora = new Date();

    // Obtener la hora actual
    const horaFormateada = ahora.toLocaleTimeString('es-CO', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Actualizar el contador
    setContador(nuevoContador);

    // Crear el nuevo registro
    const nuevoRegistro: Registro = {
      id: Date.now().toString(),
      numero: nuevoContador,
      hora: horaFormateada
    };

    // Agregar el registro al inicio del historial
    setRegistros((anteriores) => [
      nuevoRegistro,
      ...anteriores
    ]);

  };

  // Funcion para reiniciar el contador
  const reiniciarContador = () => {

    setContador(0);

    // Limpiar el historial
    setRegistros([]);

  };

  return (

    <View style={estilos.body}>

      <View style={estilos.container}>

        {/* Titulo y descripcion */}

        <Text style={estilos.h1}>
          Interactividad con el DOM
        </Text>

        <Text style={estilos.description}>
          Haz clic en el botón para incrementar el contador y registrar la
          hora exacta del evento en la tabla.
        </Text>

        {/* Contador dinamico con cambio de color */}

        <Text
          style={[
            estilos.counterBox,
            contador > 10 && estilos.contadorAlto
          ]}
        >
          {contador}
        </Text>

        {/* Mensaje cuando supera los 10 likes */}

        {contador > 10 && (
          <Text style={estilos.mensajeAlto}>
            ¡Has superado los 10 likes!
          </Text>
        )}

        {/* Boton para incrementar */}

        <TouchableOpacity
          style={estilos.btnClick}
          onPress={incrementarContador}
          activeOpacity={0.8}
        >
          <Text style={estilos.btnText}>
            ¡Haz Clic Aquí!
          </Text>
        </TouchableOpacity>

        {/* Boton para reiniciar */}

        <TouchableOpacity
          style={estilos.btnReset}
          onPress={reiniciarContador}
          activeOpacity={0.8}
        >
          <Text style={estilos.btnText}>
            Reiniciar a cero
          </Text>
        </TouchableOpacity>

        {/* Tabla de registros */}

        <View style={estilos.tableContainer}>

          {/* Cabecera de la tabla */}

          <View style={estilos.tableHeader}>

            <Text style={[estilos.th, estilos.cellNumero]}>
              No Clic
            </Text>

            <Text style={[estilos.th, estilos.cellHora]}>
              Hora
            </Text>

          </View>

          {/* Cuerpo de la tabla */}

          <ScrollView style={estilos.tableBody}>

            {registros.map((item, index) => (

              <View
                key={item.id}
                style={[
                  estilos.tr,
                  index % 2 === 0 ? estilos.trEven : null
                ]}
              >

                <Text style={[estilos.td, estilos.cellNumero]}>
                  {item.numero}
                </Text>

                <Text style={[estilos.td, estilos.cellHora]}>
                  {item.hora}
                </Text>

              </View>

            ))}

            {/* Mensaje cuando no hay registros */}

            {registros.length === 0 && (

              <Text style={estilos.vacio}>
                Todavía no hay registros
              </Text>

            )}

          </ScrollView>

        </View>

      </View>

    </View>

  );

}


// ESTILOS DE LA APLICACION

const estilos = StyleSheet.create({

  body: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center'
  },

  h1: {
    color: '#2c3e50',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },

  description: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20
  },

  // Contador normal
  counterBox: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498db',
    marginVertical: 10
  },

  // Color del contador cuando supera los 10 likes
  contadorAlto: {
    color: '#e74c3c'
  },

  // Mensaje de alerta
  mensajeAlto: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12
  },

  // Boton de incrementar
  btnClick: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 10,
    width: '100%'
  },

  // Boton de reiniciar
  btnReset: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 20,
    width: '100%'
  },

  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  tableContainer: {
    width: '100%',
    maxHeight: 220,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden'
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },

  tableBody: {
    maxHeight: 170
  },

  tr: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff'
  },

  trEven: {
    backgroundColor: '#fafafa'
  },

  th: {
    color: '#7f8c8d',
    fontWeight: '600',
    fontSize: 14,
    padding: 10,
    textAlign: 'center'
  },

  td: {
    color: '#333',
    fontSize: 14,
    padding: 10,
    textAlign: 'center'
  },

  cellNumero: {
    flex: 1
  },

  cellHora: {
    flex: 1.5
  },

  vacio: {
    textAlign: 'center',
    color: '#888',
    padding: 15
  }

});
