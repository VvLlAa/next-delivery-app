import { useMemo } from 'react';
import { useRouter } from 'next/router';
import {Delivery} from "@/type/type";

const PAGE_SIZE = 5;

export const useFilteredAndPaginatedDeliveries = (deliveries : Delivery[], selectedFilter : string | null) => {
    const router = useRouter();
    const page = Number(router.query.page) || 1;

    const filteredDeliveries = useMemo(() => {
        return selectedFilter
            ? deliveries.filter((item) => item.status === selectedFilter)
            : deliveries;
    }, [selectedFilter, deliveries]);

    const paginatedDeliveries = useMemo(() => {
        return filteredDeliveries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    }, [filteredDeliveries, router.query.page]);

    return {
        filteredDeliveries,
        paginatedDeliveries,
        page,
    };
};
