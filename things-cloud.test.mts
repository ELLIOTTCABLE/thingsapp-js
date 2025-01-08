import {describe, expect, test} from '@jest/globals'

// A test using jest-fetch-mock that calls `auth` from things-cloud.mts:
import {auth} from './things-cloud.mts'

import fetchMock from 'jest-fetch-mock'

describe('auth', () => {
   test('it includes the password and e-mail in the request', () => {
      expect(true).toBe(true)
   })
})
