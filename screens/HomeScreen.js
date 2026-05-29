import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

// Recebemos 'route' para os parâmetros e 'navigation' para o botão
export default function HomeScreen({ route, navigation }) {
  // Acessa o email enviado via params
  const { userEmail } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {userEmail}!</Text>
      <Text style={styles.subtitle}>Você conseguiu navegar!</Text>

      {/* Botão para o Exercício 2 */}
      <View style={{ marginTop: 20 }}>
        <Button 
          title="Ir para Configurações" 
          onPress={() => navigation.navigate('Settings')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});