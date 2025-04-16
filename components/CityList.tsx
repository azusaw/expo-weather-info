import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CityLocations from "@/assets/json/city-location.json";
import Colors from "@/constants/Colors";
import { Text, View } from "./Themed";
import { useLocationStore } from "@/store/useLocationStore";

const CityList = React.memo(({ onClose }: { onClose: () => void }) => {
  const { setLocation } = useLocationStore();
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>();

  const onSelect = async (index: number) => {
    setSelectedCityIndex(index); // for showing active color
    await setLocation(CityLocations[index]);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuBox}>
        {CityLocations.map(({ name }, index) => (
          <TouchableOpacity key={name} onPress={() => onSelect(index)}>
            <View
              style={
                index === selectedCityIndex
                  ? styles.activeItem
                  : styles.menuItem
              }
            >
              <Text size={18}>{name}</Text>
            </View>
            {index < CityLocations.length - 1 && <View style={styles.border} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginHorizontal: "auto",
    width: "100%",
    maxWidth: 400,
  },
  menuBox: {
    position: "absolute",
    bottom: 50,
    right: 5,
    width: 220,
    borderRadius: 5,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  menuItem: {
    padding: 15,
    borderRadius: 5,
  },
  activeItem: {
    padding: 15,
    backgroundColor: Colors.primary.default,
    borderLeftWidth: 6,
    borderLeftColor: Colors.secondary.default,
  },
  border: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.primary.default,
  },
});

export default CityList;
