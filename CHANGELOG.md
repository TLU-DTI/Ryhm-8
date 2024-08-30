# Changelog

This contains all changes from Germo Tael after group project end in june.

### Rework

because a lot of backend was unmaintainable and consisted of many hacks, i rewrote most backend to more maintainable and extendable state for future developers.

### Added

- Notifictations are now in array and can be viewed with next and back button
- added notification counter, that show how many notifications you have (needs proper UI element)
- Save game after every turn, save lasts for 1 hour
- Interactive Tutorial
- color to risk logs
- MitiCards now popup on hover
- When dragging from MitiCard to RiskCard there is now a visible line
- New person Daisy for notifications (currently needs better design for use)
- Same RiskCard can't reappear for 3 rounds

### Changed

- No longer 3 used cards (that stay) and 3 new MitiCards, now based on risk card amount, around 4-7 new MitiCards 
- ~~Made it so that player has to mitigate all risks~~
- Reworked some UI elements to use svelte components directly instead of using html IDs
- Made most animations more reliable
- all sliders are now tweened which make them more smooth and pretty
- Optimized all images to webp


- Reenabled players to avoid risks by finishing turn

### Removed

- 

### Fixed

- sometimes MitiCards did not contain all the correct cards for mitigation.
- small UI positions