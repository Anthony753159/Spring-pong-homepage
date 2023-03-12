import { create } from 'zustand'

export const useManosStore = create((set) => ({
  zoomArcade: false,
  closeArcade:false,
  instructionsClosed:false,
  showIframe:false,
  setZoomArcade: (zoomArcade) => set(() => ({zoomArcade:zoomArcade})),
  setShowIframe: (showIframe) => set(() => ({showIframe:showIframe})),
  setInstructionsClosed: (instructionsClosed) => set(() => ({instructionsClosed:instructionsClosed})),
  setCloseArcade: (closeArcade) => set(() => ({closeArcade:closeArcade})),
}))