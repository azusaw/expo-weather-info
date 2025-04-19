import { Button, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

const ErrorContent = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <View>
    <Text size={42} weight={700} color={Colors.text.light}>
      Sorry...
    </Text>
    <Text size={22} color={Colors.text.light} style={styles.description}>
      {message}
    </Text>
    <Button title="Retry" onPress={onRetry} color={Colors.primary.dark} />
  </View>
);

const styles = StyleSheet.create({
  description: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default ErrorContent;
