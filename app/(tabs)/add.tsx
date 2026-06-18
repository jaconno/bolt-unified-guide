import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { X, Camera, Bird, UserRound } from 'lucide-react-native';

export default function ActivitySelectorScreen() {
  const handleClose = () => {
    router.back();
  };

  const handleActivityPress = (activityId: string) => {
    if (activityId === 'identify' || activityId === 'log') {
      router.push('/species-guide');
    } else if (activityId === 'session') {
      router.push('/session-species-guide');
    }
    // Handle other activities as needed
  };

  const activities = [
    {
      id: 'identify',
      title: 'Identify a Bird',
      description: 'Use Birda AI to quickly identify any bird with your photos or our species guide.',
      backgroundColor: '#D1FAE5',
      iconBackgroundColor: '#059669',
      IconComponent: Camera,
    },
    {
      id: 'log',
      title: 'Log a Sighting',
      description: 'An easy way to log that you\'ve seen a bird.',
      backgroundColor: '#E0E7FF',
      iconBackgroundColor: '#7C3AED',
      IconComponent: Bird,
    },
    {
      id: 'session',
      title: 'Add a Session',
      description: 'On a walk? At a hide? Add a session to log multiple birds easily.',
      backgroundColor: '#FED7AA',
      iconBackgroundColor: '#EA580C',
      IconComponent: UserRound,
    },
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.content}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={[styles.activityCard, { backgroundColor: activity.backgroundColor }]}
              activeOpacity={0.8}
              onPress={() => handleActivityPress(activity.id)}
            >
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: activity.iconBackgroundColor }]}>
                  <activity.IconComponent size={24} color="white" />
                </View>
                <View style={styles.textContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.closeButtonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose} activeOpacity={0.8}>
            <X size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F9FAFB',
    zIndex: 1000,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    paddingBottom: 120,
  },
  activityCard: {
    borderRadius: 16,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  activityDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  closeButton: {
    width: 56,
    height: 56,
    backgroundColor: '#374151',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});