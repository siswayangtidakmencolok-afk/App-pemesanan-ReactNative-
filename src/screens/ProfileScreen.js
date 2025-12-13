// src/screens/ProfileScreen.js - VERSI SIMPLE (TANPA ASYNCSTORAGE)
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView 
} from 'react-native';

// KONSEP: State Management sederhana tanpa persistence
// Data akan hilang saat app ditutup (tidak tersimpan permanen)

const ProfileScreen = () => {
  // State untuk menyimpan data user (hanya di memory)
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const saveProfile = () => {
    // Validasi: pastikan nama tidak kosong
    if (profile.name.trim() === '') {
      Alert.alert('Error', 'Nama tidak boleh kosong!');
      return;
    }

    Alert.alert('Berhasil!', 'Profile berhasil disimpan\n\n⚠️ Data hanya tersimpan sementara (hilang saat app ditutup)');
    setIsEditing(false);
  };

  const clearProfile = () => {
    Alert.alert(
      'Hapus Profile',
      'Yakin ingin menghapus semua data profile?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            setProfile({ name: '', phone: '', address: '', email: '' });
            setIsEditing(true);
          }
        }
      ]
    );
  };

  // KONSEP: Event handler - fungsi yang dipanggil saat event terjadi
  const handleInputChange = (field, value) => {
    // KONSEP: Spread operator (...) - copy semua property
    setProfile(prevProfile => ({
      ...prevProfile, // Copy semua field yang ada
      [field]: value  // Update field yang spesifik saja
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {profile.name ? profile.name.charAt(0).toUpperCase() : '👤'}
          </Text>
        </View>
        <Text style={styles.headerTitle}>
          {profile.name || 'User Belum Terdaftar'}
        </Text>
      </View>

      {/* FORM SECTION */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Informasi Personal</Text>

        {/* INPUT NAMA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Lengkap *</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={profile.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Masukkan nama lengkap"
            editable={isEditing}
          />
        </View>

        {/* INPUT PHONE */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nomor Telepon</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={profile.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            placeholder="08xxxxxxxxxx"
            keyboardType="phone-pad"
            editable={isEditing}
          />
        </View>

        {/* INPUT EMAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={profile.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={isEditing}
          />
        </View>

        {/* INPUT ADDRESS */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Alamat Lengkap</Text>
          <TextInput
            style={[
              styles.input, 
              styles.textArea, 
              !isEditing && styles.inputDisabled
            ]}
            value={profile.address}
            onChangeText={(text) => handleInputChange('address', text)}
            placeholder="Jl. Contoh No. 123"
            multiline
            numberOfLines={3}
            editable={isEditing}
          />
        </View>

        {/* BUTTONS - CONDITIONAL RENDERING */}
        {isEditing ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.buttonText}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={saveProfile}
            >
              <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            {profile.name && (
              <TouchableOpacity 
                style={[styles.button, styles.deleteButton]}
                onPress={clearProfile}
              >
                <Text style={styles.buttonText}>Hapus</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* INFO BOX */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>⚠️ Perhatian</Text>
        <Text style={styles.infoText}>
          Data profile ini tersimpan sementara di memory.{'\n'}
          Data akan hilang saat aplikasi ditutup.{'\n\n'}
          Untuk menyimpan permanen, install AsyncStorage.
        </Text>
      </View>

      {/* STATS CARD */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>✅</Text>
          <Text style={styles.statValue}>
            {profile.name ? '100%' : '0%'}
          </Text>
          <Text style={styles.statLabel}>Profile Lengkap</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📝</Text>
          <Text style={styles.statValue}>
            {Object.values(profile).filter(v => v !== '').length}/4
          </Text>
          <Text style={styles.statLabel}>Field Terisi</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF6347',
    padding: 30,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    margin: 20,
    marginTop: 10,
    padding: 16,
    backgroundColor: '#fff3cd',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProfileScreen;

/* 
==========================================================
📚 PENJELASAN KONSEP:
==========================================================

1. STATELESS PROFILE
   - Data tersimpan di useState (memory)
   - Hilang saat app ditutup
   - Simple untuk belajar

2. SPREAD OPERATOR (...)
   - {...prevProfile} = copy semua property
   - Tidak mengubah object asli (immutable)
   - Best practice di React

3. COMPUTED PROPERTY NAME
   - [field]: value
   - field adalah variable yang jadi nama property
   - Contoh: [name]: "John" -> {name: "John"}

4. ARRAY METHODS
   - Object.values(profile) = ambil semua values
   - .filter() = filter berdasarkan kondisi
   - .length = hitung jumlah

5. CONDITIONAL STYLING
   - [styles.input, condition && styles.disabled]
   - Gabungkan style berdasarkan kondisi
   - Array of styles

==========================================================
*/