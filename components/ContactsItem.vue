<template>
  <li>
    <a :href="itemLink" target="_blank">
      <table>
        <tbody>
          <tr>
            <td><img :src="itemIcon" alt="item icon" /></td>
            <td>{{ itemContent }}</td>
          </tr>
        </tbody>
      </table>
    </a>
  </li>
</template>

<script setup>
const { itemLink, itemIcon, itemContent } = defineProps([
  'itemLink',
  'itemIcon',
  'itemContent',
]);
</script>

<style scoped>
img {
  max-width: 32px;
}
</style>
