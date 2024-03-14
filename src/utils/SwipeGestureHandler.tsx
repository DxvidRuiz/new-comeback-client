import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


type prpos = {
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  children: any
  swipeDistance?: number
}

const SwipeGestureHandler = ({ swipeDistance = 10, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, children }: prpos) => {
  const swipeGesture = Gesture.Pan()
    .minDistance(swipeDistance) // Configura la distancia mínima para activar el gesto
    .onEnd((event) => {
      const { translationX, translationY } = event;

      if (Math.abs(translationX) > Math.abs(translationY)) {
        // Movimiento horizontal
        if (translationX > 0) {
          onSwipeRight && onSwipeRight();
        } else {
          onSwipeLeft && onSwipeLeft();
        }
      } else {
        // Movimiento vertical
        if (translationY > 0) {
          onSwipeDown && onSwipeDown();
        } else {
          onSwipeUp && onSwipeUp();
        }
      }
    });

  return (
    <GestureDetector
      gesture={swipeGesture}>
      {children}
    </GestureDetector>
  );
};

export default SwipeGestureHandler;
