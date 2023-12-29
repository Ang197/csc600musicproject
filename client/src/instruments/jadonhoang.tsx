// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useEffect } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Xylophone.
 ** ------------------------------------------------------------------------ */

interface XylophoneKeyProps {
  note: string; // C, D, E, F, G, A, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  bar?: boolean; // True if bar key, false otherwise
  octave: number;
  index: number; // octave + index together give a location for the xylophone key
}

export function XylophoneKey({
  note,
  synth,
  bar,
  index,
}: XylophoneKeyProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'black bg-white h4': !bar, 
      })}
      style={{
        top: 0,
        left: `${index * 2.5}rem`,
        zIndex: bar ? 2 : 0,
        width: '2rem',
        backgroundColor: '#8B4513',
        margin: '0.1rem',
        borderRadius: '0.2rem',
        boxShadow: '0 0.2rem 0.2rem rgba(0, 0, 0, 0.2)',
        backgroundImage: 'linear-gradient(to bottom, #8B4513, #CD853F)',
      }}
    ></div>
  );
}

function XylophoneKeyWithoutJSX({
  note,
  synth,
  bar,
  index,
}: XylophoneKeyProps): JSX.Element {
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: bar ? 1 : 0,
        width: bar ? '1.5rem' : '2rem',
        marginLeft: bar ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function XylophoneType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Xylophone({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C4', idx: 0, key: 'a' },
    { note: 'Db4', idx: 1, key: 's' },
    { note: 'D4', idx: 2, key: 'd' },
    { note: 'Eb4', idx: 3, key: 'f' },
    { note: 'E4', idx: 4, key: 'g' },
    { note: 'F4', idx: 5, key: 'h' },
    { note: 'Gb4', idx: 6, key: 'j' },
    { note: 'G4', idx: 4, key: 'k' },
    { note: 'Ab4', idx: 5, key: 'l' },
    { note: 'A4', idx: 6, key: 'b' },
    { note: 'Bb4', idx: 7, key: 'n' },
    { note: 'B4', idx: 8, key: 'm' },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      const key = keys.find(k => k.key === event.key);
      if(key) {
        synth?.triggerAttack(key.note);
      }
    }

    const keyUp = (event: KeyboardEvent) => {
      const key = keys.find(k => k.key === event.key);
      if(key) {
        synth?.triggerRelease('+0.25');
      }
    }

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    return() => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    }
  }, [synth, keys]);

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isBar = key.note.indexOf('b') !== -1;
            const note = `${key.note}`;
            return (
              <XylophoneKey
                key={note} //react key
                note={note}
                synth={synth}
                bar={isBar}
                octave={octave}
                index={octave + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <XylophoneType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const XylophoneInstrument = new Instrument('Xylophone', Xylophone);
