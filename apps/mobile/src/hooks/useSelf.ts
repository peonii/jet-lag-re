import { useContext } from 'react';
import { trpc } from '../utils/trpc';
import { AuthContext } from '../context/AuthContext';

export function useSelf() {
    const { sid } = useContext(AuthContext);
    const self = trpc.user.self.useQuery({ sid });

    return self;
}