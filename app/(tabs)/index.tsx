import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CardDiagnose from '@/components/CardDiagnose';
import CardNotify from '@/components/CardNotify';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}
      headerImage={
        <ThemedView style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/agroradar_logo.png')}
            style={styles.reactLogo}
            resizeMode="contain"
          />
        </ThemedView>
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">¡Bienvenido a Agroradar!</ThemedText>
      </ThemedView>
      <CardDiagnose />
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Cultivos:</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Notificaciones:</ThemedText>
        {/* Llamar a CardNotify con diferentes tipos */}
        <CardNotify></CardNotify>
        
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Recomendaciones:</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: 'white',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2, // Espacio reducido entre logo y título
  },
  titleContainer: {
    marginTop: 2, // Espacio reducido entre logo y título
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    color: 'black',
    backgroundColor: '#FFFFFF',
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '40%',
    width: '100%', // Asegura que ocupe todo el ancho disponible
  },
});
