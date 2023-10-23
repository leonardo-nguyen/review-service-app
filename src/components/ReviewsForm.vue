<template>
    <Card>
        <form @submit.prevent="handleSubmit">
            <h2>How would you rate your service with us</h2>
            <!-- Rating Component -->
            <RatingSelect :rating="rating" @set-rating="handleSetRating" />
            <div class="input-group">
                <input type="text" placeholder="Write a review" v-model="text">
                <button type="submit" class="btn btn-primary" :disabled="btnDisabled">Send</button>
            </div>
            <div class="message">
                {{ message }}
            </div>
        </form>
    </Card>
</template>
<script setup>
import {ref, watch} from "vue"
import Card from "./shared/Card.vue"
import RatingSelect from "./RatingSelect.vue"
import { useReviewsStore } from "../stores/reviews"
import {storeToRefs} from 'pinia'

const text = ref('');
const btnDisabled = ref(false);
const message = ref('');
const rating = ref(10);
const store = useReviewsStore();

const { editedContent } = storeToRefs(store);

watch(editedContent, (newData) => {
    if(newData.editable){
        text.value = newData.item.text;
        rating.value = newData.item.rating;
    }
})

watch(text, (newData) => {
    if(newData.trim().length <= 10){
        btnDisabled.value = true;
        message.value = 'Text must be at least 10 characters';
    }
    else{
        btnDisabled.value = false;
        message.value = '';
    }
})

function handleSetRating (ratingSet){
    rating.value = ratingSet;
}
function handleSubmit(){
    const newReview = {
        text: text.value, 
        rating: rating.value
    }
    if(!store.editedContent.editable){
        store.addReview(newReview)
    }
    else{
        store.updateReview({
            ...newReview,
            id: store.editedContent.item.id
        })
    }
    text.value = '',
    rating.value = 10
}
</script>