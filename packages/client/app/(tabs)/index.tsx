import { FeedView } from "@/components/FeedView";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <FeedView />
    </ScrollView>
  );
}
