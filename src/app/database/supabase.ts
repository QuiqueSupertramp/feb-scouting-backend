export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      category: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      game_player_stats: {
        Row: {
          assists: number
          defensive_rebounds: number
          field_goals_attempted: number
          field_goals_made: number
          fouls_committed: number
          fouls_drawn: number
          free_throws_attempted: number
          free_throws_made: number
          game_feb_id: string
          jersey_number: string
          local: boolean
          minutes: number
          name: string
          offensive_rebounds: number
          pir: number
          player_feb_id: string
          points: number
          starter_five: boolean
          steals: number
          team_feb_id: string
          three_points_attempted: number
          three_points_made: number
          turnovers: number
          two_points_attempted: number
          two_points_made: number
          win: boolean
        }
        Insert: {
          assists: number
          defensive_rebounds: number
          field_goals_attempted: number
          field_goals_made: number
          fouls_committed: number
          fouls_drawn: number
          free_throws_attempted: number
          free_throws_made: number
          game_feb_id: string
          jersey_number?: string
          local: boolean
          minutes: number
          name: string
          offensive_rebounds: number
          pir: number
          player_feb_id: string
          points: number
          starter_five: boolean
          steals: number
          team_feb_id: string
          three_points_attempted: number
          three_points_made: number
          turnovers: number
          two_points_attempted: number
          two_points_made: number
          win: boolean
        }
        Update: {
          assists?: number
          defensive_rebounds?: number
          field_goals_attempted?: number
          field_goals_made?: number
          fouls_committed?: number
          fouls_drawn?: number
          free_throws_attempted?: number
          free_throws_made?: number
          game_feb_id?: string
          jersey_number?: string
          local?: boolean
          minutes?: number
          name?: string
          offensive_rebounds?: number
          pir?: number
          player_feb_id?: string
          points?: number
          starter_five?: boolean
          steals?: number
          team_feb_id?: string
          three_points_attempted?: number
          three_points_made?: number
          turnovers?: number
          two_points_attempted?: number
          two_points_made?: number
          win?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "game_player_stats_game_feb_id_fkey"
            columns: ["game_feb_id"]
            isOneToOne: false
            referencedRelation: "scores"
            referencedColumns: ["game_feb_id"]
          },
          {
            foreignKeyName: "game_player_stats_team_feb_id_fkey"
            columns: ["team_feb_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_feb_id"]
          },
        ]
      }
      game_team_stats: {
        Row: {
          assists: number
          defensive_rebounds: number
          field_goals_attempted: number
          field_goals_made: number
          fouls_committed: number
          fouls_drawn: number
          free_throws_attempted: number
          free_throws_made: number
          game_feb_id: string
          local: boolean
          minutes: number
          offensive_rebounds: number
          pir: number
          points: number
          steals: number
          team_feb_id: string
          three_points_attempted: number
          three_points_made: number
          turnovers: number
          two_points_attempted: number
          two_points_made: number
          win: boolean
        }
        Insert: {
          assists: number
          defensive_rebounds: number
          field_goals_attempted: number
          field_goals_made: number
          fouls_committed: number
          fouls_drawn: number
          free_throws_attempted: number
          free_throws_made: number
          game_feb_id: string
          local: boolean
          minutes: number
          offensive_rebounds: number
          pir: number
          points: number
          steals: number
          team_feb_id: string
          three_points_attempted: number
          three_points_made: number
          turnovers: number
          two_points_attempted: number
          two_points_made: number
          win: boolean
        }
        Update: {
          assists?: number
          defensive_rebounds?: number
          field_goals_attempted?: number
          field_goals_made?: number
          fouls_committed?: number
          fouls_drawn?: number
          free_throws_attempted?: number
          free_throws_made?: number
          game_feb_id?: string
          local?: boolean
          minutes?: number
          offensive_rebounds?: number
          pir?: number
          points?: number
          steals?: number
          team_feb_id?: string
          three_points_attempted?: number
          three_points_made?: number
          turnovers?: number
          two_points_attempted?: number
          two_points_made?: number
          win?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "game_team_stats_team_feb_id_fkey"
            columns: ["team_feb_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_feb_id"]
          },
        ]
      }
      group: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      league: {
        Row: {
          category_id: number
          group_id: number
          id: number
        }
        Insert: {
          category_id: number
          group_id: number
          id?: number
        }
        Update: {
          category_id?: number
          group_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "league_categoryId_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "league_groupId_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
        ]
      }
      scores: {
        Row: {
          away_quarters: number[]
          away_score: number
          away_team_feb_id: string
          date: string
          game_feb_id: string
          local_quarters: number[]
          local_score: number
          local_team_feb_id: string
          round: number
          time: string
        }
        Insert: {
          away_quarters: number[]
          away_score: number
          away_team_feb_id: string
          date: string
          game_feb_id: string
          local_quarters: number[]
          local_score: number
          local_team_feb_id: string
          round: number
          time: string
        }
        Update: {
          away_quarters?: number[]
          away_score?: number
          away_team_feb_id?: string
          date?: string
          game_feb_id?: string
          local_quarters?: number[]
          local_score?: number
          local_team_feb_id?: string
          round?: number
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "scores_away_team_feb_id_fkey"
            columns: ["away_team_feb_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_feb_id"]
          },
          {
            foreignKeyName: "scores_local_team_feb_id_fkey"
            columns: ["local_team_feb_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_feb_id"]
          },
        ]
      }
      teams: {
        Row: {
          league_id: number
          name: string
          pretty_name: string
          team_feb_id: string
        }
        Insert: {
          league_id: number
          name: string
          pretty_name: string
          team_feb_id: string
        }
        Update: {
          league_id?: number
          name?: string
          pretty_name?: string
          team_feb_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_leagueId_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "league"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      player_avg_points: {
        Row: {
          assists: number | null
          defensive_rebounds: number | null
          free_throws: number | null
          games: number | null
          minutes: number | null
          name: string | null
          offensive_rebounds: number | null
          pir: number | null
          player_feb_id: string | null
          points: number | null
          steals: number | null
          team_feb_id: string | null
          team_name: string | null
          team_pretty_name: string | null
          three_points: number | null
          total_rebounds: number | null
          turnovers: number | null
          two_points: number | null
        }
        Relationships: [
          {
            foreignKeyName: "game_player_stats_team_feb_id_fkey"
            columns: ["team_feb_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_feb_id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
