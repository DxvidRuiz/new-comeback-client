import { hideMessage, showMessage } from "react-native-flash-message";
import { COLORS } from "../../styles/colors";

interface CreateAlarmParams {
  title?: string;
  description?: string;
  duration?: number;
}

export const alarmsuccess = ({
  title,
  duration = 3000,
  description,
}: CreateAlarmParams) => {

  showMessage({
    message: title,
    description,
    iconProps: { tintColor: COLORS.primary },

    icon: "success",
    duration,
    floating: true
    ,
    style: {
      alignItems: "center", borderWidth: 4,
      borderLeftColor: COLORS.primary,
      borderBottomColor: COLORS.black,
      borderTopColor: COLORS.black,
      borderRightColor: COLORS.black,
    },
    backgroundColor: COLORS.black

  });

  const timeout = setTimeout(() => {
    hideMessage();
  }, duration);

  return () => {
    clearTimeout(timeout);

  };
}



export const alarmWarning = ({
  title,
  duration = 3000,
  description,

}: CreateAlarmParams) => {

  showMessage({
    message: title,
    iconProps: { tintColor: COLORS.error05 },
    description,

    icon: "warning",
    duration,
    // iconProps:{style:{backgroundColor: COLORS.error05},

    floating: true,
    type: "warning",
    color: COLORS.white,
    style: {
      alignItems: "center", borderWidth: 4, borderLeftColor: COLORS.error05,
      borderBottomColor: COLORS.black,
      borderTopColor: COLORS.black,
      borderRightColor: COLORS.black,
    },
    backgroundColor: COLORS.black

  });

  const timeout = setTimeout(() => {
    hideMessage();
  }, duration);

  return () => {
    clearTimeout(timeout);

  };
}

export const alarmError = ({
  title,
  duration = 3000,
  description,

}: CreateAlarmParams) => {

  showMessage({
    message: title,
    description,
    iconProps: { tintColor: COLORS.error05 },
    icon: "danger",
    duration,
    floating: true,
    type: "warning",
    color: COLORS.white,
    style: {
      alignItems: "center", borderWidth: 4, borderLeftColor: COLORS.error05,
      borderBottomColor: COLORS.black,
      borderTopColor: COLORS.black,
      borderRightColor: COLORS.black,
    },
    backgroundColor: COLORS.black

  });

  const timeout = setTimeout(() => {
    hideMessage();
  }, duration);

  return () => {
    clearTimeout(timeout);

  };
}


export const alarmInfo = ({
  title,
  description,

  duration = 3000,
}: CreateAlarmParams) => {

  showMessage({
    message: title,
    description,
    icon: "info",
    duration,
    floating: true
    ,
    style: {
      alignItems: "center", borderWidth: 4, borderLeftColor: COLORS.surface,
      borderBottomColor: COLORS.black,
      borderTopColor: COLORS.black,
      borderRightColor: COLORS.black,
    },
    backgroundColor: COLORS.black

  });

  const timeout = setTimeout(() => {
    hideMessage();
  }, duration);

  return () => {
    clearTimeout(timeout);

  };
}

