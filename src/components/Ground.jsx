import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function Ground({ score, setScore }) {
  console.log("Rendeing"); // for debug purpose
  const [foodPosition, setFoodPosition] = useState({
    foodX: Math.floor(Math.random() * 25) + 1,
    foodY: Math.floor(Math.random() * 25) + 1,
  });

  const [gameOver, setGameOver] = useState(false);
  const [snakePosition, setSnakePosition] = useState({
    headX: 13,
    headY: 13,
  });

  const [snakeVelocity, setSnakeVelocity] = useState({
    velocityX: 0,
    velocityY: 0,
  });

  const [snakeBody, setSnakeBody] = useState([[13, 13]]);
  const speed = useRef(null);

  function foodGenerator() {
    let newFoodPosition;
    const gridSize = 25;
    const availablePositions = [];

    for (let x = 1; x <= gridSize; x++) {
      for (let y = 1; y <= gridSize; y++) {
        if (
          !snakeBody.some(([snakeX, snakeY]) => snakeX === x && snakeY === y)
        ) {
          availablePositions.push({ foodX: x, foodY: y });
        }
      }
    }

    if (availablePositions.length > 0) {
      newFoodPosition =
        availablePositions[
          Math.floor(Math.random() * availablePositions.length)
        ];
      setFoodPosition(newFoodPosition);
    } else {
      toast.success("You Win!");
      gameReset();
    }
  }

  function gameReset() {
    setGameOver(false);
    foodGenerator();
    setSnakePosition({ headX: 13, headY: 13 });
    setSnakeVelocity({ velocityX: 0, velocityY: 0 });
    setSnakeBody([[13, 13]]);
    setScore(0);
  }

  function changer(event) {
    const { velocityX, velocityY } = snakeVelocity;

    if (event.key === "ArrowUp" && velocityY !== 1) {
      setSnakeVelocity({ velocityX: 0, velocityY: -1 });
    }
    if (event.key === "ArrowDown" && velocityY !== -1) {
      setSnakeVelocity({ velocityX: 0, velocityY: 1 });
    }
    if (event.key === "ArrowLeft" && velocityX !== 1) {
      setSnakeVelocity({ velocityX: -1, velocityY: 0 });
    }
    if (event.key === "ArrowRight" && velocityX !== -1) {
      setSnakeVelocity({ velocityX: 1, velocityY: 0 });
    }
  }

  useEffect(() => {
    speed.current = setInterval(() => {
      setSnakePosition((prev) => ({
        headX: prev.headX + snakeVelocity.velocityX,
        headY: prev.headY + snakeVelocity.velocityY,
      }));

      setSnakeBody((prev) => {
        const newHead = [
          snakePosition.headX + snakeVelocity.velocityX,
          snakePosition.headY + snakeVelocity.velocityY,
        ];
        const newBody = [newHead, ...prev];
        if (
          newHead[0] === foodPosition.foodX &&
          newHead[1] === foodPosition.foodY
        ) {
          foodGenerator();
          setScore(score + 10);
        } else {
          newBody.pop();
        }
        return newBody;
      });
    }, 200);

    return () => clearInterval(speed.current);
  }, [snakeVelocity, snakePosition, foodPosition]);

  useEffect(() => {
    if (
      snakePosition.headX === 0 ||
      snakePosition.headX === 27 ||
      snakePosition.headY === 0 ||
      snakePosition.headY === 27 ||
      snakeBody.some(
        ([x, y], index) =>
          index !== 0 && x === snakePosition.headX && y === snakePosition.headY
      )
    ) {
      setGameOver(true);
      toast.error("GameOver");
      gameReset();
    }
  }, [snakePosition]);

  useEffect(() => {
    // Attach the event listener
    window.addEventListener("keydown", changer);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("keydown", changer);
    };
  }, [snakeVelocity]);

  return (
    <div className="grid grid-cols-26 grid-rows-26 h-full w-full">
      <div
        className="food bg-green-600 rounded-full"
        style={{
          gridColumnStart: foodPosition.foodX,
          gridRowStart: foodPosition.foodY,
        }}
      ></div>

      {snakeBody.map((element, index) => (
        <div
          key={index}
          className="food bg-red-600 "
          style={{
            gridColumnStart: element[0],
            gridRowStart: element[1],
          }}
        ></div>
      ))}
    </div>
  );
}

export default Ground;
