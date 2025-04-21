import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => Alert.alert("Account deleted") }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: darkTheme ? '#1e1e1e' : '#F0FAF8' }]}>
      <Text style={[styles.title, { color: darkTheme ? '#fff' : '#000' }]}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={[styles.label, { color: darkTheme ? '#fff' : '#000' }]}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={notificationsEnabled ? '#00856F' : '#ccc'}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.label, { color: darkTheme ? '#fff' : '#000' }]}>Daily Reminders</Text>
        <Switch
          value={remindersEnabled}
          onValueChange={setRemindersEnabled}
          thumbColor={remindersEnabled ? '#00856F' : '#ccc'}
        />
      </View>

      <View style={styles.trackingBox}>
        <Text style={[styles.label, { color: darkTheme ? '#fff' : '#000' }]}>
          🛒 Last Order: Pain Relief Kit - ETA: 12:30 PM
        </Text>
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.label, { color: darkTheme ? '#fff' : '#000' }]}>Dark Theme</Text>
        <Switch
          value={darkTheme}
          onValueChange={setDarkTheme}
          thumbColor={darkTheme ? '#00856F' : '#ccc'}
        />
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  trackingBox: {
    backgroundColor: '#D9F3ED',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: '#FF4F4F',
    paddingVertical: 14,
    marginTop: 30,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
