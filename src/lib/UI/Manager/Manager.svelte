<script lang="ts">
  import SimpleBar from '$lib/Components/SimpleBar.svelte';
  import SaveGameState from '$lib/States/GameState.svelte';
  import ManagerLogs, { type IManagerLog } from '$lib/States/ManagerLogState.svelte';
  import { onMount } from 'svelte';
  import ManagerLogSvg from './ManagerLogSVG.svelte';
  import MitigateCards from '$lib/Cards/MitigationCards.svelte';

  let logs = $state([]) as IManagerLog[];
  let good = 0;

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

  https://docs.google.com/spreadsheets/d/1pB-_vvnAB89TiDUJnSbzoGuCA-KrbVWKbAcudr69Jbk/edit#gid=854363117

  function test():void{
    if (MitigateCards.MitigatCardState.getRandomCard().rng) {
      if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT07') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {

        }
      }
      else if  (MitigateCards.MitigatCardState.getRandomCard().id == 'MT08') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT09') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT11') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT13') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT14') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MT15') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'MC08') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME02') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME03') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME04') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME06') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
        }
      }
      else if (MitigateCards.MitigatCardState.getRandomCard().id == 'ME12') {
        if(good){
          ManagerLogs.ManagerLogsState.addLog({
            message: 'You are fired!!!',
            title: 'Welcome!',
            name: 'Manager'
          });
        }
        else {
          
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