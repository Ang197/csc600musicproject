// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';


// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Ang197 instrument.
 ** ------------------------------------------------------------------------ */
interface LaunchPadButtonsProps {
  note: string;
  synth?: Tone.Synth;
  octave: number;
  index: number;
}

export function LaunchPadButtons({
  note,
  synth,
  index,
  active,
}: any): JSX.Element {
  const onMouseDownEffect = () => {
    synth?.triggerAttack(`${note}`);
  }
  const onMouseUpEffect = () => {
    synth?.triggerRelease('+0.25');
  }
  return (
    <div
      style={{
        top: '2.5rem',
        left: `${index * 3}rem`,
        borderRadius: '0.4rem',
        width: '2rem',
        marginLeft: '0.25rem',
      }}
      onMouseDown={onMouseDownEffect}
      onMouseUp={onMouseUpEffect}
      className={classNames('ba pointer absolute', 'h2', {
        'bg-purple': active,
        'bg-light-silver': !active,
      })}
    ></div>
  );
}

function LaunchPadType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function LaunchPad({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys1 = List([
    { note: 'C', idx: 0.5 },
    { note: 'Db', idx: 1 },
    { note: 'D', idx: 1.5 },
    { note: 'Eb', idx: 2 },
    { note: 'E', idx: 2.5 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
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

  return (
    <div className="pv4">
      <div className="launchPadInstrument"
      style={{
        backgroundColor: '#474747',
        border: '0.2rem solid black',
        borderRadius: '10px',
        width: '25rem',
        height: '20rem',
        marginLeft: '2rem',
      }} >
        <div className="relative dib h3 w-100 ml4">
          {Range(0, 7).map(octave =>
            keys1.map(key => {
              const note = `${key.note}${octave}`;
              return (
                <LaunchPadButtons
                  key={note} 
                  note={note}
                  synth={synth}
                  octave={key.idx}
                  index={octave}
                />
              );
            }),
          )}
        </div>
        <div className="relative dib h3 w-100 ml4">
        {Range(0, 7).map(octave =>
            keys1.map(key => {
              const note = `${key.note}${octave}`;
              return (
                <LaunchPadButtons
                  key={note} 
                  note={note}
                  synth={synth}
                  octave={key.idx}
                  index={octave}
                />
              );
            }),
          )}
        </div>
        <div className="relative dib h3 w-100 ml4">
        {Range(0, 7).map(octave =>
            keys1.map(key => {
              const note = `${key.note}${octave}`;
              return (
                <LaunchPadButtons
                  key={note} 
                  note={note}
                  synth={synth}
                  octave={key.idx}
                  index={octave}
                />
              );
            }),
          )}
        </div>
        <div className="relative dib h3 w-100 ml4">
        {Range(0, 7).map(octave =>
            keys1.map(key => {
              const note = `${key.note}${octave}`;
              return (
                <LaunchPadButtons
                  key={note} 
                  note={note}
                  synth={synth}
                  octave={key.idx}
                  index={octave}
                />
              );
            }),
          )}
        </div>
      </div>

      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <LaunchPadType
            key={o}
            title={o}
            onClick={()=>setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const LaunchPadInstrument = new Instrument('LaunchPad', LaunchPad);
