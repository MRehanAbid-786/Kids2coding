import { useRouter } from "expo-router";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { AppText } from "../src/components/AppText";
import { ScreenWrapper } from "../src/components/ScreenWrapper";
import { Colors } from "../src/constants/colors";

const games = [
  { id: 1, title: "Code Runner", emoji: "🏃", description: "Run through code challenges", color: Colors.game1 },
  { id: 2, title: "Bug Squasher", emoji: "🐛", description: "Find and fix bugs in code", color: Colors.game2 },
  { id: 3, title: "Syntax Puzzle", emoji: "🧩", description: "Arrange code in the right order", color: Colors.game3 },
  { id: 4, title: "Memory Match", emoji: "🧠", description: "Match coding concepts", color: Colors.game4 },
  { id: 5, title: "Logic Maze", emoji: "🎯", description: "Solve logic puzzles with code", color: Colors.game5 },
  { id: 6, title: "Algorithm Race", emoji: "🏎️", description: "Race to solve algorithms", color: Colors.primary },
];

export default function GamesScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper scrollable>
      <View style={styles.header}>
        <AppText style={styles.title}>Coding Games 🎮</AppText>
        <AppText style={styles.subtitle}>Learn to code by playing fun games!</AppText>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.gamesGrid}>
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[styles.gameCard, { backgroundColor: game.color }]}
              onPress={() => router.push(`/games/${game.id}`)}
            >
              <AppText style={styles.gameEmoji}>{game.emoji}</AppText>
              <AppText style={styles.gameTitle}>{game.title}</AppText>
              <AppText style={styles.gameDescription}>{game.description}</AppText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  gameEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  gameDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
});