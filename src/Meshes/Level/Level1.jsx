import Brick from "../Brick";
import { useEffect } from "react";
import { Html } from "@react-three/drei";
import React, { Fragment } from "react";

export default function Level1({ bricks }) {
  const line1Y = 20;
  const line2Y = 25;
  const line3Y = 30;
  const line4Y = 35;
  const line5Y = 40;

  const bricksPositions = [
    [-15, line1Y, 0],
    [0, line1Y, 0],
    [15, line1Y, 0],
    [-30, line1Y, 0],
    [30, line1Y, 0],
    [-20, line2Y, 0],
    [-5, line2Y, 0],
    [10, line2Y, 0],
    [-35, line2Y, 0],
    [25, line2Y, 0],
    [-15, line3Y, 0],
    [15, line3Y, 0],
    [-30, line3Y, 0],
    [0, line3Y, 0],
    [30, line3Y, 0],
    [-20, line4Y, 0],
    [10, line4Y, 0],
    [-35, line4Y, 0],
    [-5, line4Y, 0],
    [25, line4Y, 0],
    [-15, line5Y, 0],
    [15, line5Y, 0],
    [-30, line5Y, 0],
    [0, line5Y, 0],
    [30, line5Y, 0],
  ];

  return (
    <>
      <group>
        {bricksPositions.map((position, index) =>
          bricks.includes(index + 1) ? (
            <React.Fragment key={index + 1}>
              <Brick position={position} id={index + 1} brickId={index + 1} />
              <Html position={position}>{index + 1}</Html>
            </React.Fragment>
          ) : null
        )}
      </group>
    </>
  );
}
