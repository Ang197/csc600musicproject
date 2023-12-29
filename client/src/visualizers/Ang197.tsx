// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const LaunchPadVisualizer = new Visualizer(
  'LaunchPadVisualizer',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.max(width, height);

    p5.background(0, 0, 0, 255);
    // p5.fill(255, 255, 255, 0);

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, (values.length - 1), width, width*3);
      const y = (height / 2) + (amplitude*1.3) * (-1*height);
      p5.strokeWeight(dim * 0.0010);
      p5.stroke(255, 255, 255, 255);
      p5.line((x-width*1.5), (height*0.5), (x * 0.2), (y));
    }
    p5.endShape();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, (values.length - 1), width, width*3);
      const y = (height / 2) + (amplitude*1.3) * (height);
      p5.strokeWeight(dim * 0.0010);
      p5.stroke(255, 255, 255, 255);
      p5.line((x-width*1.5), (height*0.5), (x * 0.2), (y));
    }
    p5.endShape();
  },
);