import { NextResponse } from "next/server";

const LEETCODE_API = "https://leetcode.com/graphql";

interface SubmissionStat {
  difficulty: string;
  count: number;
}

interface LeetCodeStats {
  username: string;
  profileUrl: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  activeDays: number;
  maxStreak: number;
  rank: string;
  recentProblems: string[];
}

async function fetchLeetcodeStats(username: string): Promise<LeetCodeStats> {
  return await fetchFromGraphQL(username);
}

interface ProblemTotals {
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

async function fetchLeetcodeProblemTotals(): Promise<ProblemTotals> {
  const response = await fetch("https://leetcode.com/api/problems/all/", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "application/json",
      Referer: "https://leetcode.com/",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch LeetCode problem totals: ${response.statusText}`);
  }

  type ProblemItem = {
    difficulty: { level: number };
  };

  const data = await response.json();

  const totalEasy = (data.stat_status_pairs as ProblemItem[])
    .filter((item) => item.difficulty.level === 1).length;
  const totalMedium = (data.stat_status_pairs as ProblemItem[])
    .filter((item) => item.difficulty.level === 2).length;
  const totalHard = (data.stat_status_pairs as ProblemItem[])
    .filter((item) => item.difficulty.level === 3).length;

  return {
    totalEasy,
    totalMedium,
    totalHard,
  };
}

async function fetchFromGraphQL(username: string): Promise<LeetCodeStats> {
  try {
    const problemTotals = await fetchLeetcodeProblemTotals();

    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
            totalSubmissionNum {
              difficulty
              count
            }
          }
          userCalendar {
            totalActiveDays
          }
          submissionCalendar
        }
      }
    `;

    const response = await fetch(LEETCODE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ 
        query, 
        variables: { username }
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`GraphQL API responded with status: ${response.status}`);
      throw new Error(`LeetCode GraphQL API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      throw new Error(`GraphQL Error: ${result.errors[0]?.message}`);
    }

    if (!result.data?.matchedUser) {
      throw new Error("User not found");
    }

    const user = result.data.matchedUser;
    const submitStats = user.submitStats.acSubmissionNum || [];

    const easySubmitted =
      submitStats.find((s: SubmissionStat) => s.difficulty === "Easy")?.count || 0;
    const mediumSubmitted =
      submitStats.find((s: SubmissionStat) => s.difficulty === "Medium")?.count || 0;
    const hardSubmitted =
      submitStats.find((s: SubmissionStat) => s.difficulty === "Hard")?.count || 0;

    let totalActiveDays = 0;
    let streak = 0;

    if (user.userCalendar?.totalActiveDays !== undefined) {
      totalActiveDays = user.userCalendar.totalActiveDays;
    }

    if (typeof user.submissionCalendar === "string") {
      try {
        const calendar = JSON.parse(user.submissionCalendar);
        const days = Object.keys(calendar)
          .map((ts) => Number(ts))
          .sort((a, b) => a - b);

        let currentStreak = 0;
        let maxStreak = 0;
        let previousDay = 0;

        for (const day of days) {
          if (previousDay === 0 || day === previousDay + 86400) {
            currentStreak += 1;
          } else {
            currentStreak = 1;
          }
          if (currentStreak > maxStreak) {
            maxStreak = currentStreak;
          }
          previousDay = day;
        }

        streak = maxStreak;
      } catch (err) {
        console.warn("Unable to parse submissionCalendar:", err);
      }
    }

    const allSolved =
      submitStats.find((s: SubmissionStat) => s.difficulty === "All")?.count ||
      easySubmitted + mediumSubmitted + hardSubmitted;

    const leetcodeStats: LeetCodeStats = {
      username: user.username,
      profileUrl: `https://leetcode.com/u/${user.username}/`,
      totalSolved: allSolved,
      easy: easySubmitted,
      medium: mediumSubmitted,
      hard: hardSubmitted,
      totalEasy: problemTotals.totalEasy,
      totalMedium: problemTotals.totalMedium,
      totalHard: problemTotals.totalHard,
      activeDays: totalActiveDays,
      maxStreak: streak,
      rank: user.profile.ranking?.toString() || "N/A",
      recentProblems: [],
    };

    console.log("Successfully fetched LeetCode stats from GraphQL:", leetcodeStats);
    return leetcodeStats;
  } catch (error) {
    console.error("Error fetching from GraphQL API:", error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "mish123_harshit";

    const stats = await fetchLeetcodeStats(username);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch LeetCode stats",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
