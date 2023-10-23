import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useReviewsStore = defineStore('reviews', () => {
  const reviews = ref([])
  const editedData = ref({
    editable: false,
    item: null
  });

  const averageRating = computed(() => {
    let temp = reviews.value.reduce((acc, cur) => 
                                    acc + cur.rating, 0) / reviews.value.length
                                    debugger
    return temp.toFixed(1).replace(/[.,]0$/,"");
  })
  const reviewsCount = computed(() => reviews.value.length);
  const reviewsContent = computed(() => reviews.value);
  const editedContent = computed(() => editedData.value);


  async function addReview(review) {
    const response = await fetch('http://localhost:5000/reviews/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    const newReview = await response.json()
    reviews.value.push(newReview)
  }
  async function fetchReviews() {
    try {
      const response = await fetch('http://localhost:5000/reviews?_sort=id&_order=desc')
      const data = await response.json()
      reviews.value = data;
    } catch (error) {
      throw error
    }
  }
  function editReview(review){
    editedData.value = {
      editable: true,
      item: review
    }
  }
  async function updateReview(review) {
    const response = await fetch(`http://localhost:5000/reviews/${review.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    const updateReview = await response.json()
    // reviews.value = [...reviews.value.filter(item => item.id !== review.id), updateReview]
    await fetchReviews();
    editedData.value = {
      editable: false,
      item: null
    }
  }
  async function deleteReview(review) {
    await fetch(`http://localhost:5000/reviews/${review.id}`, {
      method: 'DELETE',
    })
    reviews.value = reviews.value.filter(item => item.id !== review.id);
  }
  
  return { 
    reviews, 
    addReview,
     averageRating,
      reviewsCount,
       fetchReviews,
        reviewsContent,
         editReview,
          updateReview,
           editedContent,
            deleteReview }
})
