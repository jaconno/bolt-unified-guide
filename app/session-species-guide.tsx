import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Animated, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft, Search, Mic, Camera, MapPin, Bird, Calendar, Pencil, X, Plus, Minus, Binoculars, Square, Eye, Sparkles, Percent } from 'lucide-react-native';

interface BirdSpecies {
  id: string;
  name: string;
  scientificName: string;
  gender?: 'male' | 'female';
  confidence?: number;
}

const birdSpecies: BirdSpecies[] = [
  {
    id: '1',
    name: 'Large-billed Crow',
    scientificName: 'Corvus macrorhynchos',
    gender: 'male',
  },
  {
    id: '2',
    name: 'Himalayan Bulbul',
    scientificName: 'Pycnonotus leucogenys',
    gender: 'male',
  },
  {
    id: '3',
    name: 'Cinereous Tit',
    scientificName: 'Parus cinereus',
    gender: 'male',
  },
  {
    id: '4',
    name: 'Common Myna',
    scientificName: 'Acridotheres tristis',
    gender: 'male',
  },
  {
    id: '5',
    name: 'Blue Whistling Thrush',
    scientificName: 'Myophonus caeruleus',
  },
  {
    id: '6',
    name: 'House Sparrow',
    scientificName: 'Passer domesticus',
    gender: 'male',
  },
  {
    id: '7',
    name: 'European Robin',
    scientificName: 'Erithacus rubecula',
    gender: 'male',
  },
  {
    id: '8',
    name: 'Common Blackbird',
    scientificName: 'Turdus merula',
    gender: 'male',
  },
  {
    id: '9',
    name: 'Great Tit',
    scientificName: 'Parus major',
    gender: 'female',
  },
  {
    id: '10',
    name: 'Blue Jay',
    scientificName: 'Cyanocitta cristata',
  },
  {
    id: '11',
    name: 'Northern Cardinal',
    scientificName: 'Cardinalis cardinalis',
    gender: 'male',
  },
  {
    id: '12',
    name: 'American Goldfinch',
    scientificName: 'Spinus tristis',
    gender: 'female',
  },
  {
    id: '13',
    name: 'Red-winged Blackbird',
    scientificName: 'Agelaius phoeniceus',
    gender: 'male',
  },
  {
    id: '14',
    name: 'Song Sparrow',
    scientificName: 'Melospiza melodia',
  },
  {
    id: '15',
    name: 'White-breasted Nuthatch',
    scientificName: 'Sitta carolinensis',
    gender: 'male',
  },
  {
    id: '16',
    name: 'Downy Woodpecker',
    scientificName: 'Picoides pubescens',
    gender: 'female',
  },
  {
    id: '17',
    name: 'House Finch',
    scientificName: 'Haemorhous mexicanus',
    gender: 'male',
  },
  {
    id: '18',
    name: 'Dark-eyed Junco',
    scientificName: 'Junco hyemalis',
  },
  {
    id: '19',
    name: 'Mourning Dove',
    scientificName: 'Zenaida macroura',
    gender: 'female',
  },
  {
    id: '20',
    name: 'Cedar Waxwing',
    scientificName: 'Bombycilla cedrorum',
  },
  {
    id: '21',
    name: 'Baltimore Oriole',
    scientificName: 'Icterus galbula',
    gender: 'male',
  },
  {
    id: '22',
    name: 'Rose-breasted Grosbeak',
    scientificName: 'Pheucticus ludovicianus',
    gender: 'female',
  },
  {
    id: '23',
    name: 'Indigo Bunting',
    scientificName: 'Passerina cyanea',
    gender: 'male',
  },
  {
    id: '24',
    name: 'Scarlet Tanager',
    scientificName: 'Piranga olivacea',
    gender: 'male',
  },
  {
    id: '25',
    name: 'Wood Thrush',
    scientificName: 'Hylocichla mustelina',
  },
];

const aiSuggestions: BirdSpecies[] = [
  {
    id: 'ai1',
    name: 'Barn Swallow',
    scientificName: 'Hirundo rustica',
    gender: 'male',
    confidence: 94,
  },
  {
    id: 'ai2',
    name: 'Cliff Swallow',
    scientificName: 'Petrochelidon pyrrhonota',
    gender: 'male',
    confidence: 87,
  },
];

const lessLikelySpecies: BirdSpecies[] = [
  {
    id: 'll1',
    name: 'Funky Swallow',
    scientificName: 'Tachycineta bicolor',
    gender: 'male',
    confidence: 62,
  },
];

export default function SessionSpeciesGuideScreen() {
  const [searchText, setSearchText] = useState('');
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showPhotoResults, setShowPhotoResults] = useState(false);
  const [slideAnim] = useState(() => new Animated.Value(0));
  const [tallyCounts, setTallyCounts] = useState<Record<string, number>>({});
  const [sessionDuration, setSessionDuration] = useState(0);

  // Filter birds based on search text
  const filteredBirds = useMemo(() => {
    if (!searchText.trim() || showPhotoResults) {
      return birdSpecies;
    }
    
    const searchLower = searchText.toLowerCase().trim();
    return birdSpecies.filter(bird => 
      bird.name.toLowerCase().includes(searchLower) ||
      bird.scientificName.toLowerCase().includes(searchLower)
    );
  }, [searchText, showPhotoResults]);

  // Timer for session duration - session is already running
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleStopSession = useCallback(() => {
    setSessionDuration(0);
    setTallyCounts({});
    // Here you would typically save the session data
    router.back();
  }, []);

  const handleCameraPress = useCallback(() => {
    setShowActionSheet(true);
    // Use requestAnimationFrame to defer the animation
    requestAnimationFrame(() => {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [slideAnim]);

  const hideActionSheet = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowActionSheet(false);
    });
  }, [slideAnim]);

  const handleTakePhoto = useCallback(() => {
    hideActionSheet();
    // Use setTimeout to defer state updates
    setTimeout(() => {
      setShowPhotoResults(true);
      setSearchText('Photo ID Results');
    }, 300);
  }, [hideActionSheet]);

  const handleChoosePhoto = useCallback(() => {
    hideActionSheet();
    // Use setTimeout to defer state updates
    setTimeout(() => {
      setShowPhotoResults(true);
      setSearchText('Photo ID Results');
    }, 300);
  }, [hideActionSheet]);

  const handleImagePress = useCallback(() => {
    handleCameraPress();
  }, [handleCameraPress]);

  const handleClearSearch = useCallback(() => {
    setSearchText('');
    setShowPhotoResults(false);
  }, []);

  const incrementTally = useCallback((birdId: string) => {
    setTallyCounts(prev => ({
      ...prev,
      [birdId]: (prev[birdId] || 0) + 1
    }));
  }, []);

  const decrementTally = useCallback((birdId: string) => {
    setTallyCounts(prev => {
      const currentCount = prev[birdId] || 0;
      if (currentCount <= 1) {
        const { [birdId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [birdId]: currentCount - 1
      };
    });
  }, []);

  const getConfidenceStyle = useCallback((confidence: number) => {
    if (confidence >= 90) {
      return { color: '#059669', backgroundColor: '#D1FAE5' };
    } else if (confidence >= 75) {
      return { color: '#D97706', backgroundColor: '#FEF3C7' };
    } else if (confidence >= 50) {
      return { color: '#EA580C', backgroundColor: '#FED7AA' };
    } else {
      return { color: '#DC2626', backgroundColor: '#FEE2E2' };
    }
  }, []);

  const getConfidenceLevel = useCallback(() => {
    // Get the highest confidence from AI suggestions
    const maxConfidence = Math.max(...aiSuggestions.map(bird => bird.confidence || 0));
    
    if (maxConfidence >= 85) return 'High';
    if (maxConfidence >= 65) return 'Medium';
    return 'Low';
  }, []);

  const handleBirdCardPress = useCallback((bird: BirdSpecies) => {
    router.push('/species-detail');
  }, []);

  const getTotalBirds = useCallback(() => {
    return Object.values(tallyCounts).reduce((sum, count) => sum + count, 0);
  }, [tallyCounts]);

  const getUniqueSpecies = useCallback(() => {
    return Object.keys(tallyCounts).length;
  }, [tallyCounts]);

  const renderYourImageCard = useCallback(() => {
    const totalMatches = aiSuggestions.length + lessLikelySpecies.length;
    const confidenceLevel = getConfidenceLevel();
    
    return (
      <View style={styles.yourImageCard}>
        <View style={styles.yourImageHeader}>
          <View style={styles.headerLeft}>
            <View style={styles.aiIcon}>
              <Sparkles size={16} color="#3B82F6" />
            </View>
            <Text style={styles.yourImageTitle}>Photo Analysis</Text>
          </View>
          <TouchableOpacity style={styles.retakeButton} onPress={handleImagePress}>
            <Camera size={16} color="#6B7280" />
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.yourImageContent}>
          <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' }}
              style={styles.yourImage}
            />
          </TouchableOpacity>
          <View style={styles.yourImageInfo}>
            <View style={styles.analysisStats}>
              <View style={styles.statItem}>
                <Eye size={14} color="#6B7280" />
                <Text style={styles.statText}>{totalMatches} likely matches</Text>
              </View>
              <View style={styles.statItem}>
                <Percent size={14} color="#6B7280" />
                <Text style={styles.statText}>{confidenceLevel} confidence match</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }, [getConfidenceLevel, handleImagePress]);

  const renderUnidentifiedCard = useCallback(() => (
    <TouchableOpacity style={styles.unidentifiedCard} activeOpacity={0.8}>
      <View style={styles.unidentifiedContent}>
        <View style={styles.unidentifiedIcon}>
          <View style={styles.questionMark}>
            <Text style={styles.questionText}>?</Text>
          </View>
        </View>
        <View style={styles.unidentifiedText}>
          <Text style={styles.unidentifiedTitle}>Unidentified Species</Text>
          <Text style={styles.unidentifiedSubtitle}>I don't know, ask the community for help</Text>
        </View>
      </View>
    </TouchableOpacity>
  ), []);

  const renderBirdCard = useCallback((bird: BirdSpecies) => {
    const tallyCount = tallyCounts[bird.id] || 0;
    const confidenceStyle = bird.confidence ? getConfidenceStyle(bird.confidence) : null;
    
    return (
      <TouchableOpacity 
        key={bird.id} 
        style={styles.birdCard} 
        activeOpacity={0.8}
        onPress={() => handleBirdCardPress(bird)}
      >
        <View style={styles.birdImageContainer}>
          <Bird size={32} color="#9CA3AF" />
        </View>
        <View style={styles.birdInfo}>
          <Text style={styles.birdName}>{bird.name}</Text>
          <Text style={styles.scientificName}>{bird.scientificName}</Text>
          <View style={styles.metadataContainer}>
            {bird.gender && (
              <View style={styles.genderContainer}>
                <Text style={styles.genderSymbol}>♂</Text>
              </View>
            )}
            {bird.confidence && confidenceStyle && (
              <View style={styles.confidenceContainer}>
                <Text style={[styles.confidenceScore, confidenceStyle]}>
                  {bird.confidence}%
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.tallyContainer}>
          {tallyCount > 0 && (
            <TouchableOpacity 
              style={styles.minusButton} 
              onPress={(e) => {
                e.stopPropagation();
                decrementTally(bird.id);
              }}
              activeOpacity={0.7}
            >
              <Minus size={14} color="#3B82F6" />
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.plusButton} 
            onPress={(e) => {
              e.stopPropagation();
              incrementTally(bird.id);
            }}
            activeOpacity={0.7}
          >
            {tallyCount > 0 ? (
              <Text style={styles.tallyText}>{tallyCount}</Text>
            ) : (
              <Plus size={16} color="#3B82F6" />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }, [tallyCounts, getConfidenceStyle, handleBirdCardPress, decrementTally, incrementTally]);

  const renderSearchResults = useCallback(() => {
    if (filteredBirds.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Bird size={48} color="#9CA3AF" />
          <Text style={styles.noResultsTitle}>No birds found</Text>
          <Text style={styles.noResultsSubtitle}>
            Try searching with a different name or check your spelling
          </Text>
        </View>
      );
    }

    return (
      <>
        {searchText.trim() && !showPhotoResults && (
          <View style={styles.searchResultsHeaderContainer}>
            <Text style={styles.searchResultsHeader}>
              Found {filteredBirds.length} bird{filteredBirds.length !== 1 ? 's' : ''} matching "{searchText}"
            </Text>
          </View>
        )}
        {filteredBirds.map((bird) => renderBirdCard(bird))}
      </>
    );
  }, [filteredBirds, searchText, showPhotoResults, renderBirdCard]);

  const ActionSheet = useCallback(() => (
    <Modal
      visible={showActionSheet}
      transparent
      animationType="none"
      onRequestClose={hideActionSheet}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={hideActionSheet}
      >
        <Animated.View
          style={[
            styles.actionSheetContainer,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [400, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.actionSheet}>
            <View style={styles.actionSheetHeader}>
              <Text style={styles.actionSheetTitle}>IDENTIFY A BIRD</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.actionSheetButton} 
              onPress={handleTakePhoto}
              activeOpacity={0.8}
            >
              <Text style={styles.actionSheetButtonText}>Take Photo</Text>
            </TouchableOpacity>
            
            <View style={styles.actionSheetSeparator} />
            
            <TouchableOpacity 
              style={styles.actionSheetButton} 
              onPress={handleChoosePhoto}
              activeOpacity={0.8}
            >
              <Text style={styles.actionSheetButtonText}>Choose Photo</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={hideActionSheet}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  ), [showActionSheet, hideActionSheet, slideAnim, handleTakePhoto, handleChoosePhoto]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Bird size={20} color="#3B82F6" />
            <Text style={styles.iconButtonText}>{getTotalBirds()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Binoculars size={20} color="#3B82F6" />
            <Text style={styles.iconButtonText}>{getUniqueSpecies()}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {formatDuration(sessionDuration)}
            </Text>
          </View>
          <TouchableOpacity style={styles.stopButton} onPress={handleStopSession}>
            <Square size={14} color="white" fill="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Describe the bird"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#9CA3AF"
          />
          {searchText.trim() && !showPhotoResults ? (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={styles.micButton}>
            <Mic size={20} color="#3B82F6" />
          </TouchableOpacity>
          {showPhotoResults ? (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
              <Camera size={20} color="#3B82F6" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Showing birds near</Text>
        <TouchableOpacity style={styles.locationButton}>
          <MapPin size={14} color="#3B82F6" />
          <Text style={styles.locationName}>Norwich, Norfolk</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {showPhotoResults ? (
          <>
            {renderYourImageCard()}
            
            <Text style={styles.sectionTitle}>Birda AI Suggestions</Text>
            {aiSuggestions.map((bird) => renderBirdCard(bird))}
            
            <Text style={styles.sectionTitle}>Less Likely for Location</Text>
            {renderUnidentifiedCard()}
            {lessLikelySpecies.map((bird) => renderBirdCard(bird))}
          </>
        ) : (
          <>
            {!searchText.trim() && renderUnidentifiedCard()}
            {renderSearchResults()}
          </>
        )}
      </ScrollView>

      <ActionSheet />
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
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  iconButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 100,
    justifyContent: 'flex-end',
  },
  timerContainer: {
    minWidth: 60,
    alignItems: 'flex-end',
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'monospace',
  },
  stopButton: {
    backgroundColor: '#DC2626',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  clearButton: {
    padding: 4,
  },
  micButton: {
    padding: 4,
  },
  cameraButton: {
    padding: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationName: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchResultsHeaderContainer: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  searchResultsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
    marginBottom: 16,
  },
  yourImageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  yourImageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourImageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  retakeText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  yourImageContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
  },
  yourImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  yourImageInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  analysisStats: {
    alignItems: 'flex-start',
    gap: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  unidentifiedCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unidentifiedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  unidentifiedIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  questionMark: {
    width: 32,
    height: 32,
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  unidentifiedText: {
    flex: 1,
  },
  unidentifiedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 8,
    lineHeight: 20,
  },
  unidentifiedSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  birdCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  birdImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  birdInfo: {
    flex: 1,
    gap: 6,
  },
  birdName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 20,
  },
  scientificName: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  metadataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
    minHeight: 20,
  },
  genderContainer: {
    minWidth: 20,
    alignItems: 'center',
  },
  genderSymbol: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
    lineHeight: 20,
  },
  confidenceContainer: {
    alignItems: 'flex-start',
  },
  confidenceScore: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    lineHeight: 16,
  },
  tallyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  plusButton: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusButton: {
    width: 26,
    height: 26,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tallyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B82F6',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  actionSheetContainer: {
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  actionSheet: {
    backgroundColor: 'white',
    borderRadius: 14,
    marginBottom: 8,
    overflow: 'hidden',
  },
  actionSheetHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  actionSheetTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#8E8E93',
    letterSpacing: 0.5,
  },
  actionSheetButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  actionSheetButtonText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#007AFF',
  },
  actionSheetSeparator: {
    height: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B7280',
  },
});