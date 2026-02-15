import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, ScrollView, Image, StyleSheet } from "react-native";

export default function AlgorithmRaceGame() {
  const [player, setPlayer] = useState({
    name: "Player1",
    avatar: "https://via.placeholder.com/40",
    points: 0,
    currency: 0,
    achievements: [] as string[],
  });

  const [currentView, setCurrentView] = useState<"lobby" | "challenge" | "feedback">("lobby");
  const [currentChallenge, setCurrentChallenge] = useState<null | any>(null);
  const [inputValue, setInputValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [feedback, setFeedback] = useState<null | any>(null);

  // --- Sample challenges ---
  const challenges = [
    {
      title: "Bubble Sort",
      statement: "Sort the array [5,2,9,1,5] using Bubble Sort.",
      correctSolution: "[1,2,5,5,9]",
      explanation: "Compare each element and swap iteratively.",
      timeLimit: 120,
    },
    {
      title: "Fibonacci",
      statement: "Find the 6th Fibonacci number.",
      correctSolution: "8",
      explanation: "Fibonacci sequence: 0,1,1,2,3,5,8...",
      timeLimit: 90,
    },
  ];
  useEffect(() => {
    if (currentView !== "challenge") return;
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, currentView]);

  // --- Handlers ---
  const startChallenge = (challenge: any) => {
    setCurrentChallenge(challenge);
    setTimeLeft(challenge.timeLimit);
    setInputValue("");
    setCurrentView("challenge");
    setFeedback(null);
  };

  const submitSolution = () => {
    if (!currentChallenge) return; // safety check
    const isCorrect = inputValue.trim() === currentChallenge.correctSolution;
    const pointsEarned = isCorrect ? 100 : 0;
    const currencyEarned = isCorrect ? 10 : 0;

    setPlayer(prev => ({
      ...prev,
      points: prev.points + pointsEarned,
      currency: prev.currency + currencyEarned,
      achievements: isCorrect ? [...prev.achievements, currentChallenge.title] : prev.achievements,
    }));

    setFeedback({
      isCorrect,
      solution: currentChallenge.correctSolution,
      explanation: currentChallenge.explanation,
      points: pointsEarned,
    });

    setCurrentView("feedback");
  };

  const backToLobby = () => {
    setCurrentView("lobby");
    setCurrentChallenge(null);
    setFeedback(null);
  };

  // --- Render ---
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Algorithm Race 🏁</Text>
        <View style={styles.playerInfo}>
          <Image source={{ uri: player.avatar }} style={styles.avatar} />
          <Text style={styles.playerText}>{player.name}</Text>
          <Text style={styles.playerText}>Points: {player.points}</Text>
        </View>
      </View>

      {currentView === "lobby" && (
        <View>
          <Text style={styles.subtitle}>Select a Challenge</Text>
          {challenges.map((c, idx) => (
            <Button key={idx} title={c.title} onPress={() => startChallenge(c)} />
          ))}

          <View style={{ marginTop: 20 }}>
            <Text style={styles.subtitle}>Player Stats</Text>
            <Text>Currency: {player.currency}</Text>
            <Text>Achievements: {player.achievements.join(", ") || "None"}</Text>
          </View>
        </View>
      )}

      {currentView === "challenge" && currentChallenge && (
        <View>
          <Text style={styles.subtitle}>{currentChallenge.title}</Text>
          <Text>{currentChallenge.statement}</Text>
          <Text style={{ marginVertical: 10 }}>Time Left: {timeLeft}s</Text>

          <TextInput
            style={styles.input}
            multiline
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Write your solution here..."
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Button title="Submit Solution" onPress={submitSolution} />
            <View style={{ width: 10 }} />
            <Button title="Give Up" onPress={backToLobby} color="red" />
          </View>
        </View>
      )}

      {currentView === "feedback" && feedback && (
        <View>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>
            {feedback.isCorrect ? "✅ Correct!" : "❌ Incorrect"}
          </Text>
          <Text>Points Earned: {feedback.points}</Text>
          <Text>Correct Solution: {feedback.solution}</Text>
          <Text>Explanation: {feedback.explanation}</Text>
          <Button title="Back to Lobby" onPress={backToLobby} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold",paddingTop:20,textAlign:"center" },
  playerInfo: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  playerText: { marginLeft: 10, fontSize: 16 },
  subtitle: { fontSize: 20, marginVertical: 10, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, minHeight: 80, marginBottom: 10 },
});
