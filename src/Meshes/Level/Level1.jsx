import Brick from "../Brick";
import { useEffect } from "react";
import { Html } from "@react-three/drei";
import React, { Fragment } from "react";

export default function Level1({ bricks }) {
  const numRows = 8;
  const numBricksPerRow = 10;
  const brickSpacing = 5; // Par exemple, à ajuster selon vos besoins
  const startY = 40; // Position Y de départ pour la première ligne

  let bricksPositions = [];

  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    let y = startY - rowIndex * brickSpacing;

    for (let brickIndex = 0; brickIndex < numBricksPerRow; brickIndex++) {
      let xOffset = rowIndex % 2 === 0 ? 0 : brickSpacing / 2; // Pour décaler toutes les autres lignes
      let x =
        brickIndex * brickSpacing -
        (numBricksPerRow * brickSpacing) / 2 +
        xOffset; // Centre les briques

      bricksPositions.push([x, y, 0]);
    }
  }

  return (
    <>
      <group>
        {bricksPositions.map((position, index) =>
          bricks.includes(index + 1) ? (
            <React.Fragment key={index + 1}>
              <Brick position={position} id={index + 1} brickId={index + 1} />
              {/* <Html position={position}>{index + 1}</Html> */}
            </React.Fragment>
          ) : null
        )}
      </group>
    </>
  );
}
