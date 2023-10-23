<template>
    <card>
        <button class="close" @click="store.deleteReview(props.item)">
            <i class="fas fa-times"></i>
        </button>
        <button class="edit" @click="store.editReview(props.item)">
            <i class="fas fa-edit"></i>
        </button>
        <div class="num-display">
            {{ props.item.rating }}
        </div>
        <div class="text-display">
            {{ props.item.text }}
        </div>
    </card>
</template>

<script setup>
import Card from './shared/Card.vue';
import { useReviewsStore } from '../stores/reviews';
const store = useReviewsStore();
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>

</style>