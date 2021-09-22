import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  logo: {
    width: 305,
    height: 159,
  },
  datatable: {
    width: "100%",
  },
  datatableCellKey: {
    flex: 2,
  },
  datatableCellValue: {
    flex: 5,
  },
  datatableSurface: {
    margin: 10,
    padding: 8,
    height: "100",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  modalObservation: {
    backgroundColor: "white",
    width: "80%",
    height: "60%",
    padding: 20,
  },
});
