import { z } from 'zod';

export const HelloResponseSchema = z.object({
  message: z.string().min(5, "Message must be at least 5 characters"),
  
  // 1. Swap z.string().datetime() for the new namespaced version
  timestamp: z.iso.datetime(), 
  
  status: z.enum(['success', 'error']).optional().default('success')
});

// The rest remains the same
export type HelloResponse = z.infer<typeof HelloResponseSchema>;