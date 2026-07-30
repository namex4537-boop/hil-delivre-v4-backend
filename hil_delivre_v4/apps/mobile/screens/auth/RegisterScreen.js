import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

const ROLES = [
  { key: 'client', label: 'Client', icon: '🛒' },
  { key: 'merchant', label: 'Marchand', icon: '🍽️' },
  { key: 'delivery', label: 'Livreur', icon: '🛵' },
];

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    setIsLoading(true);
    try {
      await register({ full_name: fullName.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), password, role });
    } catch (error) {
      Alert.alert('Inscription échouée', error.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.appName}>Hil_Delivre</Text>
          <Text style={styles.subtitle}>Créer votre compte</Text>
        </View>
        <View style={styles.roleContainer}>
          {ROLES.map((r) => (
            <TouchableOpacity key={r.key} style={[styles.roleButton, role === r.key && styles.roleButtonActive]}
              onPress={() => setRole(r.key)} disabled={isLoading}>
              <Text style={styles.roleIcon}>{r.icon}</Text>
              <Text style={[styles.roleLabel, role === r.key && styles.roleLabelActive]}>{r.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Nom complet" placeholderTextColor="#666"
            value={fullName} onChangeText={setFullName} editable={!isLoading} />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#666"
            value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!isLoading} />
          <TextInput style={styles.input} placeholder="Téléphone (+226...)" placeholderTextColor="#666"
            value={phone} onChangeText={setPhone} keyboardType="phone-pad" editable={!isLoading} />
          <TextInput style={styles.input} placeholder="Mot de passe (min. 8 caractères)" placeholderTextColor="#666"
            value={password} onChangeText={setPassword} secureTextEntry editable={!isLoading} />
          <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Créer mon compte</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Déjà un compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}> Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  header: { alignItems: 'center', marginBottom: 24 },
  appName: { fontSize: 36, fontWeight: 'bold', color: '#FF6B00', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#AAA' },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  roleButton: { flex: 1, alignItems: 'center', paddingVertical: 12, marginHorizontal: 4, borderRadius: 12, backgroundColor: '#2A2A3E', borderWidth: 2, borderColor: '#3A3A4E' },
  roleButtonActive: { borderColor: '#FF6B00', backgroundColor: '#3A2A1E' },
  roleIcon: { fontSize: 24, marginBottom: 4 },
  roleLabel: { fontSize: 12, color: '#888', fontWeight: '600' },
  roleLabelActive: { color: '#FF6B00' },
  form: { marginBottom: 24 },
  input: { backgroundColor: '#2A2A3E', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#FFF', marginBottom: 12, borderWidth: 1, borderColor: '#3A3A4E' },
  button: { backgroundColor: '#FF6B00', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { color: '#888', fontSize: 14 },
  linkText: { color: '#FF6B00', fontSize: 14, fontWeight: '600' },
});
