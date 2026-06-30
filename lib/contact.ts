import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Use a valid email address").max(120),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1500),
  website: z.string().max(0).optional()
});

export type ContactPayload = z.infer<typeof contactSchema>;

const hits = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string) {
  const now = Date.now();
  const current = hits.get(key);

  if (hits.size > 1000) {
    for (const [storedKey, hit] of hits) {
      if (now > hit.resetAt) hits.delete(storedKey);
    }
  }

  if (!current || now > current.resetAt) {
    hits.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  current.count += 1;
  return current.count > 5;
}
