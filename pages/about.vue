<template>
  <div class="card">
    <h2>About</h2>
    <div>Hello, my name is Anton Bobylev.</div>
    <div>
      This is a sample aplication that allows user to see a historical Bitcoin
      price data.
    </div>

    <p class="mt-4">My contacts:</p>
    <ContactsList class="mt-4" />

    <div class="italic">
      <a target="_blank" href="https://icons8.com/icon/86965/bitcoin">Bitcoin</a>
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
  </div>
</template>

<script setup>
/********************************META******************************************/
useSeoMeta({
  title: 'Anton Bobylev | About',
  description: 'About',
  ogDescription: 'About - a page that shows Anton Bobylev\'s contact information',
})
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  font-size: 36px;
}
</style>
