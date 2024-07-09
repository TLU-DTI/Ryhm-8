import { render, screen } from '@testing-library/svelte/svelte5'
import TimelineSvg from './Timeline.svelte{ expect, test } from 'vitest'

test('no initial greeting', () => {
  render(TimelineSvg)

  expect(document.querySelector('svg')).toBeInTheDocument()
  // expect(greeting).not.toBeInTheDocument()
})