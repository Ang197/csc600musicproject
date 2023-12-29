// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { GuitarInstrument } from './instruments/linkyap';
import { PianoInstrument } from './instruments/Piano';
import { LaunchPadInstrument } from './instruments/Ang197'
import { WaveformVisualizer } from './visualizers/Waveform';
import { LaunchPadVisualizer } from './visualizers/Ang197';
import { XylophoneInstrument } from './instruments/jadonhoang';
import { AudioVisualizer } from './visualizers/jadonhoang';
import { VoxInst } from './instruments/azistara';
import { voxRandoma } from './visualizers/azistara';
import { KaleidoscopeVisualizer } from './visualizers/linkyap'


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */

const instruments = List([PianoInstrument, LaunchPadInstrument, GuitarInstrument, XylophoneInstrument, VoxInst]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, LaunchPadVisualizer, AudioVisualizer, voxRandoma, KaleidoscopeVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});