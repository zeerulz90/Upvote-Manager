import '../styles/UpvoteManager.css'

import AddUpvoteListButton from './AddUpvoteListButton'
import Wireframe from './Wireframe'
import { UpvoteListsProvider } from '../context/UpvoteListsContext';

export default function UpvoteManager() {
    return (
        <UpvoteListsProvider>
            <AddUpvoteListButton />
            <Wireframe />
        </UpvoteListsProvider>
    );
}