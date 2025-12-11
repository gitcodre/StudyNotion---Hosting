export default function GetAvgRating(ratingArr) {
    if (ratingArr?.length === 0) return 0
    // Step 2: Add all the ratings together
    // acc = accumulator (total score counted so far)
    // curr = current object in the array
    // [
    //     { rating: 4 },
    //     { rating: 5 },
    //     { rating: 3 }
    // ]
    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
      acc += curr.rating
      return acc
    }, 0)
    // totalReviewCount = 12
    // Step 3: Round it to 1 decimal place
    const multiplier = Math.pow(10, 1)
    // Because this gives 1 decimal point rounding.
    const avgReviewCount =
      Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
  
    return avgReviewCount
}