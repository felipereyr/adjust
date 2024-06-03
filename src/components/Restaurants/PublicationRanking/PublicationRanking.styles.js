import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 125,
    resizeMode: "center",
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  medal: {
    marginRight: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#828282",
    fontSize: 12,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 5,
  },
});
