<template>
    <ul class="rating">
        <li v-for="n in 10" :key="`rating.${n}`">
            <input type="radio"
                :id="`num${n}`"
                name="rating"
                :value="n"
                :checked="props.rating === n"
                @change="emits('setRating', n)"
            >
            <label :for="`num${n}`">
                {{ n }}
            </label>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    rating: {
        type: Number,
        required: true
    }
})
const emits = defineEmits(['setRating'])
</script>

<style scoped>

</style>