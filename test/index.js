'use strict';
/* global describe, it, should */

var moment =  require('moment'),
request = require('supertest'),
express = require('express');

var app = express().use(require('..'));

describe('page fetch', function(){
  it('should return homepage', function(done){
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('should return 404', function(done){
    request(app)
      .get('/non-exist-url')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });
});

describe('json fetch', function(){
  it('should return json', function(done){
    request(app)
      .get('/index.json')
      .expect('Content-Type', /json/)
      .expect(function(res){
	var before = moment().subtract(5, 'second');
	var recent = moment(res.body.generated).isAfter(before);
	if(!recent) throw new Error('JSON .generated not replaced');
      })
      .expect(200, done);
  });
});
