import * as favoriteActions from '../favoriteActions'

describe('Favorite Action Creators', () => {
  it('should create a TOGGLE_FAVORITE_FULFILLED action', () => {
    const expectedAction = {type: 'TOGGLE_FAVORITE_FULFILLED'}
    expect(favoriteActions.toggleFavoriteFulfilled()).toEqual(expectedAction)
  });
  it('should create a TOGGLE_FAVORITE_REJECTED action', () => {
    const expectedAction = {type: 'TOGGLE_FAVORITE_REJECTED'}
    expect(favoriteActions.toggleFavoriteRejected()).toEqual(expectedAction)
  });
});
