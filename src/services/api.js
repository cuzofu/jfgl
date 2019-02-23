import request from '@/utils/request';

export function query() {}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryOverviewData() {
  return request('/api/ov/overview');
}

export async function queryZlaqjcData() {
  return request('/api/ov/zlaqjc');
}
