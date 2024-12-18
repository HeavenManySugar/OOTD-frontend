import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { Card } from "react-bootstrap";

interface Store {
    StoreID: number;
    OwnerID: number;
    Name: string;
    Description: string;
}

const BriefStoreSearch: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchWord = queryParams.get('q');

    const { isLoading, data } = useQuery<Store[]>({
        queryKey: [`SearchStores_${searchWord}`],
        queryFn: () => {
            if (!searchWord) return Promise.resolve(null);
            return fetch(`/api/Store/SearchStores?keyword=${searchWord}`, {
                method: 'POST',
            }).then((res) => {
                if (!res.ok) {
                    return null;
                }
                return res.json();
            })
        },
    });
    return (
        <>
            {isLoading && (
                <Loading />
            )}
            {!isLoading && data && data.length > 0 && (
                <>
                    <h2>店家列表</h2>
                    <ul>
                        {data.map((store) => (
                            <li key={store.StoreID}>
                                <h3>{store.Name}</h3>
                                <p>{store.Description}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export default BriefStoreSearch;