<template>
    <div class="card" :class="{'reverse': props.reverse}">
        <slot/>
    </div>
</template>

<script setup>
const props = defineProps({
    reverse: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
.card{
    background: #fff;
    color: #212121
}
.card.reverse{
    background: #212121;
    color: #fff
}
</style>