// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const voxRandoma = new Visualizer(
  "Corcles",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dim = Math.min(width, height);

    p5.background(0); // Set background color

    const values = analyzer.getValue();

    const cols = 10; // Number of columns
    const rows = 10; // Number of rows

    const circleDiameter = dim / cols; // Diameter of each circle

    p5.stroke(255); // Set stroke color

    // Nested loops to create grid of circles
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const index = j * cols + i; // Calculate index from i and j

        const x = p5.map(
          i,
          0,
          cols - 1,
          circleDiameter / 2,
          width - circleDiameter / 2
        );
        const y = p5.map(
          j,
          0,
          rows - 1,
          circleDiameter / 2,
          height - circleDiameter / 2
        );

        const amplitude = values[index] as number; // Get amplitude from analyzer values

        const circleSize = amplitude * circleDiameter * 10; // Scale circle size based on amplitude

        // Draw circles at calculated positions
        p5.noFill();
        p5.ellipse(x, y, circleSize, circleSize);
      }
    }
  }
);
