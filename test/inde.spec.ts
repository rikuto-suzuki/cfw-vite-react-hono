import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/worker/index.ts';

describe(`Workers common behavior`, () => {
  it('responds with not found', async () => {
    const request = new Request('http://example.com/api/');
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    expect(response.body).toBe('{"name":"Cloudflare"}');
    expect(response.status).toBe(200);
  });
});