<template>
    <div>
        <p v-if="store.reviewsContent.length === 0 ">No Review Yet</p>
        <div v-else class="reviewList">
            <ReviewItem :item="item" v-for="(item,index) in store.reviewsContent" :key="index"/>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import ReviewItem from './ReviewItem.vue';
import { useReviewsStore } from '../stores/reviews';

const store = useReviewsStore();

onBeforeMount(() => {
    store.fetchReviews();
})
</script>

<style scoped>

</style>