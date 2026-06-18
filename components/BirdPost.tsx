import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Heart, MessageCircle, Share2, Calendar, MapPin } from 'lucide-react-native';

interface BirdPostProps {
  user: {
    name: string;
    avatar: string;
    isFollowing: boolean;
  };
  bird: {
    species: string;
    image: string;
  };
  post: {
    content: string;
    date: string;
    location: string;
    likes: number;
    comments: number;
  };
}

export default function BirdPost({ user, bird, post }: BirdPostProps) {
  const handleSharePress = () => {
    // Handle share functionality
    console.log('Sharing post');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <View style={styles.userLine}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.action}> has seen </Text>
              <Text style={styles.birdName}>{bird.species}</Text>
            </View>
            <View style={styles.metaInfo}>
              <View style={styles.metaItem}>
                <Calendar size={12} color="#9CA3AF" />
                <Text style={styles.metaText}>{post.date}</Text>
              </View>
              <View style={styles.metaItem}>
                <MapPin size={12} color="#9CA3AF" />
                <Text style={styles.metaText}>{post.location}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      <Image source={{ uri: bird.image }} style={styles.birdImage} />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={20} color="#3B82F6" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#3B82F6" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleSharePress}
          activeOpacity={0.7}
        >
          <Share2 size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 4,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  action: {
    fontSize: 14,
    color: '#6B7280',
  },
  birdName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  metaInfo: {
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  metaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  content: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  birdImage: {
    width: '100%',
    height: 280,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
});