import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BlueButton from "../components/BlueButton";

const SleepoverReason = ({ navigation }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState("");

  const reasons = [
    "본가에 방문해요.",
    "교내 활동이 있어요. (MT 등)",
    "아르바이트를 하러 가요.",
    "개인적인 약속이 있어요.",
    "여행을 가요.",
    "직접 입력",
  ];

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  const handleNext = () => {
    const reasonToSend =
      selectedReason === "직접 입력" ? customReason : selectedReason;
    navigation.navigate("SleepoverCheck", { reason: reasonToSend }); // 선택한 사유 전달
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떤 이유로 외박하나요?</Text>
      <Text style={styles.subtitle}>외박 사유</Text>

      {reasons.map((reason, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioButton}
          onPress={() => handleReasonSelect(reason)}
        >
          <Text style={styles.radioText}>{reason}</Text>
          <View
            style={
              selectedReason === reason ? styles.selectedCircle : styles.circle
            }
          />
        </TouchableOpacity>
      ))}

      {selectedReason === "직접 입력" && (
        <TextInput
          style={styles.input}
          placeholder="외박 사유를 작성해주세요."
          value={customReason}
          onChangeText={setCustomReason}
        />
      )}

      <BlueButton onPress={handleNext}>
        <Text style={styles.buttonText}>다 음</Text>
      </BlueButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 10 },
  radioButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  radioText: { fontSize: 16 },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#01509F",
  },
  selectedCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#01509F",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
});

export default SleepoverReason;
