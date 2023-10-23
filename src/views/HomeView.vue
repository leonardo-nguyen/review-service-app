<template>
  <main>
    <div class="home">
      <div class="container">
        <!-- Reviews Form -->
        <ReviewsForm/>
        <!-- Reviews Stats -->
        <ReviewStats/>
        <!-- Reviews List -->
        <ReviewList/>
      </div>
    </div>
  </main>
</template>
<script setup>
import ReviewList from '../components/ReviewList.vue';
import ReviewsForm from '../components/ReviewsForm.vue';
import ReviewStats from '../components/ReviewStats.vue';
</script>