import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importado para ler a memória local
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from 'react-native';

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginPress = async () => {
        // Validação simples de campos vazios
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            // 1. Busca os dados salvos na memória do aparelho
            const jsonValue = await AsyncStorage.getItem('@ursoburgers_user');
            
            // Se existir algum dado, transforma de texto para objeto JavaScript
            const savedUser = jsonValue != null ? JSON.parse(jsonValue) : null;

            // Tratamento do texto digitado para evitar problemas com espaços ou letras maiúsculas
            const formattedEmail = email.toLowerCase().trim();

            // 2. Verifica se existe um usuário cadastrado e se as credenciais batem
            if (savedUser !== null) {
                if (formattedEmail === savedUser.email && password === savedUser.password) {
                    Alert.alert('Sucesso', `Bem-vindo de volta, ${savedUser.name}!`);
                    
                    // Vai para a Home passando o e-mail do usuário logado
                    navigation.navigate('Home', { userEmail: savedUser.email });
                } else {
                    Alert.alert('Erro', 'E-mail ou senha inválidos.');
                }
            } else {
                Alert.alert('Erro', 'Nenhum usuário cadastrado neste dispositivo.');
            }

        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Falha ao ler os dados de login.');
        }
    };

    const handleRegisterPress = () => {
        navigation.navigate('Register');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />

            <Text style={styles.title}>
                Login
            </Text>

            <Text style={styles.subtitle}>
                Entre para continuar
            </Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLoginPress}
            >
                <Text style={styles.buttonText}>
                    Entrar
                </Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                    Não tem uma conta?
                </Text>

                <TouchableOpacity onPress={handleRegisterPress}>
                    <Text style={styles.registerButtonText}>
                        Crie uma agora
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 25,
        backgroundColor: '#fff'
    },
    logo: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 15
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#222'
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
        marginTop: 8
    },
    input: {
        height: 55,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 15
    },
    button: {
        backgroundColor: '#ff6600',
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25
    },
    registerText: {
        color: '#555',
        fontSize: 15
    },
    registerButtonText: {
        color: '#ff6600',
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 15
    }
});