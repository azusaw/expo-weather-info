import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CityCoords from "@/assets/json/city-coords.json";
import { Text, View } from "./Themed";
import Colors from "@/constants/Colors";

const CityList = React.memo(({ onClose }: { onClose: () => void }) => {
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>();

  const onSelect = (index: number) => {
    setSelectedCityIndex(index);
    //TODO: set selected city to data store
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuBox}>
        {CityCoords.map(({ name }, index) => (
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
            {index < CityCoords.length - 1 && <View style={styles.border} />}
          </TouchableOpacity>
          // <MenuItem style={styles.menuItem} key={name} title={name} />
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
