import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, EyeOff, Lock, Plus, Bird } from 'lucide-react-native';

export default function ReviewSightingScreen() {
  const params = useLocalSearchParams();
  const { birdName = 'Common Wood Pigeon', scientificName = 'Columba palumbus', birdId } = params;
  
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [postSharing, setPostSharing] = useState('Everyone');
  const [locationPrivacy, setLocationPrivacy] = useState('Everyone');

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    // Handle saving the sighting
    console.log('Saving sighting:', { birdName, count, notes, postSharing, locationPrivacy });
    // Navigate back to the feed (main tab)
    router.push('/(tabs)/');
  };

  const handleDeleteSighting = () => {
    // Handle deleting the sighting
    console.log('Deleting sighting');
    // Navigate back to the feed (main tab)
    router.push('/(tabs)/');
  };

  const incrementCount = () => {
    setCount(prev => prev + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(prev => prev - 1);
    }
  };

  const formatDate = () => {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' : 
                   day === 2 || day === 22 ? 'nd' : 
                   day === 3 || day === 23 ? 'rd' : 'th';
    
    return `${month} ${day}${suffix}, ${year}  ${hours}:${minutes}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Review Sighting</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Map Section */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.birdMarker}>
              <Bird size={24} color="#374151" />
            </View>
          </View>
        </View>

        {/* Photos Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <TouchableOpacity style={styles.addPhotoButton} activeOpacity={0.7}>
            <Plus size={24} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Notes Section */}
        <View style={styles.section}>
          <TextInput
            style={styles.notesInput}
            placeholder="Got something interesting to add?"
            value={notes}
            onChangeText={setNotes}
            multiline
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Sighting Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sighting</Text>
          
          <TouchableOpacity style={styles.sightingRow} activeOpacity={0.7}>
            <View style={styles.sightingLeft}>
              <Bird size={20} color="#6B7280" />
              <Text style={styles.sightingText}>{birdName}</Text>
            </View>
            <View style={styles.sightingRight}>
              <View style={styles.countContainer}>
                <TouchableOpacity 
                  style={styles.countButton} 
                  onPress={decrementCount}
                  disabled={count <= 1}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.countButtonText, count <= 1 && styles.countButtonDisabled]}>-</Text>
                </TouchableOpacity>
                <Text style={styles.countText}>{count}</Text>
                <TouchableOpacity 
                  style={styles.countButton} 
                  onPress={incrementCount}
                  activeOpacity={0.7}
                >
                  <Text style={styles.countButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sightingRow} activeOpacity={0.7}>
            <View style={styles.sightingLeft}>
              <Calendar size={20} color="#6B7280" />
              <Text style={styles.sightingText}>{formatDate()}</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sightingRow} activeOpacity={0.7}>
            <View style={styles.sightingLeft}>
              <MapPin size={20} color="#6B7280" />
              <Text style={styles.sightingText}>St. John's wood, England, Unite...</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sightingRow} activeOpacity={0.7}>
            <View style={styles.sightingLeft}>
              <Users size={20} color="#6B7280" />
              <Text style={styles.sightingText}>Tag people</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sighting privacy</Text>
          
          <TouchableOpacity style={styles.privacyRow} activeOpacity={0.7}>
            <View style={styles.privacyLeft}>
              <EyeOff size={20} color="#6B7280" />
              <Text style={styles.privacyText}>Post Sharing</Text>
            </View>
            <View style={styles.privacyRight}>
              <Text style={styles.privacyValue}>{postSharing}</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.privacyRow} activeOpacity={0.7}>
            <View style={styles.privacyLeft}>
              <Lock size={20} color="#6B7280" />
              <Text style={styles.privacyText}>Location Privacy</Text>
            </View>
            <View style={styles.privacyRight}>
              <Text style={styles.privacyValue}>{locationPrivacy}</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.saveSightingButton} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.saveSightingButtonText}>Save Sighting</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSighting} activeOpacity={0.8}>
            <Text style={styles.deleteButtonText}>Delete Sighting</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  saveButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3B82F6',
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  birdMarker: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  notesInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sightingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sightingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  sightingText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  sightingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  countButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  countButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3B82F6',
  },
  countButtonDisabled: {
    color: '#9CA3AF',
  },
  countText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    minWidth: 40,
    textAlign: 'center',
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  privacyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  privacyText: {
    fontSize: 16,
    color: '#111827',
  },
  privacyRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  privacyValue: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  actionButtons: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  saveSightingButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveSightingButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3B82F6',
  },
});