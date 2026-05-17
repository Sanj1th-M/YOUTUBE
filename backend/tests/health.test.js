const request = require('supertest');
const express = require('express');

describe('Basic Backend Health Check', () => {
  it('should pass a dummy test', () => {
    expect(1 + 1).toBe(2);
  });
});
