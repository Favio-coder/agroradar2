import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CardDiagnose from '@/components/CardDiagnose';


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
      <CardDiagnose></CardDiagnose>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Cultivos:</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Notificaciones:</ThemedText>
        
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
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
    color:'black',
    backgroundColor:'#FFFFFF',
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '40%',
    width: '100%', // Asegura que ocupe todo el ancho disponible
  },
});
