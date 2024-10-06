import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';

interface CardDiagnoseProps {
  weather: string;
  ubicacion: string;
  temperatura: string;
}

export default function CardDiagnose() {
  const [weather, setWeather] = useState('Cargando...');
  const [ubicacion, setUbicacion] = useState('Cargando ubicación...');
  const [temperatura, setTemperatura] = useState('...');
  const [humedad, setHumedad] = useState('...');
  const [presion, setPresion] = useState('...');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [date, setDate] = useState('');

  var clima = '';

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      // Pedir permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setUbicacion('Permisos de ubicación no otorgados');
        return;
      }

      // Obtener la ubicación del usuario
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Llamar a la API de OpenWeatherMap
      await fetchWeather(latitude, longitude);
    };

    fetchLocationAndWeather();
    // Establecer la fecha actual
    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate);
  }, []);

  const fetchWeather = async (latitude: number, longitude: number) => {
    const API_KEY = '8bee55821bd05d76af13b501801e9755';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Actualizar la ubicación, clima y temperatura
      setUbicacion(`${data.name}, ${data.sys.country}`);
      setWeather(data.weather[0].main);
      setTemperatura(`${data.main.temp}°C`);
      setHumedad(`${data.main.humidity} %`);
      setPresion(`${data.main.pressure} hPa`);
    } catch (error) {
      console.log('Error al obtener datos del clima', error);
      setUbicacion('Error al obtener la ubicación');
    }
  };

  const handleMapPress = (e: any) => {
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  const confirmLocation = () => {
    if (selectedLocation) {
      fetchWeather(selectedLocation.latitude, selectedLocation.longitude);
    }
    setModalVisible(false);
  };

  // Función para obtener el ícono del clima según el estado
  const getWeatherIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'clear':
        clima = "Cielo despejado";
        return { name: 'weather-sunny', color: '#FFD700' };
      case 'clouds':
        clima = "Cielo nublado";
        return { name: 'weather-cloudy', color: '#B0C4DE' };
      case 'rain':
        clima = "Lluvias"
        return { name: 'weather-rainy', color: '#1E90FF' };
      case 'snow':
        clima = "Nevada"
        return { name: 'weather-snowy', color: '#ADD8E6' };
      case 'thunderstorm':
        clima = "Tormenta"
        return { name: 'weather-lightning-rainy', color: '#FFA500' };
      case 'drizzle':
        clima = "Llovizna"
        return { name: 'weather-partly-rainy', color: '#4682B4' };
      case 'mist':
      case 'fog':
        clima = "Niebla"
        return { name: 'weather-fog', color: '#A9A9A9' };
      default:
        return { name: 'weather-cloudy', color: '#B0C4DE' };
    }
  };

  const { name, color } = getWeatherIcon(weather);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        <Icon name={name} size={40} color={color} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Icon name="map-marker" size={20} color="black" style={styles.iconStyle} />
          <Text style={styles.cardTitle}>{ubicacion}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editIcon}>
            <Icon name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardDescription}>
          Clima actual: {clima} {"\n"}
          Temperatura: {temperatura} {"\n"}
          Humedad: {humedad} {"\n"}
          Presión: {presion} {"\n"}
          Fecha: {date}
        </Text>
      </View>

      <Modal isVisible={modalVisible}>
        <View style={styles.modalContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -34.6037, // Ejemplo de latitud (Buenos Aires)
              longitude: -58.3816, // Ejemplo de longitud (Buenos Aires)
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            {selectedLocation && (
              <Marker coordinate={selectedLocation} />
            )}
          </MapView>
          <TouchableOpacity onPress={confirmLocation} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirmar ubicación</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 8,
  },
  editIcon: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
