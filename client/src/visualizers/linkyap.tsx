//3rd party imports
import * as Tone from 'tone';
import Sketch from 'react-p5';
import P5 from 'p5';
import React, { useEffect, useMemo, useCallback } from 'react';

type VisualizerDrawer = (p5: P5, analyzer: Tone.Analyser) => void;

interface VisualizerContainerProps {
    visualizer: Visualizer;
}

export class Visualizer {
    public readonly name: string;
    public readonly draw: VisualizerDrawer;

    constructor(name: string, draw: VisualizerDrawer) {
        this.name = name;
        this.draw = draw;
    }
}

export function VisualizerContainer({ visualizer }: VisualizerContainerProps) {
    const { name, draw } = visualizer;

    const analyzer: Tone.Analyser = useMemo(
        () => new Tone.Analyser('waveform', 256),
        [],
    );

    const onResize = useCallback((p5: P5) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        p5.resizeCanvas(width, height, false);
    }, []);

    useEffect(() => {
        Tone.getDestination().volume.value = -5;
        Tone.getDestination().connect(analyzer);
        return () => {
            Tone.getDestination().disconnect(analyzer);
        };
    }, [analyzer]);

    const setup = (p5: P5, canvasParentRef: Element) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        p5.createCanvas(width, height).parent(canvasParentRef);
    };

    return (
        <div className={'bg-black absolute bottom-0 right-0 left-0 h-50'}>
            <div className={'z-1 absolute left-0 top-0 pa4 white f5'}>{name}</div>
            <Sketch
                setup={setup}
                draw={p5 => draw(p5, analyzer)}
                windowResized={onResize}
            />
        </div>
    );
}

//  draw function for a kaleidoscope
function kaleidoscopeDraw(p5: P5, analyzer: Tone.Analyser) {
    // p5.clear(0,0,0,0);
    const numSlices = 20; // # of symmetrical slices
    const numLayers = 15;  // # of layers
    const baseRadius = p5.width / 45; // base radius for the innermost layer
    const waveform = analyzer.getValue(); // get waveform data

    if (!(waveform instanceof Float32Array)) {
        return;
    }

    const amplitude = waveform.reduce((acc, val) => acc + Math.abs(val), 0) / waveform.length;
    let isMusicPlaying = amplitude > 0.05; // is music playing?

    p5.translate(p5.width / 2.5, p5.height / 2); // move to center, if width id horiantal, vertical is hieght

    for (let layer = 0; layer < numLayers; layer++) {
        for (let i = 0; i < numSlices; i++) {
            p5.push();
            p5.rotate((p5.TWO_PI / numSlices) * i); // rotate for symmetry between shapes

            let radiusOffset = layer * baseRadius / 2; // offfset each layer
            let radius = baseRadius + radiusOffset;
            let size = (radius / numLayers) * (layer + 1); // size based on layer


            let shapeType = isMusicPlaying ? Math.floor(p5.random(6)) : layer % 6; // different shapes on differeny lsyers
            switch (shapeType) {
                case 0: // circle
                    p5.ellipse(radius, 0, size, size);
                    break;
                case 3: // oval
                    p5.ellipse(radius, 0, size, size / 2);
                    break;
                case 5: // square
                    p5.rect(radius - size / 2, -size / 2, size, size);
                    break;
                case 1: // diamond
                    p5.quad(radius - size / 2, 0, radius, -size / 2, radius + size / 2, 0, radius, size / 2);
                    break;
                case 4: // triangle
                    p5.triangle(radius - size, radius - size, radius, radius + size, radius + size, radius - size);
                    break;
                case 2: // hexagon
                    drawHexagon(p5, radius, 0, size / 2);
                    break;
                default:
                    p5.ellipse(radius, 0, size, size);
            }

            p5.pop();
        }
    }
}

// draw a hexagon
function drawHexagon(p5: P5, x: number, y: number, radius: number) {
    p5.beginShape();
    for (let i = 0; i < 6; i++) {
        let angle = p5.TWO_PI / 6 * i;
        let xVertex = x + radius * p5.cos(angle);
        let yVertex = y + radius * p5.sin(angle);
        p5.vertex(xVertex, yVertex);
    }
    p5.endShape(p5.CLOSE);
}

// create a new visualizer instance to use
export const KaleidoscopeVisualizer = new Visualizer('Kaleidoscope', kaleidoscopeDraw);

