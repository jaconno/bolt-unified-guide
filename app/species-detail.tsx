import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft, Share, Play, MapPin, Calendar, User, Bird } from 'lucide-react-native';

export default function SpeciesDetailScreen() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleAddSighting = () => {
    // Navigate to review sighting screen with the current species data
    router.push({
      pathname: '/review-sighting',
      params: {
        birdName: 'Woodpigeon',
        scientificName: 'Columba palumbus',
        birdId: 'woodpigeon',
      },
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderSoundCard = (title: string, duration: string, type: 'song' | 'call') => (
    <View style={styles.soundCard}>
      <View style={styles.soundInfo}>
        <Text style={styles.soundTitle}>{title}</Text>
        <View style={styles.waveform}>
          {Array.from({ length: 20 }).map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.waveformBar, 
                { height: Math.random() * 20 + 8 }
              ]} 
            />
          ))}
        </View>
        <Text style={styles.soundDuration}>{duration}</Text>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Play size={16} color="white" fill="white" />
      </TouchableOpacity>
    </View>
  );

  const renderPhotoGrid = () => (
    <View style={styles.photoGrid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={styles.photoItem}>
          <View style={styles.photoPlaceholder}>
            <Bird size={24} color="#9CA3AF" />
          </View>
        </View>
      ))}
    </View>
  );

  const renderSightingCard = (name: string, date: string, location: string, avatar: string) => (
    <View style={styles.sightingCard}>
      <View style={styles.sightingHeader}>
        <View style={styles.sightingAvatar}>
          <User size={20} color="#9CA3AF" />
        </View>
        <View style={styles.sightingInfo}>
          <Text style={styles.sightingName}>{name}</Text>
          <View style={styles.sightingMeta}>
            <Calendar size={12} color="#6B7280" />
            <Text style={styles.sightingDate}>{date}</Text>
          </View>
          <View style={styles.sightingMeta}>
            <MapPin size={12} color="#6B7280" />
            <Text style={styles.sightingLocation}>{location}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>About</Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Share size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Species Header */}
        <View style={styles.speciesHeader}>
          <Text style={styles.speciesName}>Woodpigeon</Text>
          <Text style={styles.scientificName}>Columba palumbus</Text>
        </View>

        {/* Species Image */}
        <View style={styles.imageContainer}>
          <View style={styles.speciesImagePlaceholder}>
            <Bird size={64} color="#9CA3AF" />
          </View>
          <View style={styles.genderIndicator}>
            <Text style={styles.genderSymbol}>♂</Text>
          </View>
        </View>

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddSighting} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.description}>
            The Common Wood Pigeon, Columba palumbus, is a sizeable bird of the dove and pigeon family, Columbidae. 
            It is a member of the species C. palumbus. The adult has grey bird with a pinkish breast, and adults can be 
            distinguished by a white on the neck and wing. The species exhibits sexual dimorphism, with males 
            typically larger than females.
          </Text>
        </View>

        {/* Identification Tips */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('identification')}
          >
            <Text style={styles.sectionTitle}>Identification Tips</Text>
          </TouchableOpacity>
          {expandedSection === 'identification' && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionText}>
                Adults of this species are marked by a series of green and white patches on their necks, and a pink patch on their breast.
              </Text>
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read more</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Sounds */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sounds</Text>
          <View style={styles.soundsContainer}>
            {renderSoundCard('Song', '0:10', 'song')}
            {renderSoundCard('Call', '0:16', 'call')}
          </View>
        </View>

        {/* Map */}
        <View style={styles.section}>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <MapPin size={32} color="#9CA3AF" />
            </View>
            <Text style={styles.mapSource}>
              Source: BirdLife International and Handbook of the Birds of the World (2021)
            </Text>
          </View>
        </View>

        {/* Did you know */}
        <View style={styles.section}>
          <View style={styles.didYouKnowContainer}>
            <View style={styles.didYouKnowItem}>
              <View style={styles.didYouKnowIcon}>
                <Text style={styles.didYouKnowEmoji}>🥛</Text>
              </View>
              <View style={styles.didYouKnowContent}>
                <Text style={styles.didYouKnowTitle}>Did you know?</Text>
                <Text style={styles.didYouKnowText}>
                  Common Woodpigeons feed their young a liquid known as crop or pigeon milk.
                </Text>
              </View>
            </View>
            <View style={styles.didYouKnowItem}>
              <View style={styles.didYouKnowIcon}>
                <Text style={styles.didYouKnowEmoji}>🌙</Text>
              </View>
              <View style={styles.didYouKnowContent}>
                <Text style={styles.didYouKnowTitle}>Did you know?</Text>
                <Text style={styles.didYouKnowText}>
                  Woodpigeons are one of the few birds that can drink by sucking water up through their bills.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Woodpigeons on Birda */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Woodpigeons on Birda</Text>
        </View>

        {/* Photos */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithAction}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {renderPhotoGrid()}
        </View>

        {/* Sightings */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithAction}>
            <Text style={styles.sectionTitle}>Sightings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sightingsContainer}>
            {renderSightingCard('Corinne Stevenson', '02 Jul 2025, 15:47', 'London, England', '')}
            {renderSightingCard('Green Shifu', '02 Jul 2025, 12:45', 'London, England', '')}
          </View>
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
  shareButton: {
    padding: 8,
    marginRight: -8,
  },
  content: {
    flex: 1,
  },
  speciesHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  speciesName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  imageContainer: {
    position: 'relative',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  speciesImagePlaceholder: {
    width: '100%',
    height: 240,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderIndicator: {
    position: 'absolute',
    bottom: 12,
    left: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  genderSymbol: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionHeaderWithAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
  sectionContent: {
    paddingTop: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  soundsContainer: {
    gap: 12,
    marginTop: 16,
  },
  soundCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  soundInfo: {
    flex: 1,
  },
  soundTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    marginBottom: 8,
  },
  waveformBar: {
    width: 3,
    backgroundColor: '#9CA3AF',
    borderRadius: 1.5,
  },
  soundDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  playButton: {
    width: 40,
    height: 40,
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  mapContainer: {
    marginTop: 16,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  mapSource: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  didYouKnowContainer: {
    gap: 16,
    marginTop: 16,
  },
  didYouKnowItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  didYouKnowIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  didYouKnowEmoji: {
    fontSize: 20,
  },
  didYouKnowContent: {
    flex: 1,
  },
  didYouKnowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  didYouKnowText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  photoItem: {
    width: '31%',
    aspectRatio: 1,
  },
  photoPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sightingsContainer: {
    gap: 12,
    marginTop: 8,
  },
  sightingCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sightingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  sightingAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sightingInfo: {
    flex: 1,
  },
  sightingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  sightingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  sightingDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  sightingLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
});