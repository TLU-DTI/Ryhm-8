<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import SaveGameState from '$lib/States/GameState.svelte';
  import ManagerLogs, { type IManagerLog } from '$lib/States/ManagerLogState.svelte';
  import { onMount } from 'svelte';
  import ManagerLogSvg from './ManagerLogSVG.svelte';
  import MitigateCards from '$lib/Cards/MitigationCards.svelte';

  let logs = $state([]) as IManagerLog[];
  let good = 1;

  /*onMount(()=>{
    logs = ManagerLogs.ManagerLogsState.logs;
    ((SaveGameState.SaveGameState().loadGame()?.manager) ?? []).forEach(object => {
      ManagerLogs.ManagerLogsState.addLog(object);
    });
  })*/

  $effect(() => {
    logs = ManagerLogs.ManagerLogsState.logs;
    /*setInterval(() => {
      ManagerLogs.ManagerLogsState.addLog({
        message: 'You are fired!!!',
        title: 'Welcome!',
        name: 'Joel'
      });
    }, 1e3);*/
  });

  
  function test():void{
    if (MitigateCards.MitigatCardState.getRandomCard().rng) {
      if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT07') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'The client signed the document and specifyed the scope',
            title: 'The client agreed!',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'The client refused to sign the documents',
            title: 'The client refused!',
            name: 'Manager'
          });

        }
      }
      else if  (MitigateCards.MitigatCardState.getRandomCard().id == 'MT08') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'After telling the client about our budget shortfalls he was convinced to give us more money!',
            title: 'The client to agreed to increase our budget!',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'The client refused to give us a bigger budget, stating that its our problem for siging the contract!',
            title: 'The client refused to increase our budget!',
            name: 'Manager'
          });
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT09') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'After explaining to the client about our apprehension with the current deadline he agreed to extend it!',
            title: 'The client agreed to extend the deadline!',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'The client refused to increase the deadline even after explaining the project might not finish with the current one!',
            title: 'The client refused to increase the deadline!',
            name: 'Manager'
          });
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT11') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'After moving people from other projets we managed to complete tasks faster, although the other project suffered we can finish that easily! ',
            title: 'We managed to win some time!',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'Although we moved people from the other project the time we gained was negligible and negativley impacted our timeframe!',
            title: 'We lost a lot of time!',
            name: 'Manager'
          });
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT13') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'After informing the client about our current situation we got more time for the project',
            title: 'We got more time!',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'After telling the client about our situation we were not given a longer deadline!',
            title: 'We got no deadline extension!',
            name: 'Manager'
          });
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT14') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'After informing the client we got a bigger budget for the project!',
            title: 'We got more budget!',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'We were not granted a bigger budget after asking the client!',
            title: 'We did not get a bigger budget!',
            name: 'Manager'
          });
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT15') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'After telling the client about our situation they reduced the amount of featues in the project!',
            title: 'The project scope was reduced!',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'The client refused to reduce the project scope and was adamant that we must finish it as orderd!',
            title: 'The client wouldnt budge!',
            name: 'Manager'
          
        
          });
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MM07') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'After increasing the salary of all the team members the productivity of the team has increased!',
            title: 'The payrise motivated everyone!',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'Despite increasing the pay of the team they are not working harder!',
            title: 'The payrise seemed to not work',
            name: 'Manager'
          
        
          });
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MC09') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'Subcontractor did good and saved you some time',
            title: 'Subcontractor was a success',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'The work by the sub contractor was bad, you could have done it better yourself',
            title: 'The subcontractor did a bad job',
            name: 'Manager'
          });
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME02') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'Your experiment of trying to expand has been profitable',
            title: 'You expanded to other countries',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'Your experiment of trying to expand was not profitable',
            title: 'You failed to expand to other countries',
            name: 'Manager'
          });
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME03') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You got your way and the policy didnt go through',
            title: 'Your lobbying was successful',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You didnt get your way and the policy went through',
            title: 'Your lobbying was not successful',
            name: 'Manager'
          });
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME04') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You made a bunch of money on the stock market',
            title: 'Your investments were good',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You lost your money on the stock market',
            title: 'Your investments were bad',
            name: 'Manager'
          });
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME06') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'During the party you met a few rich investors and they invested in your business',
            title: 'Your party was a succesful',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: 'Your party was a waste of time and you didnt get any new investors',
            title: 'Your party was a failure',
            name: 'Manager'
          });
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME12') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You were successful in your campain to be a politician and made a policy favoring you',
            title: 'You won the election',
            name: 'Manager'
          });
        }
        else {
          ManagerLogs.ManagerLogsState.addLog({
            message: "You lost the election and couldn't change the policies",
            title: 'You lost the election',
            name: 'Manager'
          });
        }
      }
    }
  }


</script>


<button onclick={test}>Nupp</button>
<div class="size-full content-center text-center">
  <ManagerLogSvg>
    <SimpleBar>
      <div class="bg-black">
        {#each logs as log}
          <ul class="bg-white">
            <li>{log.title}</li>
            <li>{log.name}</li>
            <li>{log.message}</li>
          </ul>
        {/each}
      </div>
    </SimpleBar>
  </ManagerLogSvg>
</div>