import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MoviesListContainer from '../containers/movies/MoviesListContainer';

import { getListMovies } from '../containers/movies/api/MoviesApi';

jest.mock('../containers/movies/api/MoviesApi', () => ({
    getListMovies: jest.fn(),
}));

describe('MoviesListContainer', () => {
    test('renders movies list with correct data', async () => {
        getListMovies.mockResolvedValueOnce({
            data: {
                content: [
                    {
                        id: 1,
                        year: 1972,
                        title: 'The Godfather',
                        winner: true,
                    },
                ],
                totalElements: 1,
            },
        });
        render(<MoviesListContainer />);
        const movieTitle = await screen.findByText('The Godfather');
        expect(movieTitle).toBeInTheDocument();
    });
});
