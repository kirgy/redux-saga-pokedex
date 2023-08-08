/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  Button as DefaultButton,
  useColorScheme,
  View as DefaultView,
  ButtonProps,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";

import Colors from "@/constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function Button({
  children,
  textProps,
  ...props
}: TouchableOpacityProps & {
  textProps?: TextProps;
  children: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      style={[
        {
          // flex: 1,
          borderWidth: 1,
          backgroundColor: "#dd3333",
          borderRadius: 5,
          paddingHorizontal: 20,
          paddingVertical: 5,
        },
        props.style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
        }}
        {...textProps}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
