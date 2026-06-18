import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Users, BookOpen, Bell } from 'lucide-react-native';

export default function AppHeader() {
  const handleBookPress = () => {
    router.push('/species-guide');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Users size={20} color="#374151" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>BIRDA</Text>
        </View>
        
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleBookPress} activeOpacity={0.7}>
            <BookOpen size={20} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
  },
  leftActions: {
    width: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconButton: {
    padding: 6,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: 1,
    textAlign: 'center',
  },
  rightActions: {
    width: 70,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 2,
  },
});