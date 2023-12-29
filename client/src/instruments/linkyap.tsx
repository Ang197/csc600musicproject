// 3rd party library imports
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

// project imports
import { DispatchAction } from '../Reducer';
import { AppState } from '../State';

/** ------------------------------------------------------------------------ **
 * Contains base implementation of an Guitar.
 ** ------------------------------------------------------------------------ */

export interface InstrumentProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  name: string;
  synth: Tone.Synth;
  setSynth: (f: (oldSynth: Tone.Synth) => Tone.Synth) => void;
}

export class Instrument {
  public readonly name: string;
  public readonly component: React.FC<InstrumentProps>;

  constructor(name: string, component: React.FC<InstrumentProps>) {
    this.name = name;
    this.component = component;
  }
}

function TopNav({ name }: { name: string }) {
  return (
    <div className='w-100 h3 bb b--light-gray flex justify-between items-center ph4'>
      <div>{name}</div>
    </div>
  );
}

//guitar strings
interface GuitarStringProps {
  string: string;
  synth: Tone.Synth;
}

function GuitarString({ string, synth }: GuitarStringProps) {
    const frets = [0, 1, 2, 3, 4]; // five frets for each string
  // use tone.js to manipulate frequency based on fret
    const getNoteForFret = (fret: number): string => {
      return Tone.Frequency(string).transpose(fret).toNote();
    };
    // visual representation -- crude
    return (
      <div className='string' style={{ display: 'flex', flexDirection: 'column', flex: 1, margin: '0 2px' }}>
        {frets.map(fret => (
          <div
            key={`fret-${fret}`} //unique key for each fret
            onMouseDown={() => synth.triggerAttack(getNoteForFret(fret))}
            onMouseUp={() => synth.triggerRelease()}
            className='ba pointer dim'
            style={{
              backgroundColor: 'silver',
              flex: 1,
              borderBottom: fret === 4 ? 'none' : '1px solid black', 
              //gonna try to extend it out longer
            }}
          ></div>
        ))}
      </div>
    );
  }
  
  function Guitar({ synth }: InstrumentProps) {
    const strings = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];
    //standard tuning for guitar, six strings
    
    //image of guitar
    return (
      
      <div className="overflow-auto" style={{ width: '100%', height: '300px' }}> {/* width and hright of scroll*/}
      <div className='pv4' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* guitar Neck */}
        {/* guitar Neck */}
        <div style={{
          backgroundColor: '#b95a0799',
          border: '2px solid black',
          width: '60px', // width of neck
          height: '400px', // height to fit strings
          display: 'flex',
          justifyContent: 'space-evenly' //even string layout
        }}>
          {strings.map((string, stringIndex) => (
            <GuitarString
              key={`string-${stringIndex}`}
              string={string}
              synth={synth}
            />
          ))}
        </div>
  
        {/* guitar Body */}
        <div style={{
          backgroundColor: '#b95a0799',
          width: '200px', //width
          height: '300px', //height
          marginTop: '1rem',
          borderRadius: '50% / 20%', //shap guitar body
          border: '2px solid black',
        }}>
          {/* add more style to guitar here if i have time */}
        </div>
      </div>
      </div>
    );
  }
  
  
  

export const GuitarInstrument = new Instrument('Guitar', Guitar);

interface InstrumentContainerProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  instrument: Instrument;
}

export const InstrumentContainer: React.FC<InstrumentContainerProps> = ({
  instrument,
  state,
  dispatch,
}: InstrumentContainerProps) => {
  const InstrumentComponent = instrument.component;
  const [synth, setSynth] = useState(
    new Tone.Synth({
        oscillator: { type: 'sawtooth' }, // Changed to sawtooth for a more guitar-like sound
        envelope: {
          attack: 0.005, // Quick attack
          decay: 0.1, // Short decay
          sustain: 0.3, // Sustain level
          release: 1.2 // Gradual release
        }
    }).toDestination(),
  );

  const notes = state.get('notes');

  useEffect(() => {
    if (notes && synth) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        synth.triggerAttackRelease(value.note, '4n', time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    return () => {};
  }, [notes, synth, dispatch]);

  return (
    <div>
      <TopNav name={instrument.name} />
      <div className='bg-white absolute right-0 left-0' style={{ top: '4rem' }}>
        <InstrumentComponent
          name={instrument.name}
          state={state}
          dispatch={dispatch}
          synth={synth}
          setSynth={setSynth}
        />
      </div>
    </div>
  );
};
