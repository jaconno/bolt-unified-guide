import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import AppHeader from '@/components/AppHeader';
import FeedTabs from '@/components/FeedTabs';
import PromoBanner from '@/components/PromoBanner';
import BirdPost from '@/components/BirdPost';

// Mock data for the feed
const feedData = [
  {
    id: '1',
    user: {
      name: 'Mike Fitsell',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isFollowing: true,
    },
    bird: {
      species: 'Tufted Duck',
      image: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    post: {
      content: 'Assistance from the Brethren please. Can anyone assist dentist this fella? Constantly diving underwater, hence I only got one shot. Lots of water surface photos though! 😂',
      date: '02 Jul 2025 12:39',
      location: 'United Kingdom',
      likes: 4,
      comments: 5,
    },
  },
  {
    id: '2',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isFollowing: false,
    },
    bird: {
      species: 'Robin',
      image: 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    post: {
      content: 'Beautiful Robin spotted in my garden this morning! Love how they\'re so curious and brave.',
      date: '02 Jul 2025 10:15',
      location: 'London, UK',
      likes: 12,
      comments: 3,
    },
  },
];

export default function FeedScreen() {
  const [activeTab, setActiveTab] = useState('community');

  const renderHeader = () => (
    <>
      <AppHeader />
      <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <PromoBanner />
    </>
  );

  const renderPost = ({ item }: { item: typeof feedData[0] }) => (
    <BirdPost
      user={item.user}
      bird={item.bird}
      post={item.post}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  list: {
    flex: 1,
  },
});