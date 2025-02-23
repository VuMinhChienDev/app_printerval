
"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native"
import { Star, Edit2, Trash2 } from "lucide-react-native"

export default function Reviews() {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<
    { id: number; author: string; date: string; rating: number; text: string; verified: boolean }[]
  >([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [averageRating, setAverageRating] = useState(0)
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0])

  useEffect(() => {
    updateRatingSummary()
  }, [comments])

  const updateRatingSummary = () => {
    const newRatingCounts = [0, 0, 0, 0, 0]
    let sum = 0
    comments.forEach((comment) => {
      newRatingCounts[comment.rating - 1]++
      sum += comment.rating
    })
    setRatingCounts(newRatingCounts)
    setAverageRating(comments.length > 0 ? Number.parseFloat((sum / comments.length).toFixed(1)) : 0)
  }

  const renderStars = (currentRating: number, onPress: (index: number) => void) => {
    return [...Array(5)].map((_, index) => (
      <TouchableOpacity key={index} onPress={() => onPress(index + 1)}>
        <Star
          width={24}
          height={24}
          color={index < currentRating ? "#FF8B3D" : "#DDDDDD"}
          fill={index < currentRating ? "#FF8B3D" : "#DDDDDD"}
        />
      </TouchableOpacity>
    ))
  }

  const handleCommentSubmit = () => {
    if (comment.trim() === "") {
      Alert.alert("Error", "Please write a comment!")
    } else {
      if (editingId) {
        setComments(comments.map((c) => (c.id === editingId ? { ...c, text: comment, rating: rating } : c)))
        setEditingId(null)
      } else {
        const newComment = {
          id: Date.now(),
          author: "You",
          date: new Date().toDateString(),
          rating: rating,
          text: comment,
          verified: true,
        }
        setComments([newComment, ...comments])
      }
      setComment("")
      setRating(5)
    }
  }

  const handleEdit = (id: number) => {
    const commentToEdit = comments.find((c) => c.id === id)
    if (commentToEdit) {
      setComment(commentToEdit.text)
      setRating(commentToEdit.rating)
      setEditingId(id)
    }
  }

  const handleDelete = (id: number) => {
    Alert.alert("Delete Comment", "Are you sure you want to delete this comment?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => setComments(comments.filter((c) => c.id !== id)) },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reviews</Text>

      <View style={styles.tabContainer}>
        <Text style={[styles.tabText, styles.activeTab]}>Item reviews</Text>
        <Text style={styles.tabText}>Shop reviews</Text>
      </View>

      <View style={styles.ratingSummary}>
        <View style={styles.averageRatingContainer}>
          <Text style={styles.averageRating}>{averageRating}</Text>
          <View style={styles.starsContainer}>{renderStars(Math.round(averageRating), () => {})}</View>
          <Text style={styles.totalReviews}>{comments.length} reviews</Text>
        </View>
        <View style={styles.ratingBars}>
          {ratingCounts.map((count, index) => (
            <View key={index} style={styles.ratingBar}>
              <Text style={styles.starText}>{index + 1}</Text>
              <Star width={16} height={16} color="#FF8B3D" />
              <View style={styles.progressBar}>
                <View style={[styles.filledBar, { width: `${(count / comments.length) * 100 || 0}%` }]} />
              </View>
              <Text style={styles.percentageText}>{count}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.commentSection}>
        <Text style={styles.ratingLabel}>Your Rating:</Text>
        <View style={styles.starRatingContainer}>{renderStars(rating, setRating)}</View>
        <TextInput
          style={styles.commentInput}
          placeholder="Write your comment..."
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
          <Text style={styles.submitButtonText}>{editingId ? "Update Comment" : "Submit Comment"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reviewsContainer}>
        {comments.map((review) => (
          <View key={review.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <View style={styles.starsContainer}>{renderStars(review.rating, () => {})}</View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleEdit(review.id)}>
                  <Edit2 width={20} height={20} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(review.id)}>
                  <Trash2 width={20} height={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.authorText}>
              {review.author} on {review.date}
            </Text>
            {review.verified && <Text style={styles.verifiedText}>✓ Verified purchase</Text>}
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.writeReviewButton}>
          <Text style={styles.writeReviewButtonText}>+ Write your review</Text>
        </TouchableOpacity>
        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  tabText: {
    fontSize: 16,
    marginRight: 24,
    color: "#666",
  },
  activeTab: {
    color: "#FF8B3D",
    borderBottomWidth: 2,
    borderBottomColor: "#FF8B3D",
  },
  ratingSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  averageRatingContainer: {
    alignItems: "center",
  },
  averageRating: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF8B3D",
  },
  totalReviews: {
    fontSize: 14,
    color: "#6b7280",
  },
  ratingBars: {
    flex: 1,
    marginLeft: 16,
  },
  ratingBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  starText: {
    width: 24,
    textAlign: "center",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginHorizontal: 8,
  },
  filledBar: {
    height: "100%",
    backgroundColor: "#FF8B3D",
    borderRadius: 4,
  },
  percentageText: {
    width: 24,
    textAlign: "right",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  commentSection: {
    marginVertical: 16,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  starRatingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  commentInput: {
    height: 100,
    borderColor: "#FF8B3D",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#FF8B3D",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  reviewsContainer: {
    marginBottom: 32,
  },
  card: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  authorText: {
    color: "#6b7280",
  },
  verifiedText: {
    color: "#10b981",
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  writeReviewButton: {
    backgroundColor: "#FF8B3D",
    padding: 12,
    borderRadius: 8,
  },
  writeReviewButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  navigationButtons: {
    flexDirection: "row",
  },
  navButton: {
    backgroundColor: "#d1d5db",
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  navButtonText: {
    color: "white",
    fontWeight: "bold",
  },
})

// "use client"

// import { useState } from "react"
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
// import { FontAwesome } from "@expo/vector-icons"

// interface Comment {
//   id: number
//   author: string
//   date: string
//   rating: number
//   text: string
//   verified: boolean
// }

// const Reviews = () => {
//   const [comments, setComments] = useState<Comment[]>([
//     {
//       id: 1,
//       author: "John Doe",
//       date: "Jan 1, 2023",
//       rating: 5,
//       text: "Great product! Highly recommended.",
//       verified: true,
//     },
//     {
//       id: 2,
//       author: "Jane Smith",
//       date: "Jan 5, 2023",
//       rating: 4,
//       text: "Good product, but could be better.",
//       verified: false,
//     },
//     {
//       id: 3,
//       author: "Peter Jones",
//       date: "Jan 10, 2023",
//       rating: 3,
//       text: "Okay product. Nothing special.",
//       verified: true,
//     },
//   ])

//   const [comment, setComment] = useState("")
//   const [rating, setRating] = useState(5)
//   const [editingId, setEditingId] = useState<number | null>(null)
//   const [showReviewForm, setShowReviewForm] = useState(false)

//   const renderStars = (rating: number, setRating: (rating: number) => void) => {
//     const stars = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <TouchableOpacity key={i} onPress={() => setRating(i)}>
//           <FontAwesome name={i <= rating ? "star" : "star-o"} size={24} color="gold" />
//         </TouchableOpacity>,
//       )
//     }
//     return <View style={styles.starContainer}>{stars}</View>
//   }

//   const handleCommentSubmit = () => {
//     if (comment.trim() === "") {
//       Alert.alert("Error", "Please write a comment!")
//     } else {
//       if (editingId) {
//         setComments(comments.map((c) => (c.id === editingId ? { ...c, text: comment, rating: rating } : c)))
//         setEditingId(null)
//       } else {
//         const newComment = {
//           id: Date.now(),
//           author: "You",
//           date: new Date().toDateString(),
//           rating: rating,
//           text: comment,
//           verified: true,
//         }
//         setComments([newComment, ...comments])
//       }
//       setComment("")
//       setRating(5)
//       setShowReviewForm(false)
//     }
//   }

//   const handleDelete = (id: number) => {
//     Alert.alert("Delete Comment", "Are you sure you want to delete this comment?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "OK",
//         onPress: () => {
//           setComments(comments.filter((c) => c.id !== id))
//           if (editingId === id) {
//             setEditingId(null)
//             setComment("")
//             setRating(5)
//           }
//         },
//       },
//     ])
//   }

//   const handleEdit = (id: number) => {
//     const commentToEdit = comments.find((c) => c.id === id)
//     if (commentToEdit) {
//       setComment(commentToEdit.text)
//       setRating(commentToEdit.rating)
//       setEditingId(id)
//       setShowReviewForm(true)
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         {comments.map((c) => (
//           <View key={c.id} style={styles.commentContainer}>
//             <View style={styles.commentHeader}>
//               <Text style={styles.author}>{c.author}</Text>
//               <View style={styles.rating}>
//                 {Array(c.rating)
//                   .fill(null)
//                   .map((_, i) => (
//                     <FontAwesome key={i} name="star" size={16} color="gold" />
//                   ))}
//               </View>
//             </View>
//             <Text style={styles.date}>{c.date}</Text>
//             <Text style={styles.text}>{c.text}</Text>
//             {c.verified && <Text style={styles.verified}>Verified Purchase</Text>}
//             <View style={styles.commentActions}>
//               <TouchableOpacity onPress={() => handleEdit(c.id)}>
//                 <Text style={styles.actionText}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => handleDelete(c.id)}>
//                 <Text style={styles.actionText}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       {showReviewForm && (
//         <View style={styles.commentSection}>
//           <Text style={styles.ratingLabel}>Your Rating:</Text>
//           <View style={styles.starRatingContainer}>{renderStars(rating, setRating)}</View>
//           <TextInput
//             style={styles.commentInput}
//             placeholder="Write your comment..."
//             multiline
//             numberOfLines={4}
//             value={comment}
//             onChangeText={setComment}
//           />
//           <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
//             <Text style={styles.submitButtonText}>{editingId ? "Update Comment" : "Submit Comment"}</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.writeReviewButton} onPress={() => setShowReviewForm(!showReviewForm)}>
//           <Text style={styles.writeReviewButtonText}>{showReviewForm ? "Cancel" : "+ Write your review"}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#f5f5f5",
//   },
//   commentContainer: {
//     backgroundColor: "white",
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   commentHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   author: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   rating: {
//     flexDirection: "row",
//   },
//   date: {
//     fontSize: 12,
//     color: "gray",
//     marginBottom: 5,
//   },
//   text: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   verified: {
//     fontSize: 12,
//     color: "green",
//     fontStyle: "italic",
//   },
//   commentActions: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     marginTop: 10,
//   },
//   actionText: {
//     color: "blue",
//     marginLeft: 15,
//   },
//   footer: {
//     padding: 10,
//     alignItems: "center",
//   },
//   writeReviewButton: {
//     backgroundColor: "#3498db",
//     padding: 10,
//     borderRadius: 5,
//   },
//   writeReviewButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   starContainer: {
//     flexDirection: "row",
//   },
//   commentSection: {
//     padding: 15,
//     backgroundColor: "white",
//     borderRadius: 5,
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   ratingLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   starRatingContainer: {
//     marginBottom: 10,
//     flexDirection: "row",
//   },
//   commentInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     textAlignVertical: "top",
//   },
//   submitButton: {
//     backgroundColor: "#27ae60",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   submitButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// })

// export default Reviews

