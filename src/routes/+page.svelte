<script lang="ts">
  import ActionCard from '$lib/UI/ActionCard/ActionCard.svelte';
  import CardHand from '$lib/UI/CardHand/CardHand.svelte';
  import EndTurn from '$lib/UI/EndTurn/EndTurn.svelte';
  import EndTurnActive from '$lib/UI/EndTurn/EndTurnActive.svelte';
  import Manager from '$lib/UI/Manager/Manager.svelte';
  import Objective from '$lib/UI/Objective/Objective.svelte';
  import RiskLog from '$lib/UI/RiskLog/RiskLog.svelte';
  import Settings from '$lib/UI/Settings/Settings.svelte';
  import Timeline from '$lib/UI/Timeline/Timeline.svelte';
  import { selectedCard } from '../stores.js'; 

  let currentRisk = $derived($selectedCard);

  interface CardEffect {
    cost: number;
    scope: number;
    quality: number;
    time: number;
  }

  interface Objective {
    cost: number;
    scope: number;
    quality: number;
    time: number;
  }

  interface Risk {
    cost: number;
    scope: number;
    quality: number;
    time: number;
    realisation: number;
  }

  let cardEffect: CardEffect = {
    cost: 100,
    scope: 100,
    quality: 100,
    time: 100,
  };

  let objectives: Objective = {
    cost: 100,
    scope: 100,
    quality: 100,
    time: 100,
  };

  let tempRisk: Risk = {
    cost: 5,
    scope: 5,
    quality: 2,
    time: 10,
    realisation: 10,
  };

  // The risk components "names", used in switching the displayable cards.
  const riskList = [ "NoRisk", "LastRisk", "CardTest"] 

  let riskCount = 1; // The maximum amount of risks in each round.
  let currentRiskCount = 0; // The amount of risks that have been played (mitigated, by the user).
  let currentRound = 0; // The round count.
  const maxRound = 6; // Maximum rounds.
  let score = 0; // Score initalization.

  // Upon selecting an mitigation card
  function cardSelected(cardEffects: CardEffect) {
    let riskRealised = riskHappened(tempRisk)

    if (riskRealised) {
      const randomizedEffects = mitigateRandomizer(cardEffects);
      objectives.cost -= tempRisk.cost * (randomizedEffects.cost / 100);
      objectives.scope -= tempRisk.scope * (randomizedEffects.scope / 100);
      objectives.quality -= tempRisk.quality * (randomizedEffects.quality / 100);
      objectives.time -= tempRisk.time * (randomizedEffects.time / 100); 
      console.log("Realiseerunud riski tõttu: ");
      console.log(objectives);
    }

    currentRiskCount++; // Adds an new already played risk to the count.
    nextCard();
  }

  // Realisation of the risk.
  function riskHappened(risk:Risk) {

    // Percentage of the given value.
    const riskProbability = Math.min(risk.realisation / 100, 1)
    
    if (Math.random() < riskProbability) {
      console.log("Risk has realised");
      return true;
    } else {
      return false;
    }
  }


  function addCardToGame(currentRound: number) {
    
    // Calculate the probability of adding a new card
    const probability = Math.min(currentRound / maxRound, 1);
    const rng = Math.random();
    
    // Check wheter a new card gets added to the game
    if (rng < probability) {
        console.log("Uusi kaarti :(");
        riskCount ++; // adds a new "risk" to the count
        // Kui ta siia jõuab, siis muudad "default" kaardi +1 suurema omale.
    } else {
      // DELETE! - ei tee midagi, hetkel vaid development ajaks
        console.log("No uus kaarti :)");
    }
}

  // RNG for the effectivness of the mitigation cards
  function mitigateRandomizer(cardEffects: CardEffect): CardEffect {
    return {
      cost: applyRandomChange(cardEffects.cost),
      scope: applyRandomChange(cardEffects.scope),
      quality: applyRandomChange(cardEffects.quality),
      time: applyRandomChange(cardEffects.time),
    };
  }

  function nextCard() {
    if (currentRiskCount !== riskCount){
      console.log("A new card Component! :)");
      // Here should be the logic to switch between the different card Components
    } else {
      currentRiskCount = 0; // Defaults the risks played in the game.
      selectedCard.set("NoRisk"); // Displays an empty game board, and because of it the next round button activates.
    }
  }

  // RNG for the mitigation cards.
  function applyRandomChange(value: number): number {
    const changePercent = (Math.random() * 10) - 5; // A number between -5 and 5
    const changeValue = value * (changePercent / 100); // Calculate change (+-5%) 
    return value + changeValue;
  }

  // Upon clicking the finish round button.
  function handleRoundReset() {
    currentRound ++; // Adds a new round to the count.
    addCardToGame(currentRound);
    checkGameState(currentRound);
    selectedCard.set("CardTest"); // DELETE - see asendub addCardToGame lõpuga.
  }

  function checkGameState(currentRound: number) {
  if (currentRound > maxRound) {

    // Score according to the left-over objective values.
    const remainingCost = objectives.cost / 100 * objectives.cost;
    const remainingScope = objectives.scope / 100 * objectives.scope;
    const remainingQuality = objectives.quality / 100 * objectives.quality;
    const remainingTime = objectives.time / 100 * objectives.time;

    // The score is the sum * 1000, because players like larger numbers :)
    score = Math.round((remainingCost + remainingScope + remainingQuality + remainingTime) * 1000);
    alert("Game over. Score: " + score);
  }
}


  // CardEffect - the percentage that goes down from the risk after realization.
  function handleCardClick(id: string) {
    switch (id) {
      case "card1":
        console.log('Clicked "Mitigate"');
        cardEffect = {
          cost: 50,
          scope: 50,
          quality: 50,
          time: 50,
        };
        cardSelected(cardEffect);
        break;
      case "card2":
        console.log('Clicked "Avoid"');
        cardEffect = {
          cost: 1,
          scope: 1,
          quality: 1,
          time: 1,
        };

        cardSelected(cardEffect);
        break;
      case "card3":
        console.log('Clicked "(Locked) Hire"');
        cardEffect = {
          cost: -10,
          scope: 40,
          quality: 30,
          time: 90,
        };
        cardSelected(cardEffect);
        break;
      case "card4":
        console.log('Clicked "(Locked) Agile Dev"');
        cardEffect = {
          cost: 5,
          scope: 20,
          quality: 60,
          time: 80,
        };
        cardSelected(cardEffect);
        break;
      default:
        console.log('"Do Nothing, Cards are disabled"');
    }
  }
</script>

<div class="wrapper">
  <div class="flex">
    <!-- Column 1 -->
    <div class="w-[19vw]">
      <div class="relative h-[50vh] bg-blue-300">
        <Objective />
      </div>

      <div class="h-[4vh]"></div>

      <div class="relative h-[46vh] bg-blue-500">
        <RiskLog />
      </div>
    </div>

    <!-- Divider -->
    <div class="w-[7vw]">
      <div class="h-[100vh]"></div>
    </div>

    <!-- Column 2 -->
    <div class="w-[48vw]">
      <div class="relative h-[10vh]">
        <Timeline />
      </div>

      <div class="h-[4vh]"></div>

      <div class="relative h-[44vh] bg-yellow-400">
        <CardHand />
      </div>

      <div class="h-[4vh]"></div>

      <div class="relative h-[38vh] bg-yellow-500">
        {#if currentRisk !== "NoRisk"}
        <ActionCard id="mitigateCards" handleClick={handleCardClick}/>
        {:else if currentRisk === "NoRisk"}
        <ActionCard id="mitigateCardsLocked" handleClick={handleCardClick} disabled/> 
        {/if}
      </div>
    </div>

    <!-- Divider -->
    <div class="w-[1vw]">
      <div class="h-[100vh]"></div>
    </div>

    <!-- Column 3 -->
    <div class="w-[25vw]">
      <div class="relative h-[10vh] bg-red-200">
        <Settings />
      </div>

      <div class="h-[6vh]"></div>

      <div class="relative h-[24vh] bg-red-300">
        <Manager />
      </div>

      <div class="h-[42vh]"></div>
      <div class="h-[2vh]"></div>

      <div class="relative h-[10vh] bg-red-600">
        {#if currentRisk !== "NoRisk"}
          <EndTurn />
        {:else if currentRisk == "NoRisk"}
          <EndTurnActive handleRoundReset={handleRoundReset} />
        {/if}
      </div>
    

      <div class="h-[6vh]"></div>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    background-repeat: no-repeat;
    background-image: url('/assets/bg/filter.svg'), url('/assets/bg/bg.jpg');
    background-size: cover;
  }
</style>
