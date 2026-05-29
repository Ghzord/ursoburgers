import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importado para salvar na memória

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen({ navigation }) {
    // Estados para os inputs
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Estados para visibilidade da senha
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async () => {
        // 1. Validações básicas
        if (!name || !phone || !email || !address || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem!');
            return;
        }

        try {
            // 2. Criamos o objeto com os dados do usuário
            const userData = {
                name,
                phone,
                email: email.toLowerCase().trim(), // Remove espaços e deixa em minúsculo para evitar erros no login
                address,
                password
            };

            // 3. Salvamos localmente na memória do aparelho
            // Usamos uma chave única '@ursoburgers_user' para identificar esses dados depois
            await AsyncStorage.setItem('@ursoburgers_user', JSON.stringify(userData));

            Alert.alert('Sucesso', 'Conta criada com sucesso (salva no dispositivo)!');
            navigation.navigate('Login');
            
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível salvar os dados no aparelho.');
        }
    };

    // Formatação de telefone (Máscara)
    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (!digits) return '';
        if (digits.length <= 2) return '(' + digits;
        const ddd = digits.slice(0, 2);
        const number = digits.slice(2);
        if (number.length <= 4) return `(${ddd}) ${number}`;
        const prefix = number.slice(0, number.length - 4);
        const suffix = number.slice(-4);
        return `(${ddd}) ${prefix}-${suffix}`;
    };

    const handlePhoneChange = (text) => {
        setPhone(formatPhone(text));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >

                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                    />

                    <Text style={styles.title}>Criar Conta</Text>

                    <Text style={styles.subtitle}>
                        Cadastre-se para pedir suas comidas favoritas
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nome completo"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Telefone"
                        value={phone}
                        onChangeText={handlePhoneChange}
                        keyboardType="phone-pad"
                        maxLength={15}
                    />

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
                        placeholder="Endereço de entrega"
                        value={address}
                        onChangeText={setAddress}
                    />

                    {/* SENHA */}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={22}
                                color="#777"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* CONFIRMAR SENHA */}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Ionicons
                                name={showConfirmPassword ? 'eye-off' : 'eye'}
                                size={22}
                                color="#777"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Criar Conta</Text>
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Já possui uma conta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginButtonText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 12,
        backgroundColor: '#fff',
        paddingBottom: 20
    },
    scrollView: {
        flex: 1
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
        marginBottom: 18,
        marginTop: 6
    },
    input: {
        height: 48,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 15
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
        height: 48
    },
    passwordInput: {
        flex: 1,
        fontSize: 15
    },
    button: {
        backgroundColor: '#ff6600',
        height: 50,
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25
    },
    loginText: {
        color: '#555'
    },
    loginButtonText: {
        color: '#ff6600',
        fontWeight: 'bold',
        marginLeft: 5
    }
});