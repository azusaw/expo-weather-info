import { useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Menu, MenuItem } from "@ui-kitten/components";
import CityCoords from "@/assets/json/city-coords.json";
import { View } from "./Themed";

const CityList = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [selectedCityIndex, setSelectedCityIndex] = useState<IndexPath>();

  const onSelect = (index: IndexPath) => {
    setSelectedCityIndex(index);
    //TODO: set selected city to data store
    onClose();
  };

  return (
    isVisible && (
      <View style={styles.container}>
        <Menu
          style={styles.menuBox}
          selectedIndex={selectedCityIndex}
          onSelect={onSelect}
        >
          {CityCoords.map(({ name }) => (
            <MenuItem key={name} title={name} />
          ))}
        </Menu>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    right: 0,
    borderRadius: 5,
  },
  menuBox: {
    width: 200,
    fontSize: 24,
    borderRadius: 5,
  },
});

export default CityList;
