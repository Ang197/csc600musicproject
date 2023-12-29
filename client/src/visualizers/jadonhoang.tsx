// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const AudioVisualizer = new Visualizer(
  'AudioVisualizer',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width) + p5.random(-20, 20);
      const y = height / 2 + amplitude * height + p5.random(-20, 20);

      p5.stroke(255, 255, 0);

      const weight = p5.map(Math.abs(amplitude), 0, 1, 1, dim * 0.01);
      p5.strokeWeight(weight + p5.random(-0.5, 0.5));
      p5.square(x, y, dim * 0.05 + p5.random(-2, 2));
    }
  },
);
