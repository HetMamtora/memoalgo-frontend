// Mirrors src/main/java/com/memoalgo/dto/** on the backend exactly.
// If a field is added/renamed on the backend, this is the only file that
// should need a matching edit on the frontend.

// ---------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------

export interface RegisterRequest {
  email: string
  username: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: 'Bearer'
  email: string
  username: string
}

// ---------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------

export interface UserResponse {
  id: string
  email: string
  username: string
  createdAt: string // ISO 8601 instant
}

// ---------------------------------------------------------------------
// Topics
// ---------------------------------------------------------------------

export interface TopicResponse {
  id: string
  name: string
  description: string | null
  parentTopicId: string | null
  parentTopicName: string | null
}

// ---------------------------------------------------------------------
// Problems
// ---------------------------------------------------------------------

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export interface ProblemRequest {
  title: string
  url?: string | null
  difficulty: Difficulty
  notes?: string | null
  topicId?: string | null
  tags?: string[]
}

export interface ProblemResponse {
  id: string
  title: string
  url: string | null
  difficulty: Difficulty
  notes: string | null
  topicId: string | null
  topicName: string | null
  tags: string[]
  /** null until the problem has been reviewed at least once. */
  nextReviewDate: string | null // YYYY-MM-DD (LocalDate), or null
  createdAt: string
  updatedAt: string
}

export interface ProblemFilters {
  difficulty?: Difficulty
  topicId?: string
}

// ---------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------

/** 0 = blackout, 1 = again, 3 = hard, 4 = good, 5 = easy (SM-2 quality scale). */
export type ReviewQuality = 0 | 1 | 3 | 4 | 5

export interface ReviewRequest {
  quality: ReviewQuality
}

export interface ReviewResponse {
  problemId: string
  problemTitle: string
  easeFactor: number
  intervalDays: number
  repetitionCount: number
  nextReviewDate: string // YYYY-MM-DD (LocalDate)
}

export interface ReviewSessionResponse {
  dueCount: number
  dueProblems: ProblemResponse[]
}

// ---------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------

export interface StatsResponse {
  totalProblems: number
  dueToday: number
  currentStreak: number
  totalReviews: number
  retentionRate: number // 0-100
  problemsByDifficulty: Record<string, number>
  problemsByTopic: Record<string, number>
  /** % rated Good/Easy per topic, 0-100. Only includes topics with >= 1 review. */
  retentionByTopic: Record<string, number>
}

// ---------------------------------------------------------------------
// Shared API error shape
// ---------------------------------------------------------------------

/**
 * Best-effort shape for backend error bodies. The handoff doc confirms
 * status codes (400/401/403/404/409) but not the exact JSON envelope from
 * GlobalExceptionHandler -- treat `message` as optional and always have a
 * generic fallback string ready in the UI layer.
 */
export interface ApiErrorBody {
  message?: string
  error?: string
  status?: number
}
