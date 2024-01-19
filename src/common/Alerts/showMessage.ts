import { hideMessage, showMessage } from "react-native-flash-message";
import { COLORS } from "../../styles/colors";

interface CreateAlarmParams {
  message: string;
  description?: string;
  type: "success" | "danger" | "warning" | "info";
  duration?: number;
}

export const successAlarm = ({
  message,
  type,
  duration = 3000,
}: CreateAlarmParams) => {

  showMessage({
    message,
    description:
      type,
    icon: `${type}`,
    duration,
    floating: true
    ,
    style: { borderCurve: "circular" },
    backgroundColor: COLORS.primary02

  });

  const timeout = setTimeout(() => {
    hideMessage();
  }, duration);

  return () => {
    clearTimeout(timeout);

  };
}


