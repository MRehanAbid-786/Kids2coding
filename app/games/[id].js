import { useLocalSearchParams } from "expo-router";
import { ScreenWrapper } from "../../src/components/ScreenWrapper";
import { AppText } from "../../src/components/AppText";
import { View, StyleSheet } from "react-native";

import CodeRunner from "../../src/games/CodeRunner";

export default function GameScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScreenWrapper scrollable>
      {id === "1" && <CodeRunner />}

      {id !== "1" && (
        <View style={styles.center}>
          <AppText style={{ fontSize: 22 }}>Coming Soon 🚧</AppText>
        </View>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
