export interface LeaderboardData {
    user_id: number | null;
    username: string | null;
    time_to_complete: number | null;
    updated_at: number | null;
    User?: {
      username: string | null;
  } | null;  // Optional for cases without an associated User
} 