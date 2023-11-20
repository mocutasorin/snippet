import {
  Animated,
  Text,
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef } from "react";

const BG_COLOR = "#121b22";
const BG_COLOR_BAR = "#202c34";
const WHITE_COLOR = "#fff";
const GRAY_TEXT = "#949fa6";
const PRIMARY_COLOR = "#24a784";
const BORDER_COLOR = "#0c141b";
const AVATAR_MAX_HEIGHT = 144;
const AVATAR_MIN_HEIGHT = 55;
const ACTIONS_BAR_MAX_HEIGHT = 122;
const ACTIONS_BAR_MIN_HEIGHT = 63;
const fakeImages = Array.from({ length: 10 }, (_, index) => ({
  key: index.toString(),
}));

function generateRandomColor() {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  return `rgb(${x}, ${y}, ${z})`;
}

const _renderItem = ({ item, index }) => (
  <View
    key={index}
    style={{
      backgroundColor: generateRandomColor(),
      borderRadius: 10,
      height: 120,
      marginBottom: 10,
      marginLeft: index === 0 ? 20 : 0,
      width: 120,
    }}
  />
);

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  // TOP BAR ANIMATIONS

  const actionsBarHeight = scrollY.interpolate({
    inputRange: [0, ACTIONS_BAR_MAX_HEIGHT],
    outputRange: [ACTIONS_BAR_MAX_HEIGHT, ACTIONS_BAR_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const actionsBarOpacity = scrollY.interpolate({
    inputRange: [0, ACTIONS_BAR_MAX_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const nameBarOpacity = scrollY.interpolate({
    inputRange: [0, ACTIONS_BAR_MAX_HEIGHT / 2.5, ACTIONS_BAR_MAX_HEIGHT],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const nameBarTranslateX = scrollY.interpolate({
    inputRange: [0, ACTIONS_BAR_MAX_HEIGHT],
    outputRange: [60, 110],
    extrapolate: "clamp",
  });

  const nameBarTranslateY = scrollY.interpolate({
    inputRange: [0, ACTIONS_BAR_MAX_HEIGHT],
    outputRange: [40, 0],
    extrapolate: "clamp",
  });

  // AVATAR ANIMATIONS

  const avatarImageTop = scrollY.interpolate({
    inputRange: [0, ACTIONS_BAR_MAX_HEIGHT],
    outputRange: [16, -(AVATAR_MIN_HEIGHT / 2) * 1.45],
    extrapolate: "clamp",
  });

  const avatarImageScale = scrollY.interpolate({
    inputRange: [0, ACTIONS_BAR_MAX_HEIGHT],
    outputRange: [1, 0.35],
    extrapolate: "clamp",
    useNativeDriver: true,
  });
  const avatarImageTranslateX = scrollY.interpolate({
    inputRange: [0, ACTIONS_BAR_MAX_HEIGHT],
    outputRange: [(width - AVATAR_MAX_HEIGHT) / 2, 20],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: WHITE_COLOR,
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : 45,
      }}
    >
      <View style={{ backgroundColor: BG_COLOR, flex: 1 }}>
        <Animated.View
          style={{
            borderRadius: AVATAR_MAX_HEIGHT / 2,
            height: AVATAR_MAX_HEIGHT,
            width: AVATAR_MAX_HEIGHT,
            overflow: "hidden",
            position: "absolute",
            marginTop: avatarImageTop,
            transform: [
              {
                scale: avatarImageScale,
              },
              {
                translateX: avatarImageTranslateX,
              },
            ],
          }}
        >
          <Image
            source={require("./assets/logo.jpg")}
            style={{
              flex: 1,
              height: null,
              width: null,
            }}
          />
        </Animated.View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingTop: 18,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color={WHITE_COLOR} />
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color={WHITE_COLOR}
          />
        </View>
        {/* ACTIONS BAR BACKGROUND */}
        <Animated.View
          style={{
            backgroundColor: BG_COLOR_BAR,
            flexDirection: "row",
            justifyContent: "space-between",
            height: AVATAR_MAX_HEIGHT,
            paddingHorizontal: 15,
            paddingTop: 18,
            height: actionsBarHeight,
            opacity: actionsBarOpacity,
            position: "relative",
            zIndex: -1,
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateX: nameBarTranslateX,
                },
                {
                  translateY: nameBarTranslateY,
                },
              ],
              opacity: nameBarOpacity,
            }}
          >
            <Text style={{ color: WHITE_COLOR, fontSize: 20 }}>
              Sorin Mocuta
            </Text>
          </Animated.View>
        </Animated.View>
        <View style={{ flex: 1 }}>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            contentContainerStyle={{
              paddingTop: AVATAR_MIN_HEIGHT,
            }}
            style={{
              flex: 1,
            }}
          >
            {/* GROUP DETAILS SECTION */}
            <View style={{ alignItems: "center", paddingBottom: 10 }}>
              <Text style={{ color: WHITE_COLOR, fontSize: 30 }}>
                Sorin Mocuta
              </Text>
              <Text
                style={{ color: GRAY_TEXT, fontSize: 20, paddingVertical: 6 }}
              >
                +01 234 567 890
              </Text>
              <Text style={{ color: GRAY_TEXT, paddingVertical: 6 }}>
                Last seen today at 10:59
              </Text>
              <View style={{ flexDirection: "row", paddingTop: 4 }}>
                <Pressable style={{ alignItems: "center", margin: 20 }}>
                  <Ionicons name="call" size={32} color={PRIMARY_COLOR} />
                  <Text
                    style={{
                      color: PRIMARY_COLOR,
                      fontSize: 20,
                      fontWeight: "700",
                      marginTop: 16,
                    }}
                  >
                    Audio
                  </Text>
                </Pressable>
                <Pressable style={{ alignItems: "center", margin: 20 }}>
                  <Ionicons name="videocam" size={32} color={PRIMARY_COLOR} />
                  <Text
                    style={{
                      color: PRIMARY_COLOR,
                      fontSize: 20,
                      fontWeight: "700",
                      marginTop: 16,
                    }}
                  >
                    Video
                  </Text>
                </Pressable>
                <Pressable style={{ alignItems: "center", margin: 20 }}>
                  <Ionicons name="search" size={32} color={PRIMARY_COLOR} />
                  <Text
                    style={{
                      color: PRIMARY_COLOR,
                      fontSize: 20,
                      fontWeight: "700",
                      marginTop: 16,
                    }}
                  >
                    Search
                  </Text>
                </Pressable>
              </View>
            </View>
            {/* GROUP DESCRIPTION SECTION */}
            <View
              style={{
                borderTopWidth: 10,
                borderBottomWidth: 10,
                borderColor: BORDER_COLOR,
                paddingBottom: 20,
                paddingHorizontal: 20,
                paddingTop: 30,
              }}
            >
              <Text
                style={{
                  color: PRIMARY_COLOR,
                  fontSize: 21,
                  fontWeight: 600,
                }}
              >
                Add group description
              </Text>
              <Text style={{ color: GRAY_TEXT, fontSize: 18, marginTop: 10 }}>
                Created by Lance, 2 Aug 2023
              </Text>
            </View>
            {/* MEDIA LINKS AND DOCS SECTION */}
            <View
              style={{
                borderBottomWidth: 10,
                borderColor: BORDER_COLOR,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 16,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color: GRAY_TEXT,
                    fontSize: 18,
                    fontWeight: 600,
                    marginTop: 10,
                  }}
                >
                  Media, links and docs
                </Text>
                <Text
                  style={{
                    color: GRAY_TEXT,
                    fontSize: 18,
                    fontWeight: 600,
                    marginTop: 10,
                  }}
                >
                  108 {">"}
                </Text>
              </View>
              <FlatList
                style={{ flex: 1 }}
                horizontal
                data={fakeImages}
                renderItem={_renderItem}
                ItemSeparatorComponent={() => (
                  <View style={{ width: 8 }}></View>
                )}
              />
            </View>
            {/* OPTIONS SECTION */}
            <View>
              <Pressable
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  paddingVertical: 25,
                  paddingHorizontal: 30,
                }}
              >
                <Ionicons
                  name="notifications-sharp"
                  size={24}
                  color={GRAY_TEXT}
                />
                <View style={{ paddingHorizontal: 30 }}>
                  <Text style={{ color: WHITE_COLOR, fontSize: 20 }}>
                    Mute notifications
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  paddingVertical: 25,
                  paddingHorizontal: 30,
                }}
              >
                <Ionicons
                  name="musical-note-sharp"
                  size={24}
                  color={GRAY_TEXT}
                />
                <View style={{ paddingHorizontal: 30 }}>
                  <Text style={{ color: WHITE_COLOR, fontSize: 20 }}>
                    Custom notifications
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  paddingVertical: 25,
                  paddingHorizontal: 30,
                }}
              >
                <Ionicons name="image-sharp" size={24} color={GRAY_TEXT} />
                <View style={{ paddingHorizontal: 30 }}>
                  <Text style={{ color: WHITE_COLOR, fontSize: 20 }}>
                    Media visibility
                  </Text>
                  <Text style={{ color: GRAY_TEXT }}>Off</Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  paddingVertical: 25,
                  paddingHorizontal: 30,
                }}
              >
                <Ionicons name="bookmark-sharp" size={24} color={GRAY_TEXT} />
                <View style={{ paddingHorizontal: 30 }}>
                  <Text style={{ color: WHITE_COLOR, fontSize: 20 }}>
                    Kept messages
                  </Text>
                  <Text style={{ color: GRAY_TEXT }}>
                    Only admins can keep or unkeep messages in this group sdfsdf
                    sdf sdf
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  paddingVertical: 25,
                  paddingHorizontal: 30,
                }}
              >
                <Ionicons name="image-sharp" size={24} color={GRAY_TEXT} />
                <View style={{ paddingHorizontal: 30 }}>
                  <Text style={{ color: WHITE_COLOR, fontSize: 20 }}>
                    Encryption
                  </Text>
                  <Text style={{ color: GRAY_TEXT }}>
                    Messages and calls are end-to-end encrypted. Tap to learn
                    more
                  </Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionIcons: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.5)",
    borderRadius: 19,
    justifyContent: "center",
    height: 38,
    width: 38,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerLinear: {
    height: 100,
    width: "100%",
    backgroundColor: "skyblue",
    position: "absolute",
    paddingTop: 50,
    top: 0,
  },
});
