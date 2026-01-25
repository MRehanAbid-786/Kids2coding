import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing
} from "react-native";
import { AppButton } from "../src/components/AppButton";
import { AppText } from "../src/components/AppText";
import { ScreenWrapper } from "../src/components/ScreenWrapper";
import { Colors } from "../src/constants/colors";
import { useEffect, useRef } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <ImageBackground
      source={require("../assets/home-bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Animated.View style={[styles.titleContainer, { transform: [{ translateY: bounceAnim }] }]}>
            <AppText style={styles.title}>Kids 2 Coding</AppText>
            <Animated.View style={{ opacity: floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }}>
              <AppText style={styles.subtitle}>Where Imagination Meets Code!</AppText>
            </Animated.View>
          </Animated.View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <AppButton
              title="🚀 Start Learning Adventure!"
              onPress={() => router.push("/dashboard")}
              style={styles.startButton}
              textStyle={styles.buttonText}
            />
            <AppButton
              title="🎮 Play Coding Games"
              onPress={() => router.push("/games")}
              style={styles.secondaryButton}
              textStyle={styles.secondaryButtonText}
            />
            <AppButton
              title="⭐ See Progress"
              onPress={() => router.push("/progress")}
              style={styles.tertiaryButton}
              textStyle={styles.tertiaryButtonText}
            />
          </View>
        </View>
      </View>
      <View style={styles.features}>
            <View style={styles.featureItem}>
              <AppText style={styles.featureEmoji}>🎯</AppText>
              <AppText style={styles.featureText}>Fun Lessons</AppText>
            </View>
            <View style={styles.featureItem}>
              <AppText style={styles.featureEmoji}>🏆</AppText>
              <AppText style={styles.featureText}>Earn Badges</AppText>
            </View>
            <View style={styles.featureItem}>
              <AppText style={styles.featureEmoji}>🤖</AppText>
              <AppText style={styles.featureText}>AI Assistant</AppText>
            </View>
          </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  content: {
    flex: 1,
    justifyContent: "space-around",
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 42,
    padding: 13,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 150, 255, 0.3)'
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textLight,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
    elevation: 8,
    transform: [{ scale: 1 }],
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: '600',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  tertiaryButtonText: {
    fontSize: 18,
    color: Colors.accent,
    fontWeight: '600',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    paddingBottom: 45
  },
  featureItem: {
    alignItems: 'center',

  },
  featureEmoji: {
    fontSize: 32,
    marginBottom: 5,
    padding: 5
  },
  featureText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
});