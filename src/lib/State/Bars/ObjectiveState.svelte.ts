import type { BarMovement } from '$lib/Components/BarState/BarMovement';

export const ObjectiveCost = $state() as BarMovement;
export const ObjectiveQuality = $state() as BarMovement;
export const ObjectiveScope = $state() as BarMovement;
export const ObjectiveTime = $state() as BarMovement;

export default {
  ObjectiveCost,
  ObjectiveQuality,
  ObjectiveScope,
  ObjectiveTime
};
