import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    setIsLoading(true);
    try {
      await login(email.trim().toLowerCase(), password);
    } catch (error) {
      Alert.alert('Connexion échouée', error.message || 'Identifiants incorrects.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.appName}>Hil_Delivre</Text>
          <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="votre@email.com" placeholderTextColor="#666"
            value={email} onChangeText={setEmail} keyboardType="email-address"
            autoCapitalize="none" autoCorrect={false} editable={!isLoading} />
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#666"
            value={password} onChangeText={setPassword} secureTextEntry editable={!isLoading} />
          <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Se connecter</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Pas encore de compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}> Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  appName: { fontSize: 42, fontWeight: 'bold', color: '#FF6B00', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#AAA' },
  form: { marginBottom: 30 },
  label: { fontSize: 14, color: '#CCC', marginBottom: 6, marginLeft: 4 },
  input: { backgroundColor: '#2A2A3E', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#FFF', marginBottom: 16, borderWidth: 1, borderColor: '#3A3A4E' },
  button: { backgroundColor: '#FF6B00', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { color: '#888', fontSize: 14 },
  linkText: { color: '#FF6B00', fontSize: 14, fontWeight: '600' },
});
