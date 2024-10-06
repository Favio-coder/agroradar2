import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location'; // Importar expo-location
import axios from 'axios';

export default function CardNotify() {
  const [ubicacion, setUbicacion] = useState('Cargando ubicación...');
  const [alertMessage, setAlertMessage] = useState('Cargando pronóstico...');
  const [precipitacion, setPrecipitacion] = useState(false);

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      // Pedir permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setUbicacion('Permisos de ubicación no otorgados');
        setAlertMessage('No se puede obtener el pronóstico sin permisos.');
        return;
      }

      // Obtener la ubicación del usuario
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Llamar a la API de OpenWeatherMap para el pronóstico
      const API_KEY = '8bee55821bd05d76af13b501801e9755';
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`;

      try {
        const response = await axios.get(url);
        const forecastData = response.data.list;

        // Evaluar si habrá precipitación en los próximos días
        const rainExpected = forecastData.some((forecast: any) => forecast.pop > 0.3); // 30% o más de probabilidad de precipitación
        setPrecipitacion(rainExpected);

        // Actualizar el nombre de la ciudad
        setUbicacion(response.data.city.name);

        // Mostrar mensaje según el pronóstico
        if (rainExpected) {
          setAlertMessage('Se espera lluvia en los próximos días. ¡Prepárate!');
        } else {
          setAlertMessage('No se espera lluvia en los próximos días. ¡Disfruta!');
        }
      } catch (error) {
        console.log('Error al obtener datos del clima', error);
        setUbicacion('Error al obtener la ubicación');
        setAlertMessage('Error al obtener el pronóstico.');
      }
    };

    fetchLocationAndWeather();
  }, []);

  // Elegir el ícono dependiendo de si hay precipitación o no
  const iconName = precipitacion ? 'alert' : 'emoticon-happy';
  const iconColor = precipitacion ? '#FF4500' : '#32CD32';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={40} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{ubicacion}</Text>
        <Text style={styles.alertMessage}>{alertMessage}</Text>
      </View>
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 14,
    color: '#FF4500',
    fontWeight: 'bold',
    marginTop: 8,
  },
});
