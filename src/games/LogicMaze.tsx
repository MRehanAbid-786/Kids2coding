import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Modal } from 'react-native';

// Maze legend:
// 'S' = Start, 'F' = Finish, 0 = path, 1 = wall, '*' = collectible star, 'P' = puzzle
const initialMaze = [
  ['S', 0, 1, '*', 'P'],
  [1, 0, 1, 0, 1],
  ['*', 0, 0, 0, 1],
  [0, 1, '*', 0, 0],
  [0, 'P', 0, 1, 'F']
];

export default function LogicMazePro() {
  const [maze, setMaze] = useState(JSON.parse(JSON.stringify(initialMaze)));
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [path, setPath] = useState([{ row: 0, col: 0 }]);
  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(30);
  const [puzzleActive, setPuzzleActive] = useState(false);

  const movePlayer = (direction) => {
  if (puzzleActive) return; // cannot move while puzzle is active

  const { row, col } = playerPos;
  let newRow = row;
  let newCol = col;

  if (direction === 'up') newRow -= 1;
  if (direction === 'down') newRow += 1;
  if (direction === 'left') newCol -= 1;
  if (direction === 'right') newCol += 1;

  // Check boundaries
  if (newRow < 0 || newRow >= maze.length || newCol < 0 || newCol >= maze[0].length) return;

  const cell = maze[newRow][newCol];
  if (cell === 1) return; // wall

  if (movesLeft <= 0) {
    Alert.alert('❌ Out of moves!', 'Restart to try again.');
    return;
  }

  setMovesLeft(prev => prev - 1);

  const newMaze = maze.map(row => [...row]);

  // Collect star
  if (cell === '*') {
    setScore(prev => prev + 10);
    newMaze[newRow][newCol] = 0;
    setMaze(newMaze);
  }

  // **Update player position first**
  setPlayerPos({ row: newRow, col: newCol });
  setPath([...path, { row: newRow, col: newCol }]);

  // **Check finish AFTER updating position**
  if (cell === 'F') {
    Alert.alert(
      '🏆 Game Complete!',
      `Congratulations! Your score: ${score} | Moves left: ${movesLeft}`,
      [{ text: 'OK', onPress: resetGame }],
      { cancelable: false }
    );
  }

  // Puzzle handling
  if (cell === 'P') {
    setPuzzleActive(true);
  }
};

  // Solve puzzle
  const solvePuzzle = () => {
    Alert.alert('✅ Puzzle Solved!', 'You unlocked a new path!');
    setPuzzleActive(false);

    // Example: unlock a wall below the puzzle
    const newMaze = maze.map(row => [...row]);
    const { row, col } = playerPos;
    if (row + 1 < maze.length && newMaze[row + 1][col] === 1) newMaze[row + 1][col] = 0;
    setMaze(newMaze);
  };

  // Reset game
  const resetGame = () => {
    setMaze(JSON.parse(JSON.stringify(initialMaze)));
    setPlayerPos({ row: 0, col: 0 });
    setPath([{ row: 0, col: 0 }]);
    setScore(0);
    setMovesLeft(30);
    setPuzzleActive(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pro Logic Maze 🎯</Text>
      <Text style={styles.info}>Score: {score} | Moves left: {movesLeft}</Text>

      {/* Maze Grid */}
      <View style={styles.grid}>
        {maze.map((rowArr, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {rowArr.map((cell, colIndex) => {
              const isPlayer = playerPos.row === rowIndex && playerPos.col === colIndex;
              const isPath = path.some(p => p.row === rowIndex && p.col === colIndex);

              let bgColor = '#fff';
              if (cell === 1) bgColor = '#2d3436';
              if (cell === 'S') bgColor = '#6c5ce7';
              if (cell === 'F') bgColor = '#00b894';
              if (cell === '*') bgColor = '#fd79a8';
              if (cell === 'P') bgColor = '#ffeaa7';
              if (isPlayer) bgColor = '#fdcb6e';
              if (isPath && !isPlayer) bgColor = '#dfe6e9';

              return (
                <View key={colIndex} style={[styles.cell, { backgroundColor: bgColor }]}>
                  <Text style={styles.cellText}>
                    {cell === 0 || cell === 1 ? '' : cell}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={() => movePlayer('up')}><Text style={styles.buttonText}>↑</Text></TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.button} onPress={() => movePlayer('left')}><Text style={styles.buttonText}>←</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => movePlayer('down')}><Text style={styles.buttonText}>↓</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => movePlayer('right')}><Text style={styles.buttonText}>→</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.restartButton} onPress={resetGame}><Text style={styles.buttonText}>Restart 🔄</Text></TouchableOpacity>
      </View>

      {/* Puzzle Modal */}
      <Modal visible={puzzleActive} transparent animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalText}>Solve the puzzle to unlock the path!</Text>
          <TouchableOpacity style={styles.solveButton} onPress={solvePuzzle}>
            <Text style={styles.buttonText}>Solve Puzzle ✅</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', alignItems: 'center', paddingTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 18, marginBottom: 15 },
  grid: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row' },
  cell: { width: 60, height: 60, borderWidth: 1, borderColor: '#b2bec3', justifyContent: 'center', alignItems: 'center' },
  cellText: { fontSize: 18, fontWeight: 'bold' },
  controls: { marginTop: 30, alignItems: 'center' },
  button: { margin: 5, backgroundColor: '#6c5ce7', padding: 15, borderRadius: 10, minWidth: 60, alignItems: 'center' },
  restartButton: { marginTop: 15, backgroundColor: '#00b894', padding: 15, borderRadius: 10, minWidth: 120, alignItems: 'center' },
  buttonText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalText: { fontSize: 22, color: '#fff', marginBottom: 20, textAlign: 'center' },
  solveButton: { backgroundColor: '#fdcb6e', padding: 15, borderRadius: 10 },
});
