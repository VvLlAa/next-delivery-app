import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import useSyncWithRouter from '@/hooks/useSyncWithRouter';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe('useSyncWithRouter', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: mockPush,
    });
    mockPush.mockClear();
  });

  it('calls router.push with page=1 when queryParam is set', () => {
    const { rerender } = renderHook(
      ({ queryParam }: { queryParam: string | null}) =>
        useSyncWithRouter(queryParam),
      {
        initialProps: { queryParam: null, page: 1 } as {
          queryParam: string | null;
          page: number;
        },
      }
    );

    rerender({ queryParam: 'в пути', page: 1 });
    expect(mockPush).toHaveBeenCalledWith('?page=1', undefined, {
      shallow: true,
    });
  });

  it('calls router.push when queryParam is set to null', () => {
    const { rerender } = renderHook(
      ({ queryParam }: { queryParam: string | null}) =>
        useSyncWithRouter(queryParam),
      {
        initialProps: { queryParam: 'в пути', page: 1 } as {
          queryParam: string | null;
          page: number;
        },
      }
    );

    rerender({ queryParam: null, page: 1 });
    expect(mockPush).toHaveBeenCalledWith('?page=1', undefined, {
      shallow: true,
    });
  });
});
