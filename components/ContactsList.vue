<template>
  <ul>
    <ContactsItem
      class="mb-4"
      v-for="contactItem in contactsList"
        :key="contactItem.name"
        :itemContent="contactItem.name"
        :itemLink="contactItem.link"
        :itemIcon="contactItem.icon"
    />
  </ul>
</template>

<script setup>
const contactsList = {
  github: {
    name: 'Github',
    link: 'https://github.com/AntonBobylev/',
    icon: 'https://img.icons8.com/?size=256&id=62856&format=png',
  },
  mail: {
    name: 'Email',
    link: 'mailto:ya-anton3632@yandex.ru',
    icon: 'https://img.icons8.com/?size=256&id=86840&format=png',
  },
  location: {
    name: 'Location',
    link: 'https://maps.app.goo.gl/gw4xJ6kFSoPXALVUA',
    icon: 'https://img.icons8.com/?size=256&id=59833&format=png',
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
