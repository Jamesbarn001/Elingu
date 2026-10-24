import http from 'k6/http';
import { check, group, sleep } from 'k6';

// -------------------------------------------------------------
// ELINGU LOAD & STRESS TESTING SUITE (k6)
// Simulates concurrent students, parents, and teachers
// -------------------------------------------------------------

export const options = {
  // Ramp-up traffic stages
  stages: [
    { duration: '15s', target: 20 },  // Warm up: Ramp to 20 concurrent users
    { duration: '30s', target: 50 },  // Normal load: 50 concurrent learners
    { duration: '15s', target: 100 }, // Peak rush hour: 100 concurrent learners
    { duration: '15s', target: 0 },   // Cool down
  ],
  // Performance SLO thresholds
  thresholds: {
    http_req_failed: ['rate<0.01'],    // Error rate must be less than 1%
    http_req_duration: ['p(95)<800'],  // 95% of requests must complete under 800ms
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  
  // 1. Student App Home & Static Assets
  group('Student App Load', function () {
    const res = http.get(`${BASE_URL}/`);
    check(res, {
      'student app status 200': (r) => r.status === 200,
      'page has elingu title': (r) => r.body.includes('Elingu'),
    });
  });

  sleep(1);

  // 2. Parent Portal Authentication & Rendering
  group('Parent Portal Flow', function () {
    const portalRes = http.get(`${BASE_URL}/parent/portal`);
    check(portalRes, {
      'parent portal status 200': (r) => r.status === 200,
      'has login form': (r) => r.body.includes('parentLoginForm'),
    });

    // Simulated login attempt with unregistered email
    const loginPayload = JSON.stringify({
      email: 'bench_probe@example.com',
      familyPassword: 'BenchPassword123!',
    });
    const loginRes = http.post(`${BASE_URL}/api/parent/dashboard`, loginPayload, {
      headers: { 'Content-Type': 'application/json' },
    });
    check(loginRes, {
      'rejects invalid credentials': (r) => r.status === 401 || r.status === 423,
    });
  });

  sleep(1);

  // 3. Teacher Portal Health
  group('Teacher Portal Flow', function () {
    const teacherRes = http.get(`${BASE_URL}/teacher/portal`);
    check(teacherRes, {
      'teacher portal status 200': (r) => r.status === 200,
    });
  });

  sleep(1);
}
