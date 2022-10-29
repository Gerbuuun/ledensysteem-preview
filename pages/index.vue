<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center text-primary-content-100">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Ledensysteem playground</h1>
        <p class="py-6">
          Welkom bij de eerste versie van het nieuwe Proteus-Eretes ledensysteem.
          Op deze <span class="text-error">tijdelijke</span> site zal worden uitgelegd uit welke onderdelen het systeem bestaat, hoe deze onderdelen met elkaar zijn verbonden,
          en hoe je deze kunt aanmaken, bewerken, en verwijderen.
        </p>
        <p>
          De onderdelen worden nu simpel onder elkaar weergeven zonder dat er veel over nagedacht is.
          In feedback willen we daarom graag alleen horen wat jullie van de functionaliteiten zelf vinden, en dus niet over de indeling van de site.
          Als je daarnaast graag bepaalde dingen wil zien kwa indeling, design, of design gerelateerde dingen, geef dat dan apart aan.
        </p>

        <button class="btn btn-primary my-6" @click="$router.push('verenigingen')">Beginnen</button>
      </div>
    </div>
  </div>
</template>