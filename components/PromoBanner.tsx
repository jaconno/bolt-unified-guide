import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PromoBanner() {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.content}>
        <Text style={styles.text}>
          Unlock features to elevate your birding experience with Birda+ today!
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>B+</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#374151',
    marginHorizontal: 0,
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
    lineHeight: 20,
  },
  badge: {
    backgroundColor: '#3B82F6',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  badgeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});