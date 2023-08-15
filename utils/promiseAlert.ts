import { Alert } from "react-native";

type promiseAlertProps = {
  title: string;
  message: string;
  buttonConfirmTitle: string;
  buttonRejectTitle: string;
};

export const promiseAlert = ({
  title,
  message,
  buttonConfirmTitle,
  buttonRejectTitle,
}: promiseAlertProps) => {
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: buttonRejectTitle, onPress: () => resolve(false) },
        { text: buttonConfirmTitle, onPress: () => resolve(true) },
      ],
      {
        cancelable: true,
      }
    );
  });
};

// function wrappedAlert() {
//   return new Promise(resolve => {
//     Alert.alert(
//                 "No connection",
//                 "Message",
//                  [{text: "OK", onPress: function() { resolve(); }}], // I want this function to make Saga continue
//                  {cancelable: true, onDismiss: function() {resolve(); }},
//             )
//     });
// }
