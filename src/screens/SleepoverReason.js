import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert, // Alert API 추가
} from "react-native";
import vars from "../vars";
import BlueButton from "../components/BlueButton";

const SleepoverReason = ({ navigation, route }) => {
  const { startDate, endDate, reason: initialReason } = route.params;
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

  useEffect(() => {
    if (initialReason) {
      if (reasons.includes(initialReason)) {
        setSelectedReason(initialReason);
      } else {
        setSelectedReason("직접 입력");
        setCustomReason(initialReason);
      }
    }
  }, [initialReason]);

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    if (reason !== "직접 입력") {
      setCustomReason("");
    }
  };

  const handleNext = () => {
    if (!selectedReason) {
      Alert.alert("외박 사유", "외박 사유를 체크해주세요."); // 경고 메시지 표시
      return;
    }

    const reasonToSend =
      selectedReason === "직접 입력" ? customReason : selectedReason;
    navigation.navigate("SleepoverCheck", {
      reason: reasonToSend,
      startDate,
      endDate,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>어떤 이유로 외박하나요?</Text>

        <View style={styles.choose}>
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
                  selectedReason === reason
                    ? styles.selectedCircle
                    : styles.circle
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
        </View>

        <BlueButton style={styles.width} onPress={handleNext}>
          <Text style={styles.buttonText}>다 음</Text>
        </BlueButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 40 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 40 },
  choose: {
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  radioText: { fontSize: 16 },
  circle: {
    height: 26,
    width: 26,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#B3B3B3",
  },
  selectedCircle: {
    height: 26,
    width: 26,
    borderRadius: 16,
    backgroundColor: "#01509F",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  width: {
    width: vars.width_90,
    marginBottom: 16,
  },
});

export default SleepoverReason;
