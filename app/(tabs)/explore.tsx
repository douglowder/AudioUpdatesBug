import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [sound, setSound] = useState<Audio.Sound>();
  const [error, setError] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

  async function loadSound() {
    console.log('Loading Sound');
    Audio.Sound.createAsync(
      require('@/assets/audio/owenmarshall_allistrums.mp3'),
    )
      .then(({ sound }) => {
        setSound(sound);
      })
      .catch((error) => {
        setError(error);
      });
  }

  async function playPause() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  }
  useEffect(() => {
    if (!sound) {
      loadSound();
    }
  }, [sound]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Audio test</ThemedText>
      </ThemedView>
      <ThemedView>
        <Pressable onPress={() => playPause()}>
          <ThemedText type="defaultSemiBold">
            {isPlaying ? 'Pause sound' : 'Play sound'}
          </ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedView>
        <ThemedText>{`Error: ${error.length ? error : 'None'}`}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
