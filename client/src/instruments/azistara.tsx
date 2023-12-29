// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import { useState, useEffect } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Azistara's Vox instrument.
 ** ------------------------------------------------------------------------ */

interface PianoKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function PianoKey({
  note,
  synth,
  minor,
  index,
}: PianoKeyProps): JSX.Element {
  
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor, // minor keys are black
        'black bg-white h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      }}
    ></div>
  );
}

// eslint-disable-next-line
function PianoKeyWithoutJSX({
  note,
  synth,
  minor,
  index,
}: PianoKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `PianoKey` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function PianoType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "dim pointer ph2 pv1 ba mr2 br1 fw7 bw1",
        {
          "b--black black": active,
          "gray b--light-gray": !active,
        }
      )}>
      {title}
    </div>
  );
}

function Piano({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: "C", idx: 0 },
    { note: "Db", idx: 0.5 },
    { note: "D", idx: 1 },
    { note: "Eb", idx: 1.5 },
    { note: "E", idx: 2 },
    { note: "F", idx: 3 },
    { note: "Gb", idx: 3.5 },
    { note: "G", idx: 4 },
    { note: "Ab", idx: 4.5 },
    { note: "A", idx: 5 },
    { note: "Bb", idx: 5.5 },
    { note: "B", idx: 6 },
  ]);

  const [duoSynth, setDuoSynth] = useState<Tone.DuoSynth | null>(null);
  const [oscillator1, setOscillator1] = useState<Tone.ToneOscillatorType>("sine");
  const [oscillator2, setOscillator2] = useState<Tone.ToneOscillatorType>("triangle");
  const [modulationValue, setModulationValue] = useState<number>(0);

  /* Oscillators */

  /* Reset the oscillator back into a single synth */
const setOscillator: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  setSynth((oldSynth) => {
    oldSynth.disconnect();

    return new Tone.Synth({
      oscillator: { type: "triangle" } as Tone.OmniOscillatorOptions,
    }).toDestination();
  });
};

  /* Entire code rewritten to accomodate duoSynth */

  const setDuoOscillator = () => {
    if (duoSynth) {
      duoSynth.dispose();
    }

    const newDuoSynth = new Tone.DuoSynth().toDestination();
    newDuoSynth.voice0.oscillator.type = oscillator1 as Tone.ToneOscillatorType;
    newDuoSynth.voice1.oscillator.type = oscillator2 as Tone.ToneOscillatorType;

    setDuoSynth(newDuoSynth);

    // Use a type assertion here to specify the setSynth type as any for the time being
    setSynth(newDuoSynth as any); // Adjust the type as needed later
  };


  const oscillators: List<OscillatorType> = List([
    "sine",
    "sawtooth",
    "square",
    "triangle",
    "fmsine",
    "fmsawtooth",
    "fmtriangle",
    "amsine",
    "amsawtooth",
    "amtriangle",
  ]) as List<OscillatorType>;

  /* Piano Keys */

  return (
    <div className="pv4 overflow-x-scroll">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map((octave) =>
          keys.map((key) => {
            const isMinor = key.note.indexOf("b") !== -1;
            const note = `${key.note}${octave}`;
            return (
              <PianoKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          })
        )}
      </div>

      <div className="instrument-container" style={{ height: 70 }}>
        <p className="pl4 pt4 ">
          Instructions: Select an oscillator for voices 1 and 2 , and configure
          the modulation slider. Then select [Set Duo Oscillator] to apply your
          changes. The [Reset] button resets the oscillator back to triangle.
          <br></br>
          <br></br>
          <strong>WARNING:</strong> You must reset the synth before changing to a
          different instument.
        </p>

        <div className="oscillator-selector">
          <button onClick={setOscillator}>Reset</button>
          <h4 className="pl4 pt4 ">Voice 1</h4>
          <div className={"pl4 pt4 flex"}>
            {oscillators.map((o) => (
              <PianoType
                key={o}
                title={o}
                onClick={() => setOscillator1(o)}
                active={oscillator1 === o}
              />
            ))}
          </div>

          <h4 className="pl4 pt4 ">Voice 2</h4>
          <div className={"pl4 pt4 flex"}>
            {oscillators.map((o) => (
              <PianoType
                key={o}
                title={o}
                onClick={() => setOscillator2(o)}
                active={oscillator2 === o}
              />
            ))}
          </div>
        </div>

        <h3 className="pl4 pt4 ">Modulation</h3>
        <div className={"pl4 pt4 flex"}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={modulationValue}
            onChange={(e) => setModulationValue(parseFloat(e.target.value))}
          />
        </div>
        <br></br>
        <button onClick={setDuoOscillator}>Set Duo Oscillator</button>
      </div>
    </div>
  );
}

export const VoxInst = new Instrument('Vox', Piano);
